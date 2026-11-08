// Landscape camera-first screen: full-bleed preview, roll tape + caption on the feed, and a
// collapsible arm sheet (Status · Joints · Log) that folds into a pill.
package com.armmirror.robot.ui

import android.os.Handler
import android.os.Looper
import android.view.View
import androidx.compose.animation.core.CubicBezierEasing
import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.displayCutout
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.union
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.foundation.selection.toggleable
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ProvideTextStyle
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.clipToBounds
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.draw.dropShadow
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.BlendMode
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.CompositingStrategy
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.Shadow
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.drawText
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.rememberTextMeasurer
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.DpOffset
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.em
import androidx.compose.ui.unit.max
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.armmirror.robot.RobotApp
import com.armmirror.robot.arm.ArmLinkState
import com.armmirror.robot.protocol.Status
import com.armmirror.robot.rtc.CameraInfo
import com.armmirror.robot.rtc.pickWideCamera
import org.webrtc.VideoFrame
import org.webrtc.VideoSink
import java.util.Locale
import kotlin.math.abs
import kotlin.math.roundToInt
import androidx.compose.ui.graphics.shadow.Shadow as BoxShadow

enum class SheetTab { Status, Joints, Log }

data class Joint(val id: String, val name: String, val min: Float, val max: Float) {
    fun pct(deg: Double) = ((deg.toFloat() - min) / (max - min)).coerceIn(0f, 1f)
}

// Mirrors the limits in hardware/urdf/arm.urdf (display only; firmware enforces the real limits).
val JOINTS = listOf(
    Joint("j1", "Base yaw", -180f, 180f),
    Joint("j2", "Elbow pitch", -90f, 20f),
    Joint("j3", "Wrist pitch", -90f, 90f),
    Joint("j4", "Wrist roll", -90f, 90f),
    Joint("j5", "Gripper", -90f, 90f),
)

private val SHEET_W = 292.dp
private const val LOG_LINES = 22
private val SheetEasing = CubicBezierEasing(0.2f, 0.8f, 0.2f, 1f)

private fun title(s: ArmLinkState) = s.name.lowercase().replaceFirstChar { it.uppercase() }

/** `+1.2°` / `−1.2°` (U+2212), never `−0.0°`. */
fun formatRoll(deg: Float): String {
    val r = (deg * 10).roundToInt() / 10f
    return (if (r < 0) "−" else "+") + "%.1f°".format(Locale.ROOT, abs(r))
}

/** Passes frames to the preview and measures the live resolution and fps once a second. */
class FrameMeter(private val out: VideoSink) : VideoSink {
    var caption by mutableStateOf("")
        private set
    private val main = Handler(Looper.getMainLooper())
    private var frames = 0
    private var t0 = 0L

    // shortcut: the caption keeps its last value if frames stop; add a timeout if that misleads anyone.
    override fun onFrame(f: VideoFrame) {
        out.onFrame(f)
        val now = System.nanoTime()
        if (t0 == 0L) t0 = now
        frames++
        if (now - t0 >= 1_000_000_000L) {
            val text = "${f.rotatedWidth} × ${f.rotatedHeight} at ${(frames * 1e9 / (now - t0)).roundToInt()} fps"
            main.post { caption = text }
            frames = 0
            t0 = now
        }
    }
}

