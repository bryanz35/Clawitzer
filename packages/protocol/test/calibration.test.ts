import { describe, expect, it } from "vitest";
import {
  calibrationReplyMatches, crc8, encodeCalibration, encodeCalibrationReply, nextSeq, parseCalibration,
  parseCalibrationReply, seqIsNewer, type CalibrationCommand,
} from "../src";

function wire(letter: string, body: string): string {
  const payload = `,${body}`;
  return `${letter}${payload}*${crc8(payload).toString(16).padStart(2, "0")}\n`;
}

describe("independent calibration request frames", () => {
  it("uses CRC over the comma-prefixed payload, not C, star or newline", () => {
    const frame = encodeCalibration(65535, { verb: "step", microsteps: -64 });
    const payload = ",65535,step,-64";
    expect(frame).toBe(`C${payload}*${crc8(payload).toString(16).toUpperCase().padStart(2, "0")}\n`);
    expect(parseCalibration(wire("C", "65535,step,-64"))).toEqual({ seq: 65535, command: { verb: "step", microsteps: -64 } });
    expect(nextSeq(65535)).toBe(0);
    expect(seqIsNewer(0, 65535)).toBe(true);
  });

  it("accepts uncapped relative jogs within the signed counter representation", () => {
    for (const microsteps of [-2147483648, -3200, 3200, 2147483647]) {
      const command: CalibrationCommand = { verb: "step", microsteps };
      expect(parseCalibration(encodeCalibration(7, command))).toEqual({ seq: 7, command });
    }
  });

  it("encodes simultaneous multi-servo poses atomically", () => {
    const command: CalibrationCommand = { verb: "pose", values: [[1, 1600], [2, 1400]] };
    expect(parseCalibration(wire("C", "0,pose,1,1600,2,1400"))).toEqual({ seq: 0, command });
    const payload = ",0,pose,1,1600,2,1400";
    expect(encodeCalibration(0, command)).toBe(`C${payload}*${crc8(payload).toString(16).toUpperCase().padStart(2, "0")}\n`);
    for (const body of ["0,pose", "0,pose,1", "0,pose,1,1600,1,1500", "0,pose,4,1600", "0,pose,1,1600.5", "0,pose,1,1500,2,1500,3,1500,4,1500,0,1500"]) {
      expect(parseCalibration(wire("C", body)), body).toBeNull();
    }
  });

  it("rejects invalid sequences, unsupported verbs, extra arguments and unsafe raw jog grammar", () => {
    for (const seq of [-1, 65536, 1.5, NaN]) expect(() => encodeCalibration(seq, { verb: "status" })).toThrow();
    for (const body of ["65536,status", "-1,status", "1.0,status", "1,status,extra", "1,sweep", "1,keep,1", "1,jog,4,5", "1,jog,1,2001", "1,jog,1,0", "1,jog,1,1.5", "1,step,2147483648", "1,step,-2147483649", "1,step,0", "1,step,1.5", "1,get,pulse", "1,get,base,0", "1,arm,all", "1,enter,yes", "1,reference,yes", "1,set,base,1", "1,set,base,NaN,2", "1,set,address,Infinity"]) {
      expect(parseCalibration(wire("C", body)), body).toBeNull();
    }
    expect(parseCalibration(wire("C", "1,jog,1,2000"))?.command).toEqual({ verb: "jog", index: 1, deltaUs: 2000 });
    expect(parseCalibration(wire("C", "0,enter,UNLOADED_ESTOP_READY"))?.command.verb).toBe("enter");
    expect(parseCalibration(wire("C", "0,reference,HOME_MARK_CONFIRMED"))?.command.verb).toBe("reference");
  });

  it("rejects non-ASCII/token injection, CRC damage and oversized frames", () => {
    const valid = wire("C", "42,set,base,1500,-10");
    expect(parseCalibration(valid.replace("1500", "1501"))).toBeNull();
    expect(parseCalibration(wire("C", "42,set,base,1500, 10"))).toBeNull();
    expect(parseCalibration("C,0,status*00\nextra")).toBeNull();
    expect(parseCalibration(wire("C", `0,${"a".repeat(190)}`))).toBeNull();
    expect(parseCalibration("C,0,státus*00\n")).toBeNull();
    const huge = { verb: "set", key: "stepper", values: Array(7).fill(-Number.MAX_VALUE) } as CalibrationCommand;
    expect(() => encodeCalibration(0, huge)).toThrow(/192/);
  });

  it("accepts finite signed/exponent measurements without weakening numeric tokens", () => {
    expect(parseCalibration(wire("C", "10,set,base,1.5e3,-2.5"))).toEqual({ seq: 10, command: { verb: "set", key: "base", values: [1500, -2.5] } });
    expect(parseCalibration(wire("C", "10,set,base,0x10,2"))).toBeNull();
    expect(parseCalibration(wire("C", "10,set,base,1e999,2"))).toBeNull();
  });

  it("keeps code-owned pins, e-stop and hard pulse windows readable but never writable", () => {
    for (const [key, values] of [
      ["pins", [13, 14, 32, 33, 18, 19, 23, 17, 16, 25, 34, 26, 27, 35]],
      ["estop", [0]],
      ["pulse", [1, 500, 2500, 1500]],
    ] as const) {
      expect(parseCalibration(wire("C", `1,set,${key},${values.join(",")}`))).toBeNull();
      const invalid = { verb: "set", key, values } as unknown as CalibrationCommand;
      expect(() => encodeCalibration(1, invalid)).toThrow(/read-only/);
      const get: CalibrationCommand = key === "pulse" ? { verb: "get", key, index: 1 } : { verb: "get", key };
      expect(parseCalibration(encodeCalibration(1, get))?.command).toEqual(get);
      expect(parseCalibrationReply(wire("K", `1,OK,${key},${values.join(",")}`))).toEqual({
        seq: 1, ok: true, kind: "get", key, values,
      });
    }
    for (const command of [
      { verb: "set", key: "base", values: [1500, 10] },
      { verb: "set", key: "wrist", values: [1500, 10, -10, 1500, 10, 10] },
      { verb: "set", key: "gripper", values: [1500, 10] },
      { verb: "set", key: "stepper", values: [200, 16, 21, 1, -1, 500, 0.11] },
      { verb: "set", key: "following", values: [5] },
      { verb: "set", key: "address", values: [0] },
    ] satisfies CalibrationCommand[]) {
      expect(parseCalibration(encodeCalibration(1, command))?.command).toEqual(command);
    }
  });
});

