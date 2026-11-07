// Cases ported from the old apps/robot/test/relay.test.ts.
package com.armmirror.robot.arm

import com.armmirror.robot.protocol.Joints
import com.armmirror.robot.protocol.Status
import com.armmirror.robot.protocol.encodeStatus
import com.armmirror.robot.protocol.parseJoints
import org.junit.Assert.assertEquals
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

    @Test fun discardsLongGarbageWithoutNewline() {
        val statuses = mutableListOf<Status>()
        val s = SerialSession(write = {}, onStatus = { statuses += it }, onReady = {})
        s.onBytes(ByteArray(600) { 'x'.code.toByte() })
        s.onBytes(encodeStatus(Status(1, "IDLE", zeros)).toByteArray())
        assertEquals(1, statuses.size)
    }
}
