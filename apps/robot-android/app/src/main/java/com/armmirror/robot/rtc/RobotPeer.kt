// WebRTC answerer (port of the old apps/robot link.ts). The operator always offers a `control`
// data channel plus a recvonly video transceiver; we answer, send the camera on that transceiver,
// and exchange JSON on the channel. No STUN/TURN: LAN host candidates only.
package com.armmirror.robot.rtc

import android.content.Context
import android.hardware.camera2.CameraCharacteristics
import android.hardware.camera2.CameraManager
import com.armmirror.robot.protocol.Joints
import com.armmirror.robot.protocol.Signal
import com.armmirror.robot.protocol.answerJson
import com.armmirror.robot.protocol.iceJson
import com.armmirror.robot.protocol.Pan
import com.armmirror.robot.protocol.parseJointsMsg
import com.armmirror.robot.protocol.parsePanMsg
import com.armmirror.robot.protocol.parseSignal
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.launch
import kotlinx.coroutines.asCoroutineDispatcher
import kotlinx.coroutines.delay
import org.webrtc.Camera2Capturer
import org.webrtc.Camera2Enumerator
import org.webrtc.CameraVideoCapturer
import org.webrtc.DataChannel
import org.webrtc.DefaultVideoDecoderFactory
import org.webrtc.DefaultVideoEncoderFactory
import org.webrtc.EglBase
import org.webrtc.IceCandidate
import org.webrtc.MediaConstraints
import org.webrtc.MediaStreamTrack
import org.webrtc.PeerConnection
import org.webrtc.PeerConnectionFactory
import org.webrtc.RTCStatsReport
import org.webrtc.RtpParameters
import org.webrtc.RtpTransceiver
import org.webrtc.SdpObserver
import org.webrtc.SessionDescription
import org.webrtc.SurfaceTextureHelper
import org.webrtc.VideoSink
import org.webrtc.VideoTrack
import java.nio.ByteBuffer
import java.util.concurrent.Executors
import kotlin.math.abs
import kotlin.math.atan
import kotlin.math.roundToInt
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

/**
 * A camera the user can pick. `focalMm` is the shortest focal length (shorter = wider).
 * `w`×`h` is the capture size: the sensor's full aspect, so nothing is cropped. `fov` is H×V degrees.
 */
data class CameraInfo(val id: String, val back: Boolean, val focalMm: Float, val w: Int, val h: Int, val fov: String) {
    val label get() = "cam $id ${if (back) "back" else "front"} ${"%.1f".format(focalMm)}mm ${w}x$h $fov°"
}

/**
 * Largest size (long side ≤ maxLong) matching the sensor's aspect. Any other aspect makes Camera2
 * crop the sensor (16:9 on a 4:3 sensor loses a quarter of the vertical FOV). Null if none match.
 */
fun pickCaptureSize(sizes: List<Pair<Int, Int>>, sensorAspect: Float, maxLong: Int = MAX_CAPTURE_LONG): Pair<Int, Int>? =
    sizes.filter { (w, h) -> maxOf(w, h) <= maxLong && abs(w.toFloat() / h - sensorAspect) < 0.02f }
        .maxByOrNull { (w, h) -> w * h }

// Widest back camera, else any back camera, else anything.
// Samsung may only expose the ultrawide through the logical back camera; then this picks that one.
fun pickWideCamera(cams: List<CameraInfo>): CameraInfo? = cams.filter { it.back }.minByOrNull { it.focalMm } ?: cams.firstOrNull()

// TODO(open-item): capture resolution/FPS (thermal throttling).
// Quest 3 ≈ 25 px/deg, so the 70° crop wants ~1750 px, i.e. ~2600 px across the full 105°.
// 2560 long side → 2560x1920 on a 4:3 sensor (or the next 4:3 size down).
const val MAX_CAPTURE_LONG = 2560
private const val FALLBACK_W = 1440
private const val FALLBACK_H = 1080
private const val CAPTURE_FPS = 30
// libwebrtc's default cap is ~2.5 Mbps; the Quest magnifies a crop, so spend LAN bandwidth on detail.
// Ceiling only: congestion control still backs off on a weak link. ~25 Mbps suits 2560x1920@30 in H.264.
private const val MAX_VIDEO_BPS = 25_000_000
private const val STATS_MS = 5_000L

