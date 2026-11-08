// Cases ported from the old apps/robot/test/relay.test.ts.
package com.armmirror.robot.arm

import com.armmirror.robot.protocol.Joints
import com.armmirror.robot.protocol.Pan
import com.armmirror.robot.protocol.frame
import com.armmirror.robot.protocol.Status
import com.armmirror.robot.protocol.encodeStatus
import com.armmirror.robot.protocol.parseJoints
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

class RelayTest {
    private fun msg(seq: Int, engaged: Boolean, d: Int = seq) = Joints(seq, listOf(d.toDouble(), 0.0, 0.0, 0.0, 0.0), engaged)

    private fun run(vararg steps: Any): List<Int> {
        val sent = mutableListOf<Int>()
        val relay = Relay { sent += it[0].toInt() }
        steps.forEach { if (it == "reset") relay.reset() else relay.onJoints(it as Joints) }
        return sent
    }

    @Test fun forwardsOnlyEngaged() = assertEquals(listOf(1, 3), run(msg(1, true), msg(2, false), msg(3, true)))

    @Test fun dropsStaleAndDuplicateAcrossWrap() =
        assertEquals(listOf(65535, 0), run(msg(65535, true), msg(0, true), msg(0, true), msg(65534, true)))

    @Test fun resetAcceptsNewSession() = assertEquals(listOf(500, 1), run(msg(500, true), "reset", msg(1, true)))

    @Test fun panIgnoresDeadmanButDropsStale() {
        val pans = mutableListOf<Double>()
        val relay = Relay(send = {}, sendPan = { pans += it })
        listOf(Pan(5, 80.0), Pan(4, 70.0), Pan(6, 95.0)).forEach(relay::onPan)
        relay.reset()
        relay.onPan(Pan(1, 90.0))
        assertEquals(listOf(80.0, 95.0, 90.0), pans)
    }
}

class SerialSessionTest {
    private val zeros = List(5) { 0.0 }

    @Test fun handshakeContinuesFromMcuSeqAndResyncsOnHoming() {
        val written = mutableListOf<String>()
        val statuses = mutableListOf<Status>()
        var readyCount = 0
        val s = SerialSession(write = { written += it }, onStatus = { statuses += it }, onReady = { readyCount++ })

        s.sendJoints(zeros) // not ready: dropped
        assertTrue(written.isEmpty())

        // Split across reads, with a debug line and noise in front.
        val idle = encodeStatus(Status(41, "IDLE", zeros))
        s.onBytes("# boot\ngarbage\n${idle.take(10)}".toByteArray())
        s.onBytes(idle.drop(10).toByteArray())
        assertEquals(1, readyCount)
        s.sendJoints(zeros)
        assertEquals(42, parseJoints(written.last())!!.first)

        // Board reset (DTR) → HOMING with seq 0: continue from 1.
        s.onBytes(encodeStatus(Status(0, "HOMING", zeros)).toByteArray())
        s.sendJoints(zeros)
        assertEquals(1, parseJoints(written.last())!!.first)

        // An ACTIVE status does not re-sync.
        s.onBytes(encodeStatus(Status(500, "ACTIVE", zeros)).toByteArray())
        s.sendJoints(zeros)
        assertEquals(2, parseJoints(written.last())!!.first)
        assertEquals(listOf("IDLE", "HOMING", "ACTIVE"), statuses.map { it.state })
        assertEquals(1, readyCount)
    }

    private fun fakeMcu(reply: (String) -> String?): Pair<SerialSession, MutableList<String>> {
        val written = mutableListOf<String>()
        lateinit var s: SerialSession
        s = SerialSession(write = { line -> written += line; reply(line)?.let { s.onBytes(it.toByteArray()) } }, onStatus = {}, onReady = {})
        return s to written
    }

    private val statusReply =
        "K,0,OK,mode,normal,configured,1,referenced,0,lastseq,11,haveseq,1,fault,reference_required,lastjointseq,0*9A\n"

    @Test fun referenceReadsStatusThenSendsNextCalibrationSeq() {
        val (s, written) = fakeMcu { if (it.startsWith("C,0,status")) statusReply else "K,12,OK*B6\n" }
        assertNull(s.reference(timeoutMs = 200))
        assertEquals(listOf("C,0,status*C3\n", "C,12,reference,HOME_MARK_CONFIRMED*89\n"), written)
    }

    @Test fun referenceReportsRejectionAndTimeoutWithoutRetry() {
        val (rejected, _) = fakeMcu { if (it.startsWith("C,0,status")) statusReply else "K,12,ERR,estop*A0\n" }
        assertEquals("firmware rejected reference: estop", rejected.reference(timeoutMs = 200))
        val (silent, written) = fakeMcu { null }
        assertTrue(silent.reference(timeoutMs = 20)!!.startsWith("no firmware reply to status"))
        assertEquals(1, written.size)
        val alreadyReferenced = frame('K', ",0,OK,mode,normal,configured,1,referenced,1,lastseq,11,haveseq,1,fault,none,lastjointseq,0")
        val (referenced, sent) = fakeMcu { alreadyReferenced }
        assertEquals("already referenced; halt outputs before a new reference", referenced.reference(timeoutMs = 200))
        assertEquals(1, sent.size) // never sends a second reference
    }

    @Test fun cameraSeqLearnedFromVLinesAndOnlyMovesForward() {
        val (s, written) = fakeMcu { null }
        s.sendCamera(90.0) // seq unknown: dropped
        assertTrue(written.isEmpty())
        s.onBytes("V,7,90.5,1*4A\n".toByteArray())
        s.sendCamera(90.0)
        s.sendCamera(91.0)
        s.onBytes("V,7,90.5,1*4A\n".toByteArray()) // lagging heartbeat: ignored
        s.sendCamera(92.0)
        assertEquals(listOf("P,8,90.0", "P,9,91.0", "P,10,92.0"), written.map { it.substringBefore('*') })
    }

    @Test fun discardsLongGarbageWithoutNewline() {
        val statuses = mutableListOf<Status>()
        val s = SerialSession(write = {}, onStatus = { statuses += it }, onReady = {})
        s.onBytes(ByteArray(600) { 'x'.code.toByte() })
        s.onBytes(encodeStatus(Status(1, "IDLE", zeros)).toByteArray())
        assertEquals(1, statuses.size)
    }
}
