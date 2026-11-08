// Wiring (port of the old apps/robot main.ts). Lives in the Application so the server and peer
// connection survive activity recreation.
package com.armmirror.robot

import android.app.Application
import android.hardware.display.DisplayManager
import android.os.SystemClock
import android.view.Display
import android.view.Surface
import android.os.Handler
import android.os.Looper
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import com.armmirror.robot.arm.ArmLink
import com.armmirror.robot.arm.ArmLinkState
import com.armmirror.robot.arm.MockArmLink
import com.armmirror.robot.arm.Relay
import com.armmirror.robot.arm.UsbArmLink
import com.armmirror.robot.hub.HUB_PORT
import com.armmirror.robot.hub.Hub
import com.armmirror.robot.protocol.Status
import com.armmirror.robot.protocol.camOrientJson
import com.armmirror.robot.protocol.debugJson
import com.armmirror.robot.protocol.statusJson
import com.armmirror.robot.protocol.trackJson
import com.armmirror.robot.rtc.CameraInfo
import com.armmirror.robot.rtc.RobotPeer
import com.armmirror.robot.rtc.pickWideCamera
import com.armmirror.robot.sensors.screenRollDeg
import com.armmirror.robot.sensors.startOrientation
import org.webrtc.VideoSink
import java.net.Inet4Address
import java.net.NetworkInterface
import java.util.Locale
import kotlin.concurrent.thread

class RobotApplication : Application() {
    lateinit var robot: RobotApp
        private set

    override fun onCreate() {
        super.onCreate()
        robot = RobotApp(this)
    }
}

class RobotApp(private val ctx: Application) {
    // UI state (Compose). Written only on the main thread via ui {}.
    val link = mutableStateOf("waiting for operator")
    val arm = mutableStateOf(ArmLinkState.DISCONNECTED)
    val mock = mutableStateOf(false)
    /** Operator shows the commanded-pose arm model in VR. */
    val debug = mutableStateOf(false)
    /** Operator hand-tracking mapping, one of TRACK_MODES. */
    val track = mutableStateOf("hand")
    val camera = mutableStateOf<CameraInfo?>(null)
    val orient = mutableStateOf("off")
    /** Latest MCU status line; null unless the arm link is READY. */
    val status = mutableStateOf<Status?>(null)
    /** Screen roll about its normal, degrees, clockwise positive. */
    val roll = mutableFloatStateOf(0f)
    val cameras = mutableStateOf(emptyList<CameraInfo>())
    val log = mutableStateListOf<String>()
    /** A marked-home reference request is in flight. */
    val referencing = mutableStateOf(false)
    val operatorUrls: List<String> = lanAddresses().map { "http://$it:$HUB_PORT/operator/" }

    private val main = Handler(Looper.getMainLooper())
    private fun ui(f: () -> Unit) = main.post(f)

    fun log(line: String) = ui {
        log += line
        if (log.size > 200) log.removeAt(0)
    }

    private val hub: Hub = Hub(
        read = { path -> runCatching { ctx.assets.open("web/$path").use { it.readBytes() } }.getOrNull() },
        onSignal = { peer.onSignal(it) },
    )
    val peer: RobotPeer = RobotPeer(ctx, hub::sendToOperator)

    // One USB link for the app's lifetime: each instance registers a permission receiver.
    private val usbLink: ArmLink = UsbArmLink(ctx).also(::wire)
    @Volatile private var armLink: ArmLink = usbLink

    // Relay rule: joints reach serial ONLY when engaged (see Relay).
    private val relay = Relay(send = { armLink.sendJoints(it) }, sendPan = { armLink.sendCamera(it) })
    private var stopOrientation: (() -> Unit)? = null

    init {
        peer.onState = { s ->
            log("link: $s")
            ui { link.value = s }
        }
        peer.onLog = ::log
        peer.onChannelOpen = relay::reset
        peer.onJoints = relay::onJoints
        peer.onPan = relay::onPan
        hub.start()
        operatorUrls.forEach { log("operator: $it") }
        // The control channel never retransmits, so resend the switch state (also reaches a newly connected operator).
        main.post(object : Runnable {
            override fun run() {
                peer.send(debugJson(debug.value))
                peer.send(trackJson(track.value))
                main.postDelayed(this, 1000)
            }
        })
    }

