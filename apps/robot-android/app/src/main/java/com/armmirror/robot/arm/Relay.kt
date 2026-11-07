// Relay rule: forward `joints` to serial ONLY when `engaged` is true. Otherwise send nothing, so
// the firmware watchdog holds the arm. The channel is unordered: drop anything older than what
// we've already seen.
package com.armmirror.robot.arm

import com.armmirror.robot.protocol.Joints
import com.armmirror.robot.protocol.seqIsNewer

class Relay(private val send: (List<Double>) -> Unit) {
    private var lastSeq: Int? = null

    /** New operator session: its seq starts over. */
    @Synchronized fun reset() {
        lastSeq = null
    }

    @Synchronized fun onJoints(msg: Joints) {
        val last = lastSeq
        if (last != null && !seqIsNewer(msg.seq, last)) return
        lastSeq = msg.seq
        if (msg.engaged) send(msg.deg)
    }
}
