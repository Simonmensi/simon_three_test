/* ------------------------------------------------------------------ */
/*  IFC Viewer — Renderer color management                            */
/* ------------------------------------------------------------------ */

import * as THREE from "three";
import type * as OBC from "@thatopen/components";

/**
 * Configure renderer color output.
 *
 * THREE.js r175 already defaults to `SRGBColorSpace` output and
 * `NoToneMapping`. We set them explicitly for clarity and to guard
 * against future default changes.
 *
 * Note: ACES / cinematic tone mapping should NOT be used here —
 * the fragment library creates `MeshLambertMaterial` with sRGB
 * colors that are designed to go straight through the linear
 * pipeline without an additional tone-mapping pass. ACES in
 * particular desaturates greens (vegetation) and compresses
 * mid-tones in a way that makes BIM colors look washed-out.
 */
export function setupRenderer(renderer: OBC.SimpleRenderer): void {
  const gl = renderer.three;

  gl.outputColorSpace = THREE.SRGBColorSpace;
  gl.toneMapping = THREE.NoToneMapping;

  console.debug("[IFC] renderer: SRGBColorSpace + NoToneMapping");
}