class RobotPeer(private val ctx: Context, private val signal: (String) -> Unit) {
    var onJoints: (Joints) -> Unit = {}
    var onPan: (Pan) -> Unit = {}
    /** A new data channel opened (new operator session). Reset per-session state such as seq tracking. */
    var onChannelOpen: () -> Unit = {}
    var onState: (String) -> Unit = {}
    var onLog: (String) -> Unit = {}

    val egl: EglBase = EglBase.create()
    private val factory: PeerConnectionFactory
    // Every PeerConnection operation runs on this one thread, in signal order.
    private val scope = CoroutineScope(SupervisorJob() + Executors.newSingleThreadExecutor().asCoroutineDispatcher())
    private val inbox = Channel<String>(Channel.UNLIMITED)

    private var pc: PeerConnection? = null
    @Volatile private var dc: DataChannel? = null
    private val pendingIce = mutableListOf<IceCandidate>()

    private var capturer: Camera2Capturer? = null
    private var captureSize = 0 to 0
    private var lastSent = 0L to 0.0 // bytesSent, timestampUs of the previous stats sample
    @Volatile private var videoTrack: VideoTrack? = null

    init {
        PeerConnectionFactory.initialize(PeerConnectionFactory.InitializationOptions.builder(ctx).createInitializationOptions())
        factory = PeerConnectionFactory.builder()
            .setVideoEncoderFactory(DefaultVideoEncoderFactory(egl.eglBaseContext, true, true))
            .setVideoDecoderFactory(DefaultVideoDecoderFactory(egl.eglBaseContext))
            .createPeerConnectionFactory()
        scope.launch {
            for (text in inbox) runCatching { handle(text) }.onFailure { onLog("rtc: ${it.message}") }
        }
        scope.launch {
            while (true) {
                delay(STATS_MS)
                pc?.getStats(::logStats)
            }
        }
    }

    /** Operator → robot signaling text from the hub. */
    fun onSignal(text: String) {
        inbox.trySend(text)
    }

    /** Sends JSON on the control channel if it is open. Called from the sensor and USB threads. */
    fun send(json: String): Boolean {
        val ch = dc ?: return false
        return try {
            ch.state() == DataChannel.State.OPEN && ch.send(DataChannel.Buffer(ByteBuffer.wrap(json.toByteArray()), false))
        } catch (_: IllegalStateException) {
            false // answer() disposed this channel between our read of dc and the call
        }
    }

    fun listCameras(): List<CameraInfo> {
        val cm = ctx.getSystemService(CameraManager::class.java)
        val formats = Camera2Enumerator(ctx)
        return cm.cameraIdList.map { id ->
            val c = cm.getCameraCharacteristics(id)
            val focal = c.get(CameraCharacteristics.LENS_INFO_AVAILABLE_FOCAL_LENGTHS)?.minOrNull() ?: Float.MAX_VALUE
            val active = c.get(CameraCharacteristics.SENSOR_INFO_ACTIVE_ARRAY_SIZE)
            val aspect = active?.let { it.width().toFloat() / it.height() } ?: (4f / 3f)
            val sizes = formats.getSupportedFormats(id).orEmpty().map { it.width to it.height }
            val (w, h) = pickCaptureSize(sizes, aspect) ?: (FALLBACK_W to FALLBACK_H)
            // Pinhole FOV of the full sensor: 2·atan(size / 2f). Feed this into the operator's DEFAULT_VIDEO.
            val fov = c.get(CameraCharacteristics.SENSOR_INFO_PHYSICAL_SIZE)?.let { s ->
                fun deg(mm: Float) = Math.toDegrees(2 * atan(mm / (2 * focal).toDouble())).roundToInt()
                "${deg(s.width)}x${deg(s.height)}"
            } ?: "?"
            CameraInfo(id, c.get(CameraCharacteristics.LENS_FACING) == CameraCharacteristics.LENS_FACING_BACK, focal, w, h, fov)
        }
    }

