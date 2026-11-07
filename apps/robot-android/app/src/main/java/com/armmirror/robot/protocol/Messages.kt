// JSON messages, mirroring packages/protocol/src/messages.ts (canonical). Only the shapes the
// phone sends or receives are here. Everything arriving from the network is validated.
package com.armmirror.robot.protocol

import org.json.JSONArray
import org.json.JSONObject

/** Quest → phone on the `control` data channel. */
data class Joints(val seq: Int, val deg: List<Double>, val engaged: Boolean)

sealed interface Signal {
    data class Offer(val sdp: String) : Signal
    data class Ice(val candidate: String, val sdpMid: String?, val sdpMLineIndex: Int?) : Signal
    data class Peer(val role: String, val present: Boolean) : Signal
}

private fun obj(text: String): JSONObject? = runCatching { JSONObject(text) }.getOrNull()

private fun JSONObject.num(key: String): Double? = (opt(key) as? Number)?.toDouble()?.takeIf { it.isFinite() }

private fun JSONObject.int(key: String): Int? = num(key)?.takeIf { it == Math.floor(it) && it >= 0 && it < Int.MAX_VALUE }?.toInt()

private fun JSONObject.strOrNull(key: String): Result<String?> = when (val v = opt(key)) {
    null, JSONObject.NULL -> Result.success(null)
    is String -> Result.success(v)
    else -> Result.failure(IllegalArgumentException(key))
}

/** Parses a `joints` message; null if it is anything else or malformed. */
fun parseJointsMsg(text: String): Joints? {
    val o = obj(text) ?: return null
    if (o.opt("t") != "joints") return null
    val seq = o.int("seq")?.takeIf { it < SEQ_MODULUS } ?: return null
    val arr = o.opt("deg") as? JSONArray ?: return null
    if (arr.length() != NUM_JOINTS) return null
    val deg = (0 until NUM_JOINTS).map { (arr.opt(it) as? Number)?.toDouble()?.takeIf(Double::isFinite) ?: return null }
    val engaged = o.opt("engaged") as? Boolean ?: return null
    return Joints(seq, deg, engaged)
}

/** Parses an operator → robot signaling message (offer, ice, peer); null otherwise. */
fun parseSignal(text: String): Signal? {
    val o = obj(text) ?: return null
    return when (o.opt("t")) {
        "offer" -> (o.opt("sdp") as? String)?.let { Signal.Offer(it) }
        "ice" -> {
            val c = o.opt("candidate") as? JSONObject ?: return null
            val cand = c.opt("candidate") as? String ?: return null
            val mid = c.strOrNull("sdpMid").getOrElse { return null }
            val idx = when (c.opt("sdpMLineIndex")) {
                null, JSONObject.NULL -> null
                else -> c.int("sdpMLineIndex") ?: return null
            }
            Signal.Ice(cand, mid, idx)
        }
        "peer" -> {
            val role = (o.opt("role") as? String)?.takeIf { it == "operator" || it == "robot" } ?: return null
            val present = o.opt("present") as? Boolean ?: return null
            Signal.Peer(role, present)
        }
        else -> null
    }
}

fun answerJson(sdp: String): String = JSONObject().put("t", "answer").put("sdp", sdp).toString()

fun iceJson(candidate: String, sdpMid: String?, sdpMLineIndex: Int): String =
    JSONObject().put("t", "ice").put(
        "candidate",
        JSONObject().put("candidate", candidate).put("sdpMid", sdpMid ?: JSONObject.NULL).put("sdpMLineIndex", sdpMLineIndex),
    ).toString()

fun peerJson(role: String, present: Boolean): String = JSONObject().put("t", "peer").put("role", role).put("present", present).toString()

fun statusJson(s: Status): String =
    JSONObject().put("t", "status").put("seq", s.seq).put("state", s.state).put("deg", JSONArray(s.deg)).toString()

/** `q` is `[x, y, z, w]`: device frame relative to Earth ENU, same as the web AbsoluteOrientationSensor. */
fun camOrientJson(q: FloatArray, ts: Long): String =
    JSONObject().put("t", "camOrient").put("q", JSONArray().apply { q.forEach { put(it.toDouble()) } }).put("ts", ts).toString()
