package com.armmirror.robot.ui

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.hardware.usb.UsbManager
import android.os.Bundle
import android.view.WindowManager
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeDrawingPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import com.armmirror.robot.RobotApp
import com.armmirror.robot.RobotApplication
import org.webrtc.RendererCommon
import org.webrtc.SurfaceViewRenderer

class MainActivity : ComponentActivity() {
    private val robot: RobotApp get() = (application as RobotApplication).robot

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Replaces the web Screen Wake Lock: the screen stays on while this activity is in front.
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        onUsbIntent(intent)
        setContent { MaterialTheme(colorScheme = darkColorScheme()) { RobotScreen(robot) } }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        onUsbIntent(intent)
    }

    // The ESP32 was (re)plugged: the system grants permission with this intent, so reconnect.
    private fun onUsbIntent(i: Intent?) {
        if (i?.action == UsbManager.ACTION_USB_DEVICE_ATTACHED && !robot.mock.value) robot.connectArm()
    }
}

@Composable
private fun RobotScreen(robot: RobotApp) {
    val ctx = androidx.compose.ui.platform.LocalContext.current
    val renderer = remember {
        SurfaceViewRenderer(ctx).apply {
            init(robot.peer.egl.eglBaseContext, null)
            setMirror(false)
            setScalingType(RendererCommon.ScalingType.SCALE_ASPECT_FIT) // default BALANCED crops the preview
        }
    }
    val askCamera = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
        if (granted) robot.startCameraAndSensors(renderer) else robot.log("camera: permission denied")
    }
    val mono = MaterialTheme.typography.bodySmall.copy(fontFamily = FontFamily.Monospace, fontSize = 12.sp)

    Column(
        Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background).safeDrawingPadding().padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        Text("Clawitzer", style = MaterialTheme.typography.titleMedium, color = MaterialTheme.colorScheme.onBackground)
        Text(
            listOf(
                "link: ${robot.link.value}   arm: ${robot.arm.value.name.lowercase()}${if (robot.mock.value) " (mock)" else ""}",
                "camera: ${robot.camera.value}   orientation: ${robot.orient.value}",
                robot.mcu.value,
            ).joinToString("\n"),
            style = mono,
            color = MaterialTheme.colorScheme.onBackground,
        )
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = {
                if (ContextCompat.checkSelfPermission(ctx, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
                    robot.startCameraAndSensors(renderer)
                } else {
                    askCamera.launch(Manifest.permission.CAMERA)
                }
            }) { Text("Start camera + sensors") }
            Button(onClick = robot::connectArm, enabled = !robot.mock.value) { Text("Connect arm") }
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text("Mock MCU ", color = MaterialTheme.colorScheme.onBackground)
                Switch(checked = robot.mock.value, onCheckedChange = robot::setMock)
            }
        }
        if (robot.cameras.value.size > 1) {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                robot.cameras.value.forEach { cam ->
                    OutlinedButton(onClick = { robot.useCamera(cam, renderer) }) { Text(cam.label, fontSize = 11.sp) }
                }
            }
        }
        // Landscape: preview and log side by side so both fit the short screen.
        Row(Modifier.fillMaxWidth().weight(1f), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            AndroidView({ renderer }, Modifier.weight(1f).fillMaxHeight())
            val listState = rememberLazyListState()
            LaunchedEffect(robot.log.size) { if (robot.log.isNotEmpty()) listState.scrollToItem(robot.log.size - 1) }
            LazyColumn(Modifier.weight(1f).fillMaxHeight(), state = listState) {
                items(robot.log) { Text(it, style = mono, color = MaterialTheme.colorScheme.onBackground) }
            }
        }
    }
}
