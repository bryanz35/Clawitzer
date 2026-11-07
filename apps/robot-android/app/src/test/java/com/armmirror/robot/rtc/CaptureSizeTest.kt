package com.armmirror.robot.rtc

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class CaptureSizeTest {
    private val sizes = listOf(4000 to 3000, 2560 to 1920, 1920 to 1080, 1920 to 1440, 1440 to 1080, 1280 to 720, 640 to 480)

    @Test fun picksLargestFullSensorSizeUnderCap() = assertEquals(2560 to 1920, pickCaptureSize(sizes, 4f / 3f))

    @Test fun matchesSixteenNineSensor() = assertEquals(1920 to 1080, pickCaptureSize(sizes, 16f / 9f))

    @Test fun nullWhenNoAspectMatches() = assertNull(pickCaptureSize(listOf(1920 to 1080), 4f / 3f))
}
