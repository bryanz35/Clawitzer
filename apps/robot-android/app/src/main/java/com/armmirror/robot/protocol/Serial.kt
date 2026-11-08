// Kotlin mirror of packages/protocol (serial.ts, constants.ts). That package stays canonical:
// change it first, then this file, and keep the vectors in SerialTest.kt in sync with
// packages/protocol/test/serial.test.ts.
//
// Line formats (ASCII, '\n' terminated, 115200 baud):
//   command  J,<seq>,<j1>,…,<j5>*<crc8>
//   status   S,<seq>,<state>,<j1>,…,<j5>*<crc8>
//   camera   P,<seq>,<deg>*<crc8>          (pan servo 0–180°, independent of arm joints)
//   camera   V,<seq>,<deg>,<active>*<crc8> (status, active 0/1)
package com.armmirror.robot.protocol

import java.math.BigDecimal
import java.math.RoundingMode

const val NUM_JOINTS = 5
const val SERIAL_BAUD = 115200
const val STATUS_HZ = 10
const val WATCHDOG_MS = 200L
const val SEQ_MODULUS = 0x10000
const val CAMERA_MIN_DEG = 0.0
const val CAMERA_MAX_DEG = 180.0

val ARM_STATES = setOf("HOMING", "IDLE", "ACTIVE", "WATCHDOG", "ESTOP")

/** Parsed `V` line: the last camera seq the MCU accepted and its current pan angle. */
data class CameraStatus(val seq: Int, val deg: Double, val active: Boolean)

/** Parsed `S` line. `seq` is the last command seq the MCU accepted. */
data class Status(val seq: Int, val state: String, val deg: List<Double>)

/** CRC-8, polynomial 0x07, init 0, no reflection, no final XOR. crc8("123456789") == 0xF4. Throws on non-ASCII. */
fun crc8(s: String): Int {
    var crc = 0
    for (ch in s) {
        require(ch.code <= 0x7f) { "non-ASCII character in serial payload: $s" }
        crc = crc xor ch.code
        repeat(8) { crc = if (crc and 0x80 != 0) ((crc shl 1) xor 0x07) and 0xff else (crc shl 1) and 0xff }
    }
    return crc
}

fun nextSeq(seq: Int): Int = (seq + 1) % SEQ_MODULUS

/** uint16 serial-number arithmetic: 0 is newer than 65535; equal or older is false. */
fun seqIsNewer(seq: Int, last: Int): Boolean {
    val diff = ((seq - last) % SEQ_MODULUS + SEQ_MODULUS) % SEQ_MODULUS
    return diff != 0 && diff < SEQ_MODULUS / 2
}

private fun formatDeg(deg: List<Double>): String {
    require(deg.size == NUM_JOINTS && deg.all { it.isFinite() }) { "expected $NUM_JOINTS finite angles, got $deg" }
    // Same digits as JS toFixed(1) (exact binary value, half away from zero); never "-0.0".
    return deg.joinToString(",") { d ->
        if (kotlin.math.abs(d) < 0.05) "0.0" else BigDecimal(d).setScale(1, RoundingMode.HALF_UP).toPlainString()
    }
}

internal fun frame(letter: Char, payload: String) = "$letter$payload*${crc8(payload).toString(16).uppercase().padStart(2, '0')}\n"

/** Encodes a joint command line. Throws on invalid input (a programming error, not line noise). */
fun encodeJoints(seq: Int, deg: List<Double>): String {
    require(seq in 0 until SEQ_MODULUS) { "seq out of range: $seq" }
    return frame('J', ",$seq,${formatDeg(deg)}")
}

/** Encodes a pan-servo `P` line. Throws on out-of-range input (the relay validated it already). */
fun encodeCamera(seq: Int, deg: Double): String {
    require(seq in 0 until SEQ_MODULUS) { "seq out of range: $seq" }
    require(deg.isFinite() && deg in CAMERA_MIN_DEG..CAMERA_MAX_DEG) { "camera angle out of range: $deg" }
    val text = if (kotlin.math.abs(deg) < 0.05) "0.0" else BigDecimal(deg).setScale(1, RoundingMode.HALF_UP).toPlainString()
    return frame('P', ",$seq,$text")
}

/** Encodes a status line. Used by the mock; the real sender is the firmware. */
fun encodeStatus(s: Status): String {
    require(s.seq in 0 until SEQ_MODULUS) { "seq out of range: ${s.seq}" }
    return frame('S', ",${s.seq},${s.state},${formatDeg(s.deg)}")
}

private val HEX2 = Regex("^[0-9A-Fa-f]{2}$")
private val SEQ_FIELD = Regex("^\\d{1,5}$")
private val DEG_FIELD = Regex("^-?\\d+(\\.\\d+)?$")

internal fun unframe(line: String, letter: Char): List<String>? {
    val s = line.removeSuffix("\n").removeSuffix("\r")
    if (!s.startsWith(letter)) return null
    val star = s.lastIndexOf('*')
    if (star < 0 || s.length - star != 3) return null
    val crcText = s.substring(star + 1)
    if (!HEX2.matches(crcText)) return null
    val payload = s.substring(1, star)
    val crc = runCatching { crc8(payload) }.getOrNull() ?: return null
    if (crc != crcText.toInt(16) || !payload.startsWith(",")) return null
    return payload.substring(1).split(",")
}

private fun parseSeqField(s: String): Int? = if (SEQ_FIELD.matches(s)) s.toInt().takeIf { it < SEQ_MODULUS } else null

private fun parseDegFields(f: List<String>): List<Double>? =
    if (f.size == NUM_JOINTS && f.all { DEG_FIELD.matches(it) }) f.map { it.toDouble() } else null

/** Parses a `J` line. Null on bad CRC or a malformed line. */
fun parseJoints(line: String): Pair<Int, List<Double>>? {
    val f = unframe(line, 'J') ?: return null
    if (f.size != 1 + NUM_JOINTS) return null
    val seq = parseSeqField(f[0]) ?: return null
    val deg = parseDegFields(f.drop(1)) ?: return null
    return seq to deg
}

/** Parses an `S` line. Null on bad CRC or a malformed line. */
fun parseStatus(line: String): Status? {
    val f = unframe(line, 'S') ?: return null
    if (f.size != 2 + NUM_JOINTS) return null
    val seq = parseSeqField(f[0]) ?: return null
    val state = f[1].takeIf { it in ARM_STATES } ?: return null
    val deg = parseDegFields(f.drop(2)) ?: return null
    return Status(seq, state, deg)
}

/** Parses a `V` line. Null on bad CRC or a malformed line. */
fun parseCameraStatus(line: String): CameraStatus? {
    val f = unframe(line, 'V') ?: return null
    if (f.size != 3) return null
    val seq = parseSeqField(f[0]) ?: return null
    val deg = f[1].takeIf { DEG_FIELD.matches(it) }?.toDouble()?.takeIf { it in CAMERA_MIN_DEG..CAMERA_MAX_DEG } ?: return null
    val active = when (f[2]) { "0" -> false; "1" -> true; else -> return null }
    return CameraStatus(seq, deg, active)
}