    /** Starts (or switches) the camera and sends it on the current and future connections. Needs CAMERA permission. */
    fun useCamera(cam: CameraInfo, preview: VideoSink) {
        val size = cam.w to cam.h
        capturer?.let {
            videoTrack?.addSink(preview) // the activity may have been recreated with a new preview
            // switchCamera keeps the old size; restart at the new camera's full-sensor size if it differs.
            it.switchCamera(object : CameraVideoCapturer.CameraSwitchHandler {
                override fun onCameraSwitchDone(front: Boolean) {
                    if (size != captureSize) it.changeCaptureFormat(cam.w, cam.h, CAPTURE_FPS).also { captureSize = size }
                }
                override fun onCameraSwitchError(e: String?) = onLog("camera switch: $e")
            }, cam.id)
            return
        }
        val source = factory.createVideoSource(false)
        val cap = Camera2Capturer(ctx, cam.id, null)
        cap.initialize(SurfaceTextureHelper.create("capture", egl.eglBaseContext), ctx, source.capturerObserver)
        cap.startCapture(cam.w, cam.h, CAPTURE_FPS)
        captureSize = size
        val track = factory.createVideoTrack("camera", source)
        track.addSink(preview)
        capturer = cap
        videoTrack = track
        scope.launch { videoTransceiver()?.sender?.setTrack(track, false) }
    }

    private fun videoTransceiver(): RtpTransceiver? =
        pc?.transceivers?.firstOrNull { it.mediaType == MediaStreamTrack.MediaType.MEDIA_TYPE_VIDEO }

    private suspend fun handle(text: String) {
        when (val msg = parseSignal(text)) {
            is Signal.Offer -> answer(msg.sdp)
            is Signal.Ice -> {
                val pc = this.pc ?: return // ICE before any offer is dropped
                val c = IceCandidate(msg.sdpMid ?: "", msg.sdpMLineIndex ?: 0, msg.candidate)
                if (pc.remoteDescription != null) pc.addIceCandidate(c) else pendingIce += c
            }
            is Signal.Peer -> if (msg.role == "operator" && !msg.present) onState("operator left")
            null -> {}
        }
    }

    private suspend fun answer(sdp: String) {
        val old = dc
        dc = null // before dispose, so send() stops picking it up
        old?.let { it.unregisterObserver(); it.close(); it.dispose() }
        pc?.dispose()
        pendingIce.clear()
        val config = PeerConnection.RTCConfiguration(emptyList()).apply {
            sdpSemantics = PeerConnection.SdpSemantics.UNIFIED_PLAN
        }
        val pc = factory.createPeerConnection(config, Observer()) ?: error("createPeerConnection failed")
        this.pc = pc
        pc.awaitSet { pc.setRemoteDescription(it, SessionDescription(SessionDescription.Type.OFFER, sdp)) }
        // The operator offers a recvonly video transceiver; send on it (camera may start later).
        videoTransceiver()?.let { t ->
            t.direction = RtpTransceiver.RtpTransceiverDirection.SEND_ONLY
            videoTrack?.let { t.sender.setTrack(it, false) }
        }
        pendingIce.forEach { pc.addIceCandidate(it) }
        pendingIce.clear()
        val answer = suspendCoroutine { cont ->
            pc.createAnswer(object : SdpAdapter() {
                override fun onCreateSuccess(d: SessionDescription) = cont.resume(d)
                override fun onCreateFailure(e: String?) = cont.resumeWithException(IllegalStateException("createAnswer: $e"))
            }, MediaConstraints())
        }
        pc.awaitSet { pc.setLocalDescription(it, answer) }
        videoTransceiver()?.sender?.let { s ->
            val p = s.parameters
            // Under load, drop frame rate rather than resolution: blur reads worse than judder on a big panel.
            p.degradationPreference = RtpParameters.DegradationPreference.MAINTAIN_RESOLUTION
            p.encodings.forEach { it.maxBitrateBps = MAX_VIDEO_BPS }
            if (!s.setParameters(p)) onLog("rtc: setParameters failed")
        }
        signal(answerJson(pc.localDescription.description))
        onState("connecting")
    }

