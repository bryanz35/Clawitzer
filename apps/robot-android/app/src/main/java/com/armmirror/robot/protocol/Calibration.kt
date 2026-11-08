// Kotlin mirror of the subset of packages/protocol/src/calibration.ts the phone uses: the
// read-only `status` request and the explicit marked-home `reference`. That file stays canonical;
// keep the vectors in CalibrationTest.kt in sync with packages/protocol/test/calibration.test.ts.
//
//   request  C,<seq>,<verb>[,<arg>…]*<crc8>
//   reply    K,<seq>,OK[,<field>…]*<crc8>  |  K,<seq>,ERR,<code>*<crc8>
package com.armmirror.robot.protocol

const val CALIBRATION_MAX_LINE = 192
const val CALIBRATION_REFERENCE_ACK = "HOME_MARK_CONFIRMED"

/** Parsed `K` reply. `fields` excludes the seq and the OK/ERR token. */
data class CalibrationReply(val seq: Int, val ok: Boolean, val fields: List<String>)

/** Calibration mode, reference and sequence state from a `status` reply. */
data class CalibrationStatus(
    val normal: Boolean,
    val configured: Boolean,
    val referenced: Boolean,
    /** Last accepted calibration seq, or null when the firmware has none (any seq is accepted). */
    val lastSeq: Int?,
    val fault: String,
)

private val TOKEN = Regex("^[A-Za-z0-9_.+\\-]+$")

/** `fields` are the comma-separated verb and arguments, already validated tokens. */
fun encodeCalibration(seq: Int, fields: String): String {
    require(seq in 0 until SEQ_MODULUS) { "seq out of range: $seq" }
    require(fields.split(",").all { TOKEN.matches(it) }) { "bad calibration fields: $fields" }
    return frame('C', ",$seq,$fields").also { require(it.length - 1 <= CALIBRATION_MAX_LINE) { "calibration frame too long" } }
}

fun parseCalibrationReply(line: String): CalibrationReply? {
    if (line.trimEnd().length > CALIBRATION_MAX_LINE) return null
    val f = unframe(line, 'K') ?: return null
    if (f.size < 2 || !f.all { TOKEN.matches(it) } || !Regex("^\\d{1,5}$").matches(f[0])) return null
    val seq = f[0].toInt().takeIf { it < SEQ_MODULUS } ?: return null
    return when (f[1]) {
        "OK" -> CalibrationReply(seq, true, f.drop(2))
        "ERR" -> if (f.size == 3) CalibrationReply(seq, false, f.drop(2)) else null
        else -> null
    }
}

private val STATUS_KEYS = listOf("mode", "configured", "referenced", "lastseq", "haveseq", "fault", "lastjointseq")

/** Null unless `reply` is exactly a successful status reply. */
fun parseCalibrationStatus(reply: CalibrationReply): CalibrationStatus? {
    val v = reply.fields
    if (!reply.ok || v.size != 2 * STATUS_KEYS.size || STATUS_KEYS.withIndex().any { (i, k) -> v[2 * i] != k }) return null
    val value = STATUS_KEYS.withIndex().associate { (i, k) -> k to v[2 * i + 1] }
    fun flag(k: String) = when (value[k]) { "0" -> false; "1" -> true; else -> null }
    val mode = value["mode"]?.takeIf { it == "normal" || it == "calibration" } ?: return null
    val lastSeq = value["lastseq"]?.takeIf { Regex("^\\d{1,5}$").matches(it) }?.toInt()?.takeIf { it < SEQ_MODULUS } ?: return null
    return CalibrationStatus(
        normal = mode == "normal",
        configured = flag("configured") ?: return null,
        referenced = flag("referenced") ?: return null,
        lastSeq = if (flag("haveseq") ?: return null) lastSeq else null,
        fault = value["fault"]!!,
    )
}