@Composable
fun CameraScreen(robot: RobotApp, preview: View, caption: String, onCamera: (CameraInfo) -> Unit) {
    var open by rememberSaveable { mutableStateOf(true) }
    var tab by rememberSaveable { mutableStateOf(SheetTab.Status) }
    val arm = robot.arm.value
    val status = robot.status.value.takeIf { arm == ArmLinkState.READY }
    val cutout = WindowInsets.displayCutout

    ProvideTextStyle(CzText) {
        Box(Modifier.fillMaxSize().background(Color.Black)) {
            AndroidView({ preview }, Modifier.fillMaxSize())
            BoxWithConstraints(Modifier.fillMaxSize()) {
                // Centre of the feed the sheet leaves uncovered (≈ x 300 on the 891 dp S25 Ultra).
                val feedCentre = (maxWidth - SHEET_W - 10.dp) / 2
                RollTape(robot.roll.floatValue, feedCentre)
                if (caption.isNotEmpty()) {
                    Text(
                        caption,
                        Modifier.align(Alignment.BottomStart)
                            .windowInsetsPadding(cutout.union(WindowInsets(left = 36.dp, bottom = 14.dp))),
                        style = feedStyle().copy(fontSize = 11.sp, fontStyle = FontStyle.Italic),
                    )
                }
            }
            JointPill(
                arm, status, visible = !open, onClick = { open = true },
                modifier = Modifier.align(Alignment.TopEnd).windowInsetsPadding(cutout.union(WindowInsets(top = 14.dp, right = 16.dp))),
            )
            ArmSheet(
                open, onCollapse = { open = false }, tab, onTab = { tab = it },
                modifier = Modifier.align(Alignment.TopEnd)
                    .windowInsetsPadding(cutout.union(WindowInsets(10.dp, 10.dp, 10.dp, 10.dp)))
                    .width(SHEET_W).fillMaxHeight(),
            ) {
                when (tab) {
                    SheetTab.Status -> StatusPane(robot, arm, status, onCamera)
                    SheetTab.Joints -> JointsPane(status)
                    SheetTab.Log -> LogPane(robot.log)
                }
            }
        }
    }
}

@Composable
private fun feedStyle(): TextStyle {
    val d = LocalDensity.current
    val shadow = with(d) { Shadow(Color.Black.copy(alpha = 0.8f), Offset(0f, 1.dp.toPx()), blurRadius = 3.dp.toPx()) }
    return CzText.copy(color = Cz.Paper, shadow = shadow)
}

// ---- Feed overlays (decorative) ----

@Composable
private fun RollTape(roll: Float, centreX: Dp) {
    val r by animateFloatAsState(roll, tween(100, easing = LinearEasing), label = "roll")
    val measurer = rememberTextMeasurer()
    val style = feedStyle()
    val labels = remember(measurer, style) {
        (-40..40 step 10).associateWith { v -> measurer.measure(if (v < 0) "−${-v}" else "$v", style.copy(fontSize = 9.sp)) }
    }
    Canvas(
        Modifier.offset(x = centreX - 140.dp, y = 12.dp).size(280.dp, 34.dp)
            .graphicsLayer(compositingStrategy = CompositingStrategy.Offscreen)
            .clearAndSetSemantics {},
    ) {
        val c = size.width / 2
        val perDeg = 6.dp.toPx()
        for (v in -40..40 step 5) {
            // The caret reads the same value as the readout, so ticks move opposite to roll.
            // TODO(device): confirm on the stand that tilting clockwise reads positive.
            val x = c + (v - r) * perDeg
            val major = v % 10 == 0
            drawLine(Cz.PaperTick, Offset(x, 0f), Offset(x, (if (major) 10 else 5).dp.toPx()), 1.dp.toPx())
            if (major) labels.getValue(v).let { drawText(it, topLeft = Offset(x - it.size.width / 2f, 12.dp.toPx())) }
        }
        drawRect(
            Brush.horizontalGradient(0f to Color.Transparent, 0.25f to Color.Black, 0.75f to Color.Black, 1f to Color.Transparent),
            blendMode = BlendMode.DstIn,
        )
    }
    Canvas(Modifier.offset(x = centreX - 5.dp, y = 8.dp).size(10.dp, 6.dp).clearAndSetSemantics {}) {
        drawPath(Path().apply { moveTo(0f, 0f); lineTo(size.width, 0f); lineTo(size.width / 2, size.height); close() }, Cz.A400)
    }
    Box(Modifier.offset(x = centreX - 60.dp, y = 48.dp).width(120.dp), contentAlignment = Alignment.TopCenter) {
        Text(formatRoll(r), style = feedStyle().copy(fontSize = 11.sp, color = Cz.A300), modifier = Modifier.semantics { contentDescription = "Roll ${formatRoll(roll)}" })
    }
}

// ---- Pill ----

