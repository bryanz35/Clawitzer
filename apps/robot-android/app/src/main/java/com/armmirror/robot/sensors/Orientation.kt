// Phone orientation → camOrient. TYPE_ROTATION_VECTOR is the same fused sensor Chrome's
// AbsoluteOrientationSensor used: device frame relative to Earth ENU (x east, y north, z up),
// so apps/operator/src/video.ts needs no change.
package com.armmirror.robot.sensors

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager

private const val PERIOD_US = 16_667 // ~60 Hz

/** Calls `onQuat` with `[x, y, z, w]` per reading. Returns a stop function, or null if the sensor is missing. */
fun startOrientation(ctx: Context, onQuat: (FloatArray) -> Unit): (() -> Unit)? {
    val sm = ctx.getSystemService(SensorManager::class.java)
    val sensor = sm.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR) ?: return null
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
