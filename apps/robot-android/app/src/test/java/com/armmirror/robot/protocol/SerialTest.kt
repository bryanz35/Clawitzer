// Vectors mirror packages/protocol/test/serial.test.ts. Keep them in sync.
package com.armmirror.robot.protocol

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Assert.assertThrows
import org.junit.Test

class SerialTest {
    private val deg = listOf(10.0, -20.5, 0.0, 45.0, -45.0)

    @Test fun crc8CheckVector() {
        assertEquals(0xF4, crc8("123456789"))
        assertEquals(0, crc8(""))
    }

    @Test fun encodesDocumentedJointsLine() {
        // Also asserted in firmware/arm-controller/test/test_protocol.
        assertEquals("J,42,10.0,-20.5,0.0,45.0,-45.0*F6\n", encodeJoints(42, deg))
        assertEquals(42 to deg, parseJoints(encodeJoints(42, deg)))
    }

    @Test fun encodesAndParsesSharedCameraVectors() {
        // Shared with packages/protocol/test/serial.test.ts.
        assertEquals("P,7,90.5*AB\n", encodeCamera(7, 90.5))
        assertEquals(CameraStatus(7, 90.5, true), parseCameraStatus("V,7,90.5,1*4A\n"))
        assertNull(parseCameraStatus("V,7,90.5,1*4B\n"))
        assertThrows(IllegalArgumentException::class.java) { encodeCamera(1, 180.5) }
    }

    @Test fun roundsLikeToFixedAndNeverEmitsNegativeZero() {
        val line = encodeJoints(1, listOf(1.26, -0.04, 0.0, 0.0, 0.0))
        assertTrue(line, line.contains(",1.3,0.0,"))
        assertEquals("J,1,1.3,-1.3,0.1,-0.1,1.9" /* node: [1.25,-1.25,0.05,-0.15,1.95].map(d=>d.toFixed(1)) */, encodeJoints(1, listOf(1.25, -1.25, 0.05, -0.15, 1.95)).substringBefore('*'))
    }

    @Test fun rejectsBadCrcAndMalformed() {
        val line = encodeJoints(7, deg)
        assertNull(parseJoints(line.replace("10.0", "11.0")))
        assertNull(parseJoints(line.replace(Regex("\\*[0-9A-F]{2}"), "*00")))
        assertNull(parseJoints(""))
        assertNull(parseJoints("J,1,2,3*00\n"))
        assertNull(parseJoints("garbage"))
    }

    @Test fun refusesInvalidInput() {
        assertThrows(IllegalArgumentException::class.java) { encodeJoints(-1, deg) }
        assertThrows(IllegalArgumentException::class.java) { encodeJoints(SEQ_MODULUS, deg) }
        assertThrows(IllegalArgumentException::class.java) { encodeJoints(1, listOf(1.0, 2.0, 3.0)) }
        assertThrows(IllegalArgumentException::class.java) { encodeJoints(1, listOf(Double.NaN, 0.0, 0.0, 0.0, 0.0)) }
    }

    @Test fun statusLines() {
        val s = Status(65535, "ACTIVE", listOf(1.0, 2.0, 3.0, 4.0, 5.0))
        assertEquals(s, parseStatus(encodeStatus(s)))
        val idle = encodeStatus(Status(3, "IDLE", List(5) { 0.0 }))
        assertEquals("IDLE", parseStatus(idle.replace("\n", "\r\n"))?.state)
        assertNull(parseStatus(idle.replace(Regex("\\*[0-9A-F]{2}"), "*FF")))
        val bogus = ",3,BOGUS,0.0,0.0,0.0,0.0,0.0"
        assertNull(parseStatus("S$bogus*${crc8(bogus).toString(16).uppercase()}\n"))
    }

    @Test fun sequenceWrap() {
        assertEquals(0, nextSeq(SEQ_MODULUS - 1))
        assertTrue(seqIsNewer(0, SEQ_MODULUS - 1))
        assertTrue(seqIsNewer(5, SEQ_MODULUS - 3))
        assertFalse(seqIsNewer(10, 10))
        assertFalse(seqIsNewer(9, 10))
        assertFalse(seqIsNewer(SEQ_MODULUS - 1, 0))
        assertTrue(seqIsNewer(11, 10))
    }

    @Test fun jointsMessageGuard() {
        assertEquals(Joints(1, List(5) { 0.0 }, true), parseJointsMsg("""{"t":"joints","seq":1,"deg":[0,0,0,0,0],"engaged":true}"""))
        assertNull(parseJointsMsg("""{"t":"joints","seq":1,"deg":[0,0,0,0],"engaged":true}"""))
        assertNull(parseJointsMsg("""{"t":"joints","seq":1,"deg":[0,0,0,0,null],"engaged":true}"""))
        assertNull(parseJointsMsg("""{"t":"joints","seq":1,"deg":[0,0,0,0,0]}"""))
        assertNull(parseJointsMsg("""{"t":"joints","seq":1.5,"deg":[0,0,0,0,0],"engaged":true}"""))
        assertNull(parseJointsMsg("""{"t":"joints","seq":1,"deg":[0,0,0,0,0],"engaged":"yes"}"""))
        assertNull(parseJointsMsg("not json"))
    }

    @Test fun signalGuard() {
        assertEquals(Signal.Offer("v=0"), parseSignal("""{"t":"offer","sdp":"v=0"}"""))
        assertEquals(
            Signal.Ice("candidate:1", null, 0),
            parseSignal("""{"t":"ice","candidate":{"candidate":"candidate:1","sdpMid":null,"sdpMLineIndex":0}}"""),
        )
        assertNull(parseSignal("""{"t":"ice","candidate":{"candidate":"c","sdpMid":3,"sdpMLineIndex":0}}"""))
        assertEquals(Signal.Peer("operator", false), parseSignal(peerJson("operator", false)))
        assertNull(parseSignal("""{"t":"answer","sdp":"x"}"""))
    }
}