@Composable
private fun JointPill(arm: ArmLinkState, status: Status?, visible: Boolean, onClick: () -> Unit, modifier: Modifier) {
    val a by animateFloatAsState(if (visible) 1f else 0f, tween(250), label = "pill")
    val shape = RoundedCornerShape(7.dp)
    val mode = status?.state
    val desc = "Open arm panel. Arm ${arm.name.lowercase()}, MCU ${mode?.lowercase() ?: "not ready"}"
    Row(
        modifier.graphicsLayer { alpha = a }
            .dropShadow(shape, BoxShadow(radius = 10.dp, color = Cz.ShadowInk.copy(alpha = 0.16f), offset = DpOffset(0.dp, 3.dp)))
            .clip(shape).background(Cz.PillFill)
            .then(
                if (visible) Modifier.clickable(role = Role.Button, onClick = onClick).semantics { contentDescription = desc }
                else Modifier.clearAndSetSemantics {},
            )
            .height(44.dp).padding(horizontal = 14.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Row(Modifier.height(20.dp).clearAndSetSemantics {}, horizontalArrangement = Arrangement.spacedBy(3.dp), verticalAlignment = Alignment.Bottom) {
            JOINTS.forEachIndexed { i, j ->
                val pct by animateFloatAsState(status?.deg?.get(i)?.let(j::pct) ?: 0f, tween(100, easing = LinearEasing), label = "bar")
                Box(Modifier.width(4.dp).height(max(2.dp, 20.dp * pct)).background(Cz.A600))
            }
        }
        Column(Modifier.clearAndSetSemantics {}) {
            Text(mode ?: "—", fontSize = 14.sp, lineHeight = 17.sp, fontWeight = FontWeight.SemiBold)
            Text("arm ${arm.name.lowercase()}", fontSize = 10.sp, lineHeight = 13.sp, color = Cz.N700)
        }
    }
}

// ---- Sheet ----

@Composable
private fun ArmSheet(
    open: Boolean, onCollapse: () -> Unit, tab: SheetTab, onTab: (SheetTab) -> Unit, modifier: Modifier,
    content: @Composable () -> Unit,
) {
    val hidden by animateFloatAsState(if (open) 0f else 1f, tween(320, easing = SheetEasing), label = "sheet")
    val d = LocalDensity.current
    val cutoutRight = WindowInsets.displayCutout.getRight(d, LocalLayoutDirection.current)
    val shape = RoundedCornerShape(7.dp)
    Column(
        modifier
            .offset { IntOffset((((SHEET_W + 16.dp).toPx() + cutoutRight) * hidden).roundToInt(), 0) }
            .then(if (open) Modifier else Modifier.clearAndSetSemantics {})
            .dropShadow(shape, BoxShadow(radius = 32.dp, color = Cz.ShadowInk.copy(alpha = 0.22f), offset = DpOffset(0.dp, 12.dp)))
            .clip(shape).background(Cz.SheetFill).border(1.dp, Cz.Divider, shape),
    ) {
        Row(
            Modifier.fillMaxWidth().height(44.dp)
                .drawBehind { drawRect(Cz.Divider, Offset(0f, size.height - 1.dp.toPx()), Size(size.width, 1.dp.toPx())) }
                .padding(start = 14.dp, end = 4.dp).selectableGroup(),
            horizontalArrangement = Arrangement.spacedBy(2.dp),
        ) {
            SheetTab.entries.forEach { t ->
                val sel = t == tab
                Box(
                    Modifier.fillMaxHeight().selectable(sel, role = Role.Tab, onClick = { onTab(t) })
                        .drawBehind {
                            if (sel) drawRect(Cz.Accent, Offset(0f, size.height - 1.5.dp.toPx()), Size(size.width, 1.5.dp.toPx()))
                        }
                        .padding(horizontal = 9.dp),
                    contentAlignment = Alignment.Center,
                ) { Text(t.name, fontSize = 15.sp, fontWeight = FontWeight.SemiBold, color = if (sel) Cz.A700 else Cz.N700) }
            }
            Spacer(Modifier.weight(1f))
            Box(
                Modifier.size(44.dp).clickable(role = Role.Button, onClick = onCollapse).semantics { contentDescription = "Collapse panel" },
                contentAlignment = Alignment.Center,
            ) {
                Canvas(Modifier.size(18.dp)) { // Lucide "x", 24-unit viewbox, stroke 1.75
                    val s = size.width / 24f
                    drawLine(Cz.Text, Offset(6 * s, 6 * s), Offset(18 * s, 18 * s), 1.75f * s, StrokeCap.Round)
                    drawLine(Cz.Text, Offset(18 * s, 6 * s), Offset(6 * s, 18 * s), 1.75f * s, StrokeCap.Round)
                }
            }
        }
        Box(Modifier.weight(1f).fillMaxWidth().clipToBounds()) { content() }
    }
}

@Composable
private fun CzButton(label: String, primary: Boolean, onClick: () -> Unit) {
    val shape = RoundedCornerShape(4.dp)
    Box(
        Modifier.heightIn(min = 40.dp).clip(shape).border(1.dp, if (primary) Cz.Accent else Cz.Divider, shape)
            .clickable(role = Role.Button, onClick = onClick).padding(horizontal = 17.dp, vertical = 9.dp),
        contentAlignment = Alignment.Center,
    ) {
        // Primary label in accent700, not accent: accent on the sheet is ~3:1, under 4.5:1 for 14 sp text.
        Text(
            label,
            fontSize = if (primary) 14.sp else 13.sp,
            fontWeight = if (primary) FontWeight.SemiBold else FontWeight.Normal,
            color = if (primary) Cz.A700 else Cz.Text,
        )
    }
}

@Composable
private fun StatusPane(robot: RobotApp, arm: ArmLinkState, status: Status?, onCamera: (CameraInfo) -> Unit) {
    val cams = robot.cameras.value
    val cam = robot.camera.value
    Column(
        Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(horizontal = 16.dp, vertical = 12.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        ProvideTextStyle(CzText.copy(fontSize = 12.5.sp)) {
            Text("ARM", fontSize = 10.sp, letterSpacing = 0.1.em, color = Cz.A700)
            Row(Modifier.fillMaxWidth().heightIn(min = 44.dp), verticalAlignment = Alignment.CenterVertically) {
                Text(title(arm), fontSize = 24.sp, lineHeight = 24.sp)
                Spacer(Modifier.weight(1f))
                when (arm) {
                    ArmLinkState.DISCONNECTED -> CzButton("Connect arm", primary = true, onClick = robot::connectArm)
                    ArmLinkState.READY -> CzButton("Reset", primary = false, onClick = robot::resetArm)
                    ArmLinkState.HANDSHAKING -> {}
                }
            }
            Row(Modifier.fillMaxWidth().clearAndSetSemantics {}, horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                ArmLinkState.entries.forEach { s ->
                    Column(Modifier.weight(1f)) {
                        Box(Modifier.fillMaxWidth().height(2.dp).background(if (s.ordinal <= arm.ordinal) Cz.A600 else Cz.N300))
                        Spacer(Modifier.height(3.dp))
                        Text(title(s), fontSize = 10.sp, color = if (s == arm) Cz.Text else Cz.N700)
                    }
                }
            }
            Box(Modifier.fillMaxWidth().height(1.dp).background(Cz.Divider))
            Column(verticalArrangement = Arrangement.spacedBy(5.dp)) {
                KeyValue("Link", robot.link.value)
                KeyValue("MCU", status?.let { "${it.state} · seq ${it.seq}" } ?: "—")
                KeyValue("Camera", cam?.let { cameraLabel(it, cams) } ?: "off")
                KeyValue("Orientation", robot.orient.value)
                KeyValue("Operator", robot.operatorUrls.joinToString("\n") { it.removePrefix("http://") }.ifEmpty { "no network" })
            }
            // Kept from the old screen: lens choice (Samsung may expose the ultrawide only via the logical camera)
            // and the mock MCU for bench work without hardware. Debug toggles the operator's in-VR arm model.
            if (cams.size > 1) {
                FlowRow(horizontalArrangement = Arrangement.spacedBy(6.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    cams.forEach { c ->
                        CzButton("${c.id} · ${"%.1f".format(Locale.ROOT, c.focalMm)} mm", primary = c.id == cam?.id) { onCamera(c) }
                    }
                }
            }
            SwitchRow("Mock MCU", robot.mock.value, robot::setMock)
            SwitchRow("Debug arm model in VR", robot.debug.value, robot::setDebug)
        }
    }
}

@Composable
private fun SwitchRow(label: String, checked: Boolean, onChange: (Boolean) -> Unit) {
    Row(
        Modifier.fillMaxWidth().heightIn(min = 44.dp).toggleable(checked, role = Role.Switch, onValueChange = onChange),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(label, color = Cz.N700, modifier = Modifier.weight(1f))
        Switch(
            checked = checked, onCheckedChange = null,
            colors = SwitchDefaults.colors(checkedTrackColor = Cz.A600, uncheckedTrackColor = Cz.N300, uncheckedBorderColor = Cz.N500, uncheckedThumbColor = Cz.N700),
        )
    }
}

private fun cameraLabel(c: CameraInfo, all: List<CameraInfo>): String =
    (if (c.back) "back" else "front") + " · " +
        if (c.back && pickWideCamera(all)?.id == c.id) "ultrawide" else "%.1f mm".format(Locale.ROOT, c.focalMm)

@Composable
private fun KeyValue(key: String, value: String) {
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(14.dp)) {
        Text(key, color = Cz.N700)
        Text(value, Modifier.weight(1f), textAlign = TextAlign.End, overflow = TextOverflow.Ellipsis)
    }
}

@Composable
private fun JointsPane(status: Status?) {
    Column(
        Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 12.dp),
        verticalArrangement = Arrangement.spacedBy(6.dp),
    ) {
        JOINTS.forEachIndexed { i, j -> JointRow(j, status?.deg?.getOrNull(i)) }
    }
}

@Composable
private fun JointRow(j: Joint, deg: Double?) {
    val pct by animateFloatAsState(deg?.let(j::pct) ?: 0f, tween(100, easing = LinearEasing), label = "marker")
    Column(Modifier.fillMaxWidth().alpha(if (deg == null) 0.35f else 1f).semantics(mergeDescendants = true) {}) {
        Row(Modifier.fillMaxWidth()) {
            Text(
                buildAnnotatedString {
                    withStyle(SpanStyle(fontStyle = FontStyle.Italic, color = Cz.N700)) { append(j.id) }
                    append("  ${j.name}")
                },
                Modifier.alignByBaseline(), fontSize = 11.5.sp,
            )
            Spacer(Modifier.weight(1f))
            Text(deg?.let { "%.1f°".format(Locale.ROOT, it) } ?: "—", Modifier.alignByBaseline(), fontSize = 16.sp)
        }
        Canvas(Modifier.fillMaxWidth().height(12.dp)) {
            val stroke = 1.dp.toPx()
            val y = size.height - stroke / 2
            drawLine(Cz.N500, Offset(0f, y), Offset(size.width, y), stroke)
            for (k in 0..10) {
                val x = size.width * k / 10
                drawLine(Cz.N500, Offset(x, y), Offset(x, y - 5.dp.toPx()), stroke)
            }
            val px = size.width * pct
            val half = 5.dp.toPx()
            drawPath(Path().apply { moveTo(px - half, size.height); lineTo(px + half, size.height); lineTo(px, size.height - 8.dp.toPx()); close() }, Cz.A600)
        }
        Row(Modifier.fillMaxWidth()) {
            Text("%.0f°".format(Locale.ROOT, j.min), fontSize = 9.sp, color = Cz.N700)
            Spacer(Modifier.weight(1f))
            Text("%.0f°".format(Locale.ROOT, j.max), fontSize = 9.sp, color = Cz.N700)
        }
    }
}

@Composable
private fun LogPane(log: List<String>) {
    Column(
        Modifier.fillMaxSize().padding(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 12.dp),
        verticalArrangement = Arrangement.Bottom,
    ) {
        log.takeLast(LOG_LINES).forEach {
            Text(
                it, maxLines = 1, overflow = TextOverflow.Ellipsis, color = Cz.N800,
                style = TextStyle(fontFamily = FontFamily.Monospace, fontSize = 10.5.sp, lineHeight = (10.5 * 1.55).sp),
            )
        }
    }
}
