// Phone → MCU serial link over USB host (usb-serial-for-android, CDC-ACM for the ESP32-S3).
// Line handling and the seq handshake live in SerialSession.
package com.armmirror.robot.arm

import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.hardware.usb.UsbDevice
import android.hardware.usb.UsbManager
import androidx.core.content.ContextCompat
import com.armmirror.robot.protocol.SERIAL_BAUD
import com.armmirror.robot.protocol.Status
import com.hoho.android.usbserial.driver.CdcAcmSerialDriver
import com.hoho.android.usbserial.driver.SerialTimeoutException
import com.hoho.android.usbserial.driver.UsbSerialDriver
import com.hoho.android.usbserial.driver.UsbSerialPort
import com.hoho.android.usbserial.driver.UsbSerialProber
import com.hoho.android.usbserial.util.SerialInputOutputManager
import java.io.IOException

private const val ESPRESSIF_VID = 0x303a
private const val ACTION_USB_PERMISSION = "com.armmirror.robot.USB_PERMISSION"

class UsbArmLink(private val ctx: Context) : ArmLink {
    override var onStatus: (Status) -> Unit = {}
    override var onState: (ArmLinkState) -> Unit = {}
    override var onLog: (String) -> Unit = {}
    @Volatile override var state = ArmLinkState.DISCONNECTED
        private set

    private val usb = ctx.getSystemService(UsbManager::class.java)
    private var port: UsbSerialPort? = null
    private var io: SerialInputOutputManager? = null
    private var session: SerialSession? = null

    init {
        ContextCompat.registerReceiver(
            ctx,
            object : BroadcastReceiver() {
                override fun onReceive(c: Context, i: Intent) {
                    if (i.getBooleanExtra(UsbManager.EXTRA_PERMISSION_GRANTED, false)) connect()
                    else onLog("usb: permission denied")
                }
            },
            IntentFilter(ACTION_USB_PERMISSION),
            ContextCompat.RECEIVER_NOT_EXPORTED,
        )
    }

    private fun findDriver(): UsbSerialDriver? =
        UsbSerialProber.getDefaultProber().findAllDrivers(usb).firstOrNull()
            ?: usb.deviceList.values.firstOrNull { it.vendorId == ESPRESSIF_VID }?.let(::CdcAcmSerialDriver)

    /** Safe to call repeatedly (button, USB attach intent, permission grant). */
    @Synchronized override fun connect() {
        if (state != ArmLinkState.DISCONNECTED) return
        val driver = findDriver() ?: return onLog("usb: no serial device found")
        val device: UsbDevice = driver.device
        if (!usb.hasPermission(device)) {
            val pi = PendingIntent.getBroadcast(
                ctx, 0, Intent(ACTION_USB_PERMISSION).setPackage(ctx.packageName), PendingIntent.FLAG_MUTABLE,
            )
            usb.requestPermission(device, pi)
            return onLog("usb: requesting permission for ${device.deviceName}")
        }
        // Fails if another app or the system already claimed the interface. Test the exact board early.
        val conn = usb.openDevice(device) ?: return onLog("usb: openDevice failed")
        val p = driver.ports[0]
        try {
            p.open(conn)
            p.setParameters(SERIAL_BAUD, 8, UsbSerialPort.STOPBITS_1, UsbSerialPort.PARITY_NONE)
            // DTR before RTS, like a laptop terminal: never presents RTS-without-DTR (the ESP32 reset pattern).
            p.dtr = true
            p.rts = true
        } catch (e: IOException) {
            runCatching { p.close() }
            return onLog("usb: open failed: ${e.message}")
        }
        val s = SerialSession(
            write = ::write,
            onStatus = { onStatus(it) },
            onReady = { setState(ArmLinkState.READY) },
            onDebug = { onLog("[mcu] $it") },
        )
        session = s
        port = p
        io = SerialInputOutputManager(p, object : SerialInputOutputManager.Listener {
            override fun onNewData(data: ByteArray) = s.onBytes(data)
            override fun onRunError(e: Exception) = drop("port closed: ${e.message}")
        }).also { it.start() }
        setState(ArmLinkState.HANDSHAKING)
    }

    override fun sendJoints(deg: List<Double>) {
        if (state == ArmLinkState.READY) session?.sendJoints(deg)
    }

    private fun write(line: String) {
        try {
            port?.write(line.toByteArray(Charsets.US_ASCII), 20)
        } catch (_: SerialTimeoutException) {
            // Backpressure: drop rather than queue stale commands.
        } catch (e: IOException) {
            drop("write failed: ${e.message}")
        }
    }

    @Synchronized private fun drop(reason: String) {
        if (state == ArmLinkState.DISCONNECTED) return
        onLog("usb: disconnected: $reason")
        io?.stop()
        runCatching { port?.close() }
        io = null
        port = null
        session = null
        setState(ArmLinkState.DISCONNECTED)
    }

    override fun close() = drop("closed")

    private fun setState(s: ArmLinkState) {
        state = s
        onState(s)
    }
}
