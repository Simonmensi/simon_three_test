/* ------------------------------------------------------------------ */
/*  IFC Viewer — BIM-style camera controls                            */
/* ------------------------------------------------------------------ */
/*  OrthoPerspectiveCamera wraps `camera-controls` (yomotsu).         */
/*  We remap mouse/touch for standard CAD navigation:                 */
/*    Left  = orbit   Right = pan   Middle = pan   Wheel = dolly      */
/* ------------------------------------------------------------------ */

import CameraControls from "camera-controls";
import type * as OBC from "@thatopen/components";

export function setupCamera(camera: OBC.OrthoPerspectiveCamera): void {
  const cc = camera.controls;
  const ACTION = CameraControls.ACTION;

  /* ---- Mouse ---- */
  cc.mouseButtons.left = ACTION.ROTATE;
  cc.mouseButtons.right = ACTION.TRUCK;
  cc.mouseButtons.middle = ACTION.TRUCK;
  cc.mouseButtons.wheel = ACTION.DOLLY;

  /* ---- Touch ---- */
  cc.touches.one = ACTION.TOUCH_ROTATE;
  cc.touches.two = ACTION.TOUCH_DOLLY_TRUCK;
  cc.touches.three = ACTION.TOUCH_TRUCK;

  /* ---- Tuning ---- */
  cc.smoothTime = 0.15;
  cc.draggingSmoothTime = 0.1;
  cc.truckSpeed = 2;
  cc.dollySpeed = 1;
  cc.dollyToCursor = true;
  cc.infinityDolly = true;
  cc.restThreshold = 0.01;
  cc.minDistance = 1;

  console.debug("[IFC] camera: BIM-style controls configured", {
    left: "ROTATE",
    right: "TRUCK",
    middle: "TRUCK",
    wheel: "DOLLY",
    smoothTime: cc.smoothTime,
    truckSpeed: cc.truckSpeed,
    minDistance: cc.minDistance,
  });
}
