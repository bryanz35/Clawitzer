package com.armmirror.robot.arm

import com.armmirror.robot.protocol.CALIBRATION_REFERENCE_ACK
import com.armmirror.robot.protocol.CalibrationReply
import com.armmirror.robot.protocol.STATUS_HZ
import com.armmirror.robot.protocol.Status
import com.armmirror.robot.protocol.WATCHDOG_MS
import com.armmirror.robot.protocol.encodeCalibration
import com.armmirror.robot.protocol.encodeCamera
import com.armmirror.robot.protocol.encodeJoints
import com.armmirror.robot.protocol.encodeStatus
import com.armmirror.robot.protocol.nextSeq
import com.armmirror.robot.protocol.parseCalibrationReply
import com.armmirror.robot.protocol.parseCalibrationStatus
import com.armmirror.robot.protocol.parseCameraStatus
import com.armmirror.robot.protocol.parseStatus
import com.armmirror.robot.protocol.seqIsNewer
import java.util.Timer
import java.util.concurrent.ArrayBlockingQueue
import java.util.concurrent.TimeUnit
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
    /** Sends one pan-servo target if the link knows the MCU's camera seq; drops it otherwise. */
    fun sendCamera(deg: Double)
    /**
     * Explicit marked-home reference. The caller must first get the user's confirmation that EVERY axis
     * sits on its home mark. Blocks for up to two replies: call off the main thread. Null on success, else why not.
     */
    fun reference(): String?
    fun close()
}

/** Calibration reply timeout, like the desktop panel. A timed-out request is never retried. */
const val CALIBRATION_REPLY_MS = 1000L

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
    /** Camera `P` seq, independent of `J`; learned from the MCU's V lines (1 Hz heartbeat + each accepted P). */
    private var cameraSeq: Int? = null
    private var replies: ArrayBlockingQueue<CalibrationReply>? = null
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
        parseCalibrationReply(line)?.let { replies?.offer(it); return }
        parseCameraStatus(line)?.let { v ->
            // Only move forward: a V line lags our own sends. A reset MCU accepts any seq, so lagging is harmless.
            val c = cameraSeq
            if (c == null || seqIsNewer(v.seq, c)) cameraSeq = v.seq
            return
        }
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

    @Synchronized fun sendCamera(deg: Double) {
        val s = cameraSeq ?: return
        val next = nextSeq(s)
        cameraSeq = next
        write(encodeCamera(next, deg))
    }

    /** See [ArmLink.reference]. Mirrors the desktop panel: status, checks, then one reference request. */
    fun reference(timeoutMs: Long = CALIBRATION_REPLY_MS): String? {
        val reply = request(0, "status", timeoutMs) ?: return "no firmware reply to status within $timeoutMs ms"
        val st = parseCalibrationStatus(reply) ?: return "malformed firmware status reply"
        if (!st.normal || !st.configured) return "needs a saved calibration in normal mode (use the desktop panel or CLI first)"
        if (st.referenced) return "already referenced; halt outputs before a new reference"
        val refSeq = st.lastSeq?.let(::nextSeq) ?: 0
        val ref = request(refSeq, "reference,$CALIBRATION_REFERENCE_ACK", timeoutMs)
            ?: return "no firmware reply to reference within $timeoutMs ms; not retried, check the status line"
        if (!ref.ok) return "firmware rejected reference: ${ref.fields.joinToString(",")}"
        return if (ref.fields.isEmpty()) null else "unexpected firmware reply to reference"
    }

    /** One calibration request in flight. Null on timeout. */
    private fun request(seq: Int, fields: String, timeoutMs: Long): CalibrationReply? {
        val queue = ArrayBlockingQueue<CalibrationReply>(4)
        synchronized(this) {
            check(replies == null) { "another calibration request is in flight" }
            replies = queue
            write(encodeCalibration(seq, fields))
        }
        try {
            val deadline = System.nanoTime() + TimeUnit.MILLISECONDS.toNanos(timeoutMs)
            while (true) {
                val left = deadline - System.nanoTime()
                if (left <= 0) return null
                val r = queue.poll(left, TimeUnit.NANOSECONDS) ?: return null
                if (r.seq == seq) return r
            }
        } finally {
            synchronized(this) { replies = null }
        }
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

    override fun sendCamera(deg: Double) {
        if (state == ArmLinkState.READY) onLog(encodeCamera(0, deg).trimEnd())
    }

    /** The mock never reports HOMING, so it needs no reference. */
    override fun reference(): String? = null

    override fun close() {
        timer?.cancel()
        timer = null
        state = ArmLinkState.DISCONNECTED
        onState(state)
    }
}
