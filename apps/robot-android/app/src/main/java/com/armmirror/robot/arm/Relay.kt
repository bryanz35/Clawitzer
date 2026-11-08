// Relay rule: forward `joints` to serial ONLY when `engaged` is true. Otherwise send nothing, so
// the firmware watchdog holds the arm. The channel is unordered: drop anything older than what
// we've already seen.
package com.armmirror.robot.arm

import com.armmirror.robot.protocol.Joints
import com.armmirror.robot.protocol.Pan
import com.armmirror.robot.protocol.seqIsNewer

// `send` stays last so `Relay { … }` keeps meaning the joint sender.
class Relay(private val sendPan: (Double) -> Unit = {}, private val send: (List<Double>) -> Unit) {
    private var lastSeq: Int? = null
    private var lastPanSeq: Int? = null

    /** New operator session: its seq starts over. */
    @Synchronized fun reset() {
        lastSeq = null
        lastPanSeq = null
    }

    @Synchronized fun onJoints(msg: Joints) {
        val last = lastSeq
        if (last != null && !seqIsNewer(msg.seq, last)) return
        lastSeq = msg.seq
        if (msg.engaged) send(msg.deg)
    }

    /** The pan stand follows the head without the deadman; firmware enforces range and e-stop. */
    @Synchronized fun onPan(msg: Pan) {
        val last = lastPanSeq
        if (last != null && !seqIsNewer(msg.seq, last)) return
        lastPanSeq = msg.seq
        sendPan(msg.deg)
    }
}
