import { describe, expect, it } from "vitest";
import {
  crc8,
  encodeCameraCommand,
  encodeCameraStatus,
  encodeJoints,
  encodeStatus,
  isJointsMsg,
  isPanMsg,
  nextSeq,
  parseCameraCommand,
  parseCameraStatus,
  parseJoints,
  parseStatus,
  seqIsNewer,
  SEQ_MODULUS,
  type JointDeg,
} from "../src";

describe("crc8", () => {
  it("matches the CRC-8/SMBUS check vector", () => {
    expect(crc8("123456789")).toBe(0xf4);
    expect(crc8(new TextEncoder().encode("123456789"))).toBe(0xf4);
  });

  it("is 0 for empty input", () => {
    expect(crc8("")).toBe(0);
  });
});

describe("joint command lines", () => {
  const deg: JointDeg = [10, -20.5, 0, 45, -45];

  it("encodes the documented format", () => {
    // This exact line is also asserted in firmware/arm-controller/test/test_protocol.
    expect(encodeJoints(42, deg)).toBe("J,42,10.0,-20.5,0.0,45.0,-45.0*F6\n");
  });

  it("round-trips encode → parse", () => {
    expect(parseJoints(encodeJoints(42, deg))).toEqual({ seq: 42, deg });
  });

  it("rounds to 1 decimal and never emits -0.0", () => {
    const line = encodeJoints(1, [1.26, -0.04, 0, 0, 0]);
    expect(line).toContain(",1.3,0.0,");
    expect(parseJoints(line)?.deg).toEqual([1.3, 0, 0, 0, 0]);
  });

  it("rejects a bad CRC", () => {
    const line = encodeJoints(7, deg);
    const corrupted = line.replace("10.0", "11.0");
    expect(parseJoints(corrupted)).toBeNull();
    const badCrc = line.replace(/\*[0-9A-F]{2}/, "*00");
    expect(parseJoints(badCrc)).toBeNull();
  });

  it("rejects malformed lines", () => {
    expect(parseJoints("")).toBeNull();
    expect(parseJoints("J,1,2,3*00\n")).toBeNull();
    expect(parseJoints("garbage")).toBeNull();
  });

  it("refuses to encode invalid input", () => {
    expect(() => encodeJoints(-1, deg)).toThrow();
    expect(() => encodeJoints(SEQ_MODULUS, deg)).toThrow();
    expect(() => encodeJoints(1, [1, 2, 3])).toThrow();
    expect(() => encodeJoints(1, [NaN, 0, 0, 0, 0])).toThrow();
  });
});

describe("status lines", () => {
  it("round-trips encode → parse", () => {
    const status = { seq: 65535, state: "ACTIVE", deg: [1, 2, 3, 4, 5] } as const;
    const parsed = parseStatus(encodeStatus({ ...status, deg: [...status.deg] }));
    expect(parsed).toEqual({ t: "status", ...status, deg: [1, 2, 3, 4, 5] });
  });

  it("accepts CRLF endings", () => {
    const line = encodeStatus({ seq: 3, state: "IDLE", deg: [0, 0, 0, 0, 0] }).replace("\n", "\r\n");
    expect(parseStatus(line)?.state).toBe("IDLE");
  });

  it("rejects an unknown state and a bad CRC", () => {
    const line = encodeStatus({ seq: 3, state: "IDLE", deg: [0, 0, 0, 0, 0] });
    expect(parseStatus(line.replace(/\*[0-9A-F]{2}/, "*FF"))).toBeNull();
    expect(parseStatus("S,3,BOGUS,0.0,0.0,0.0,0.0,0.0*" + crc8(",3,BOGUS,0.0,0.0,0.0,0.0,0.0").toString(16) + "\n")).toBeNull();
  });
});

describe("camera camera-servo lines", () => {
  it("round-trips the independent 0–180° command and status", () => {
    // Shared vectors: keep in sync with apps/robot-android/.../protocol/SerialTest.kt.
    expect(encodeCameraCommand(7, 90.5)).toBe("P,7,90.5*AB\n");
    expect(encodeCameraStatus({ seq: 7, deg: 90.5, active: true })).toBe("V,7,90.5,1*4A\n");
    expect(parseCameraCommand(encodeCameraCommand(9, 0))).toEqual({ seq: 9, deg: 0 });
    expect(parseCameraCommand(encodeCameraCommand(9, 180))).toEqual({ seq: 9, deg: 180 });
    const status = { seq: 9, deg: 123.4, active: true } as const;
    expect(parseCameraStatus(encodeCameraStatus(status))).toEqual(status);
    expect(parseCameraStatus(encodeCameraStatus({ seq: 2, deg: 90, active: false }))).toEqual({ seq: 2, deg: 90, active: false });
  });

  it("rejects out-of-range, malformed and corrupted camera lines", () => {
    expect(() => encodeCameraCommand(1, -1)).toThrow();
    expect(() => encodeCameraCommand(1, 181)).toThrow();
    expect(() => encodeCameraCommand(1, NaN)).toThrow();
    const line = encodeCameraCommand(1, 90);
    expect(parseCameraCommand(line.replace("90.0", "181.0"))).toBeNull();
    expect(parseCameraCommand(line.replace(/\*[0-9A-F]{2}/, "*00"))).toBeNull();
    expect(parseCameraStatus("V,1,90.0,2*" + crc8(",1,90.0,2").toString(16) + "\n")).toBeNull();
    expect(parseCameraStatus("P,1,90.0,1*00\n")).toBeNull();
  });
});

describe("sequence numbers", () => {
  it("wraps at SEQ_MODULUS", () => {
    expect(nextSeq(SEQ_MODULUS - 1)).toBe(0);
    expect(seqIsNewer(0, SEQ_MODULUS - 1)).toBe(true);
    expect(seqIsNewer(5, SEQ_MODULUS - 3)).toBe(true);
  });

  it("treats equal and older as not newer", () => {
    expect(seqIsNewer(10, 10)).toBe(false);
    expect(seqIsNewer(9, 10)).toBe(false);
    expect(seqIsNewer(SEQ_MODULUS - 1, 0)).toBe(false);
    expect(seqIsNewer(11, 10)).toBe(true);
  });
});

describe("message guards", () => {
  it("validates joints messages", () => {
    expect(isJointsMsg({ t: "joints", seq: 1, deg: [0, 0, 0, 0, 0], engaged: true })).toBe(true);
    expect(isJointsMsg({ t: "joints", seq: 1, deg: [0, 0, 0, 0], engaged: true })).toBe(false);
    expect(isJointsMsg({ t: "joints", seq: 1, deg: [0, 0, 0, 0, null], engaged: true })).toBe(false);
    expect(isJointsMsg({ t: "joints", seq: 1, deg: [0, 0, 0, 0, 0] })).toBe(false);
  });

  it("validates pan messages against the camera servo range", () => {
    expect(isPanMsg({ t: "pan", seq: 3, deg: 90 })).toBe(true);
    expect(isPanMsg({ t: "pan", seq: 3, deg: 180.5 })).toBe(false);
    expect(isPanMsg({ t: "pan", seq: 3, deg: -1 })).toBe(false);
    expect(isPanMsg({ t: "pan", seq: -1, deg: 90 })).toBe(false);
  });
});
