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
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import androidx.core.content.ContextCompat
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import com.armmirror.robot.RobotApp
import com.armmirror.robot.RobotApplication
import org.webrtc.RendererCommon
import org.webrtc.SurfaceViewRenderer

class MainActivity : ComponentActivity() {
    private val robot: RobotApp get() = (application as RobotApplication).robot

    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge() // also lets the feed draw under the display cutout
        super.onCreate(savedInstanceState)
        // Replaces the web Screen Wake Lock: the screen stays on while this activity is in front.
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        WindowCompat.getInsetsController(window, window.decorView).run {
            systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            hide(WindowInsetsCompat.Type.systemBars())
        }
        onUsbIntent(intent)
        setContent {
            MaterialTheme(colorScheme = lightColorScheme(primary = Cz.Accent, background = Cz.Bg, surface = Cz.Bg)) { RobotScreen(robot) }
        }
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
    val ctx = LocalContext.current
    val renderer = remember {
        SurfaceViewRenderer(ctx).apply {
            init(robot.peer.egl.eglBaseContext, null)
            setMirror(false)
            setScalingType(RendererCommon.ScalingType.SCALE_ASPECT_FILL) // feed fills the screen (crops the 4:3 sensor)
        }
    }
    val meter = remember { FrameMeter(renderer) }
    val askCamera = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
        if (granted) robot.startCameraAndSensors(meter) else robot.log("camera: permission denied")
    }
    // Camera-first screen: start on launch (and re-attach the new preview after activity recreation).
    LaunchedEffect(Unit) {
        if (ContextCompat.checkSelfPermission(ctx, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
            robot.startCameraAndSensors(meter)
        } else {
            askCamera.launch(Manifest.permission.CAMERA)
        }
    }
    CameraScreen(robot, renderer, meter.caption, onCamera = { robot.useCamera(it, meter) })
}
