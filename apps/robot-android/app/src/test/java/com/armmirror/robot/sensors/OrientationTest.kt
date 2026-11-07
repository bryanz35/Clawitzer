package com.armmirror.robot.sensors

import android.view.Surface
import com.armmirror.robot.ui.formatRoll
import org.junit.Assert.assertEquals
import org.junit.Test
import kotlin.math.cos
import kotlin.math.sin

class OrientationTest {
    // Quaternions are [x, y, z, w]; a∘b applies b in a's (device) frame.
    private fun axis(x: Float, y: Float, z: Float, deg: Float): FloatArray {
        val h = Math.toRadians(deg / 2.0)
        val s = sin(h).toFloat()
        return floatArrayOf(x * s, y * s, z * s, cos(h).toFloat())
    }

    private fun mul(a: FloatArray, b: FloatArray) = floatArrayOf(
        a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
        a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
        a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
        a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2],
    )

    // Upright landscape: ROTATION_90 has device +x up, ROTATION_270 has device −x up.
    private val level90 = axis(0f, 1f, 0f, -90f)
    private val level270 = axis(0f, 1f, 0f, 90f)
    private val cw10 = axis(0f, 0f, 1f, -10f) // clockwise about the screen normal (device +z faces the viewer)

    @Test fun levelLandscapeIsZero() {
        assertEquals(0f, screenRollDeg(level90, Surface.ROTATION_90), 0.01f)
        assertEquals(0f, screenRollDeg(level270, Surface.ROTATION_270), 0.01f)
    }

    @Test fun clockwiseIsPositiveInBothLandscapes() {
        assertEquals(10f, screenRollDeg(mul(level90, cw10), Surface.ROTATION_90), 0.01f)
        assertEquals(10f, screenRollDeg(mul(level270, cw10), Surface.ROTATION_270), 0.01f)
    }

    @Test fun uprightPortraitIsZero() {
        assertEquals(0f, screenRollDeg(axis(1f, 0f, 0f, 90f), Surface.ROTATION_0), 0.01f)
    }

    @Test fun rollReadoutUsesUnicodeMinusAndNoNegativeZero() {
        assertEquals("+1.2°", formatRoll(1.23f))
        assertEquals("−1.2°", formatRoll(-1.23f))
        assertEquals("+0.0°", formatRoll(-0.04f))
    }
}
