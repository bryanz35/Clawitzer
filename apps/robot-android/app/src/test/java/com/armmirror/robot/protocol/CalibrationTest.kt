// Vectors generated from packages/protocol/src/calibration.ts (canonical). Keep them in sync.
package com.armmirror.robot.protocol

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class CalibrationTest {
    @Test fun encodesStatusAndReferenceLikeTheCanonicalEncoder() {
        assertEquals("C,0,status*C3\n", encodeCalibration(0, "status"))
        assertEquals("C,12,reference,HOME_MARK_CONFIRMED*89\n", encodeCalibration(12, "reference,$CALIBRATION_REFERENCE_ACK"))
    }

    @Test fun parsesRepliesAndStatus() {
        val status = parseCalibrationReply(
            "K,0,OK,mode,normal,configured,1,referenced,0,lastseq,11,haveseq,1,fault,reference_required,lastjointseq,0*9A\n",
        )!!
        assertEquals(CalibrationStatus(normal = true, configured = true, referenced = false, lastSeq = 11, fault = "reference_required"), parseCalibrationStatus(status))
        assertEquals(CalibrationReply(12, true, emptyList()), parseCalibrationReply("K,12,OK*B6\n"))
        assertEquals(CalibrationReply(12, false, listOf("estop")), parseCalibrationReply("K,12,ERR,estop*A0\n"))
        assertNull(parseCalibrationReply("K,12,OK*B7\n"))
        assertNull(parseCalibrationStatus(CalibrationReply(12, true, emptyList())))
    }
}