    /** One log line per STATS_MS: what the encoder is actually sending, and what limits it. */
    private fun logStats(r: RTCStatsReport) {
        val out = r.statsMap.values.firstOrNull { it.type == "outbound-rtp" && it.members["kind"] == "video" } ?: return
        val m = out.members
        val bytes = (m["bytesSent"] as? Number)?.toLong() ?: 0L
        val kbps = if (out.timestampUs > lastSent.second) (bytes - lastSent.first) * 8 * 1000 / (out.timestampUs - lastSent.second) else 0.0
        lastSent = bytes to out.timestampUs
        val codec = r.statsMap[m["codecId"]]?.members?.get("mimeType")
        onLog(
            "video: ${m["frameWidth"]}x${m["frameHeight"]} ${(m["framesPerSecond"] as? Number)?.toInt()}fps " +
                "${kbps.toInt()}kbps $codec ${m["encoderImplementation"]} limit=${m["qualityLimitationReason"]}",
        )
    }

    private inner class Observer : PeerConnection.Observer {
        override fun onIceCandidate(c: IceCandidate) = signal(iceJson(c.sdp, c.sdpMid, c.sdpMLineIndex))
        override fun onDataChannel(ch: DataChannel) {
            if (ch.label() != "control") return
            dc = ch
            ch.registerObserver(object : DataChannel.Observer {
                override fun onStateChange() {
                    when (ch.state()) {
                        DataChannel.State.OPEN -> {
                            onState("connected")
                            onChannelOpen()
                        }
                        DataChannel.State.CLOSED -> if (dc === ch) onState("operator disconnected")
                        else -> {}
                    }
                }
                override fun onMessage(b: DataChannel.Buffer) {
                    if (b.binary) return
                    val bytes = ByteArray(b.data.remaining()).also { b.data.get(it) }
                    val text = String(bytes)
                    parseJointsMsg(text)?.let(onJoints) ?: parsePanMsg(text)?.let(onPan)
                }
                override fun onBufferedAmountChange(previous: Long) {}
            })
        }
        override fun onSignalingChange(s: PeerConnection.SignalingState) {}
        override fun onIceConnectionChange(s: PeerConnection.IceConnectionState) = onLog("ice: $s")
        override fun onIceConnectionReceivingChange(receiving: Boolean) {}
        override fun onIceGatheringChange(s: PeerConnection.IceGatheringState) {}
        override fun onIceCandidatesRemoved(c: Array<out IceCandidate>) {}
        override fun onAddStream(s: org.webrtc.MediaStream) {}
        override fun onRemoveStream(s: org.webrtc.MediaStream) {}
        override fun onRenegotiationNeeded() {}
    }
}

private open class SdpAdapter : SdpObserver {
    override fun onCreateSuccess(d: SessionDescription) {}
    override fun onSetSuccess() {}
    override fun onCreateFailure(e: String?) {}
    override fun onSetFailure(e: String?) {}
}

private suspend fun PeerConnection.awaitSet(op: (SdpObserver) -> Unit) = suspendCoroutine { cont ->
    op(object : SdpAdapter() {
        override fun onSetSuccess() = cont.resume(Unit)
        override fun onSetFailure(e: String?) = cont.resumeWithException(IllegalStateException("setDescription: $e"))
    })
}
