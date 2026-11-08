// Phone orientation → camOrient. TYPE_GAME_ROTATION_VECTOR (gyro + gravity, no magnetometer: the
// phone rides the pan servo, whose motor distorts the compass): device frame relative to a z-up world
// frame with an arbitrary, slowly drifting heading. The Quest only uses heading changes,
// so apps/operator/src/video.ts needs no change.
package com.armmirror.robot.sensors

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.view.Surface
import kotlin.math.atan2

private const val PERIOD_US = 16_667 // ~60 Hz

/** Calls `onQuat` with `[x, y, z, w]` per reading. Returns a stop function, or null if the sensor is missing. */
fun startOrientation(ctx: Context, onQuat: (FloatArray) -> Unit): (() -> Unit)? {
    val sm = ctx.getSystemService(SensorManager::class.java)
    val sensor = sm.getDefaultSensor(Sensor.TYPE_GAME_ROTATION_VECTOR) ?: return null
    val wxyz = FloatArray(4)
    val listener = object : SensorEventListener {
        override fun onSensorChanged(e: SensorEvent) {
            SensorManager.getQuaternionFromVector(wxyz, e.values)
            val q = floatArrayOf(wxyz[1], wxyz[2], wxyz[3], wxyz[0])
            if (q.all { it.isFinite() }) onQuat(q)
        }
        override fun onAccuracyChanged(s: Sensor, accuracy: Int) {}
    }
    sm.registerListener(listener, sensor, PERIOD_US)
    return { sm.unregisterListener(listener) }
}

/**
 * Roll of the screen about its normal in degrees, clockwise positive as the viewer sees the screen.
 * `q` is `[x, y, z, w]` from [startOrientation]; `rotation` is `Display.getRotation()`.
 * Undefined (noisy) when the phone lies flat.
 */
fun screenRollDeg(q: FloatArray, rotation: Int): Float {
    val (x, y, z, w) = q
    // World up (+z) in device coordinates: the third row of the device→world rotation matrix.
    val ux = 2 * (x * z - w * y)
    val uy = 2 * (y * z + w * x)
    // Device axes → screen axes (right, up) for each display rotation.
    val (right, up) = when (rotation) {
        Surface.ROTATION_90 -> -uy to ux
        Surface.ROTATION_180 -> -ux to -uy
        Surface.ROTATION_270 -> uy to -ux
        else -> ux to uy
    }
    return Math.toDegrees(atan2(-right, up).toDouble()).toFloat()
}
