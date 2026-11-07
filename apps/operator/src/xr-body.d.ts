// WebXR body tracking (Meta Quest Browser, `body-tracking` feature) isn't in @types/webxr.
// Minimal shape: XRFrame.body is an ordered map of joint name → XRSpace.
// TODO: confirm joint names on a real Quest 3 (logged once per session by tracking.ts).

interface XRBodySpace extends XRSpace {
  readonly jointName: string;
}

interface XRBody extends ReadonlyMap<string, XRBodySpace> {}

interface XRFrame {
  readonly body?: XRBody | null;
}
