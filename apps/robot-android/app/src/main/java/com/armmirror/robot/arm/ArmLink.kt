package com.armmirror.robot.arm

import com.armmirror.robot.protocol.STATUS_HZ
import com.armmirror.robot.protocol.Status
import com.armmirror.robot.protocol.WATCHDOG_MS
import com.armmirror.robot.protocol.encodeJoints
import com.armmirror.robot.protocol.encodeStatus
import com.armmirror.robot.protocol.nextSeq
import com.armmirror.robot.protocol.parseStatus
import java.util.Timer
import kotlin.concurrent.fixedRateTimer

enum class ArmLinkState { DISCONNECTED, HANDSHAKING, READY }

interface ArmLink {
    val state: ArmLinkState
    var onStatus: (Status) -> Unit
    var onState: (ArmLinkState) -> Unit
    var onLog: (String) -> Unit
    fun connect()
    /** Sends one command if the link is ready; drops it otherwise (the firmware watchdog holds the arm). */
    fun sendJoints(deg: List<Double>)
    fun close()
}

/**
 * Line framing + handshake, independent of the USB transport so it can be unit tested.
 *
 * Handshake: after the port opens, wait for a valid status line and continue from its seq + 1
 * (the firmware reports the last seq it accepted). The board may reset when the port opens (DTR)
 * and re-homes; whenever a status line says HOMING we re-sync seq the same way.
 */
class SerialSession(
    private val write: (String) -> Unit,
    private val onStatus: (Status) -> Unit,
    private val onReady: () -> Unit,
    private val onDebug: (String) -> Unit = {},
) {
    private val buf = StringBuilder()
    private var seq: Int? = null
    val ready get() = seq != null

    @Synchronized fun onBytes(bytes: ByteArray) {
        buf.append(String(bytes, Charsets.US_ASCII))
        while (true) {
            val nl = buf.indexOf("\n")
            if (nl < 0) break
            val line = buf.substring(0, nl + 1)
            buf.delete(0, nl + 1)
            onLine(line)
        }
        if (buf.length > 512) buf.setLength(0) // garbage with no newline
    }

    private fun onLine(line: String) {
        if (line.startsWith("#")) return onDebug(line.trim())
        val status = parseStatus(line) ?: return // bad CRC or not a status line
        if (seq == null || status.state == "HOMING") {
            val wasReady = ready
            seq = status.seq
            if (!wasReady) onReady()
        }
        onStatus(status)
    }

    @Synchronized fun sendJoints(deg: List<Double>) {
        val s = seq ?: return
        val next = nextSeq(s)
        seq = next
        write(encodeJoints(next, deg))
    }
}

/**
 * Logs encoded lines instead of opening USB, and fakes the MCU's 10 Hz status (IDLE until the
 * first command, then ACTIVE while commands arrive and WATCHDOG after WATCHDOG_MS of silence).
 * No limits are simulated.
 */
class MockArmLink : ArmLink {
    override var onStatus: (Status) -> Unit = {}
    override var onState: (ArmLinkState) -> Unit = {}
    override var onLog: (String) -> Unit = {}
    override var state = ArmLinkState.DISCONNECTED
        private set
    private var seq = 0
    private var deg = List(5) { 0.0 }
    private var lastCmdMs = 0L
    private var everCommanded = false
    private var timer: Timer? = null

    override fun connect() {
        if (state != ArmLinkState.DISCONNECTED) return
        state = ArmLinkState.READY
        onState(state)
        timer = fixedRateTimer("mock-mcu", daemon = true, period = 1000L / STATUS_HZ) { tick() }
    }

    @Synchronized private fun tick() {
        val now = System.currentTimeMillis()
        val st = if (!everCommanded) "IDLE" else if (now - lastCmdMs > WATCHDOG_MS) "WATCHDOG" else "ACTIVE"
        parseStatus(encodeStatus(Status(seq, st, deg)))?.let(onStatus)
    }

    @Synchronized override fun sendJoints(deg: List<Double>) {
        if (state != ArmLinkState.READY) return
        seq = nextSeq(seq)
        this.deg = deg
        lastCmdMs = System.currentTimeMillis()
        everCommanded = true
        onLog(encodeJoints(seq, deg).trimEnd())
    }

    override fun close() {
        timer?.cancel()
        timer = null
        state = ArmLinkState.DISCONNECTED
        onState(state)
    }
}