    private fun wire(a: ArmLink) {
        a.onState = { s ->
            ui {
                if (arm.value != s) log("arm: ${s.name.lowercase()}")
                arm.value = s
                if (s != ArmLinkState.READY) status.value = null
            }
        }
        a.onLog = ::log
        var lastMode = ""
        var lastLogMs = 0L
        a.onStatus = { s: Status ->
            peer.send(statusJson(s))
            // 10 Hz is too fast to read: log mode changes and one line a second.
            val now = SystemClock.elapsedRealtime()
            if (s.state != lastMode || now - lastLogMs >= 1000) {
                lastMode = s.state
                lastLogMs = now
                log("mcu: ${s.state} seq=${s.seq} [${s.deg.joinToString(" ") { "%.1f".format(Locale.ROOT, it) }}]")
            }
            ui { if (arm.value == ArmLinkState.READY) status.value = s }
        }
    }

    fun connectArm() = armLink.connect()

    /** Call only after the user confirmed that EVERY axis sits on its home mark. */
    fun referenceArm() {
        if (referencing.value) return
        referencing.value = true
        log("arm: reference requested (user confirmed all axes on home marks)")
        thread(name = "arm-reference", isDaemon = true) {
            val error = armLink.reference()
            log(if (error == null) "arm: referenced; homing" else "arm: reference failed: $error")
            ui { referencing.value = false }
        }
    }

    /** Reset button: drop the link; Connect arm re-handshakes. */
    fun resetArm() = armLink.close()

    /** Swaps between the USB link and the mock MCU (the old ?mockSerial=1). */
    fun setMock(on: Boolean) {
        if (on == mock.value) return
        armLink.close()
        armLink = if (on) MockArmLink().also(::wire) else usbLink
        mock.value = on
        if (on) armLink.connect()
    }

    fun setDebug(on: Boolean) {
        debug.value = on
        peer.send(debugJson(on))
    }

    fun setTrack(mode: String) {
        track.value = mode
        peer.send(trackJson(mode))
    }

    /** Call after CAMERA permission is granted. */
    fun startCameraAndSensors(preview: VideoSink) {
        val cams = peer.listCameras()
        cameras.value = cams
        pickWideCamera(cams)?.let { useCamera(it, preview) } ?: log("camera: no camera found")
        if (stopOrientation == null) {
            val display = ctx.getSystemService(DisplayManager::class.java).getDisplay(Display.DEFAULT_DISPLAY)
            stopOrientation = startOrientation(ctx) { q ->
                peer.send(camOrientJson(q, System.currentTimeMillis()))
                val r = screenRollDeg(q, display?.rotation ?: Surface.ROTATION_90)
                ui {
                    roll.floatValue = r
                    if (orient.value != "live") {
                        orient.value = "live"
                        log("orientation: game rotation vector live")
                    }
                }
            }
            if (stopOrientation == null) orient.value = "game rotation vector sensor missing"
        }
    }

    fun useCamera(cam: CameraInfo, preview: VideoSink) {
        runCatching { peer.useCamera(cam, preview) }
            .onSuccess {
                camera.value = cam
                val widest = cam.back && pickWideCamera(cameras.value)?.id == cam.id
                log("camera: ${if (cam.back) "back" else "front"}${if (widest) " · ultrawide (shortest focal length)" else ""} · ${cam.label}")
            }
            .onFailure { log("camera: ${it.message}") }
    }

    private fun lanAddresses(): List<String> = runCatching {
        NetworkInterface.getNetworkInterfaces().toList()
            .filter { it.isUp && !it.isLoopback }
            .flatMap { it.inetAddresses.toList() }
            .filterIsInstance<Inet4Address>()
            .map { it.hostAddress!! }
    }.getOrDefault(emptyList())
}