describe("strict calibration replies on a mixed USB stream", () => {
  const status = "0,OK,mode,calibration,configured,1,referenced,0,lastseq,65535,haveseq,1,fault,none,lastjointseq,24";
  it("parses exact status fields and keeps last calibration/joint sequences distinct", () => {
    expect(parseCalibrationReply(wire("K", status))).toEqual({ seq: 0, ok: true, kind: "status", mode: "calibration", configured: true, referenced: false, lastseq: 65535, haveseq: true, fault: "none", lastjointseq: 24 });
    for (const body of [status.replace("configured,1", "configured,2"), status.replace("mode,calibration", "mode,unknown"), status.replace("lastseq,65535", "lastseq,65536"), status.replace("haveseq", "haveSeq"), `${status},extra`]) expect(parseCalibrationReply(wire("K", body))).toBeNull();
    expect(parseCalibrationReply("# debug")).toBeNull();
    expect(parseCalibrationReply(wire("S", "0,IDLE,0,0,0,0,0"))).toBeNull();
  });

  it("encodes canonical K field order and refuses invalid reply schemas", () => {
    expect(encodeCalibrationReply({ seq: 7, ok: true, kind: "target", target: -64 }).toLowerCase()).toBe(wire("K", "7,OK,target,-64").toLowerCase());
    expect(() => encodeCalibrationReply({ seq: 1, ok: true, kind: "get", key: "pulse", values: [0, 1500] })).toThrow();
    expect(() => encodeCalibrationReply({ seq: 1, ok: false, fields: ["bad", "extra"] })).toThrow();
    expect(() => encodeCalibrationReply({ seq: 65536, ok: true, kind: "ack" })).toThrow();
  });

  it("distinguishes get pulse bounds from a jog ACK and matches servo indices", () => {
    const bounds = parseCalibrationReply(wire("K", "9,OK,pulse,2,1000,2000,1499.5"));
    const jog = parseCalibrationReply(wire("K", "9,OK,pulse,2,1505"));
    expect(bounds).toEqual({ seq: 9, ok: true, kind: "get", key: "pulse", values: [2, 1000, 2000, 1499.5] });
    expect(jog).toEqual({ seq: 9, ok: true, kind: "pulse", index: 2, pulseUs: 1505 });
    expect(calibrationReplyMatches({ verb: "get", key: "pulse", index: 2 }, bounds!)).toBe(true);
    expect(calibrationReplyMatches({ verb: "get", key: "pulse", index: 1 }, bounds!)).toBe(false);
    expect(calibrationReplyMatches({ verb: "jog", index: 2, deltaUs: 5 }, bounds!)).toBe(false);
    expect(calibrationReplyMatches({ verb: "jog", index: 1, deltaUs: 5 }, jog!)).toBe(false);
  });

  it("parses unwrapped signed encoder/counter samples and rejects lossy integers", () => {
    const sample = "15,OK,raw,16383,counts,-16385,steps,-64,pulse0,1500,pulse1,1495,pulse2,1505,pulse3,1000";
    expect(parseCalibrationReply(wire("K", sample))).toEqual({ seq: 15, ok: true, kind: "sample", raw: 16383, counts: -16385, steps: -64, pulses: [1500, 1495, 1505, 1000] });
    for (const body of [sample.replace("raw,16383", "raw,16384"), sample.replace("counts,-16385", "counts,9007199254740992"), sample.replace("steps,-64", "steps,1.5"), sample.replace("pulse2", "pulseX")]) expect(parseCalibrationReply(wire("K", body))).toBeNull();
  });

  it("round-trips servo-only samples with all encoder fields unavailable, never invented zeros", () => {
    const body = "15,OK,raw,NA,counts,NA,steps,NA,pulse0,1500,pulse1,1495,pulse2,1505,pulse3,0";
    const sample = {
      seq: 15, ok: true, kind: "sample", raw: null, counts: null, steps: null,
      pulses: [1500, 1495, 1505, 0],
    } as const;
    expect(parseCalibrationReply(wire("K", body))).toEqual(sample);
    expect(encodeCalibrationReply({ ...sample, pulses: [...sample.pulses] }).toLowerCase()).toBe(wire("K", body).toLowerCase());
    for (const fields of [
      ["NA", "0", "0"], ["0", "NA", "0"], ["0", "0", "NA"],
      ["NA", "NA", "0"], ["NA", "0", "NA"], ["0", "NA", "NA"],
    ]) {
      const mixed = body.replace("raw,NA,counts,NA,steps,NA", `raw,${fields[0]},counts,${fields[1]},steps,${fields[2]}`);
      expect(parseCalibrationReply(wire("K", mixed)), mixed).toBeNull();
    }
    for (const malformed of [
      body.replace("raw,NA", "raw,na"), body.replace("counts,NA", "counts,null"),
      body.replace("pulse1,1495", "pulse1,NA"), body.replace("pulse1,1495", "pulse1,1.5"),
      body.replace("pulse1,1495", "pulse1,-1"), `${body},extra`,
      body.replace("raw,NA,counts,NA", "counts,NA,raw,NA"),
    ]) expect(parseCalibrationReply(wire("K", malformed))).toBeNull();
    expect(() => encodeCalibrationReply({ ...sample, counts: 0, pulses: [...sample.pulses] })).toThrow();
  });

  it("requires known positive shapes, exact arities and one stable ERR token", () => {
    for (const body of ["1,OK,unknown", "1,OK,base,1500", "1,OK,base,1500,10,extra", "1,OK,target,1.2", "1,OK,target,2147483648", "1,ERR", "1,ERR,bad,extra", "1,MAYBE"]) expect(parseCalibrationReply(wire("K", body))).toBeNull();
    expect(parseCalibrationReply(wire("K", "1,ERR,step_busy"))).toEqual({ seq: 1, ok: false, fields: ["step_busy"] });
    const ack = parseCalibrationReply(wire("K", "1,OK"));
    expect(calibrationReplyMatches({ verb: "apply" }, ack!)).toBe(true);
    expect(calibrationReplyMatches({ verb: "status" }, ack!)).toBe(false);
    expect(calibrationReplyMatches({ verb: "step", microsteps: 1 }, ack!)).toBe(false);
    expect(parseCalibrationReply(wire("K", "1,OK,target,-64"))).toEqual({ seq: 1, ok: true, kind: "target", target: -64 });
  });
});
