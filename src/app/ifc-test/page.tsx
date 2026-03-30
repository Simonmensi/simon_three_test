import Link from "next/link";
import { IFCScene } from "@/components/IFCTest/IFCScene";

export default function IfcTestPage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-neutral-950">
      {/* Floating header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-4">
        <div className="pointer-events-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            IFC Fragment Viewer
          </p>
          <h1 className="text-lg font-semibold tracking-tight text-neutral-100">
            @thatopen/components demo
          </h1>
        </div>
        <Link
          href="/"
          className="pointer-events-auto rounded-full border border-neutral-800 bg-neutral-950/60 px-4 py-2 text-sm text-neutral-300 backdrop-blur transition hover:border-neutral-600 hover:text-white"
        >
          Back home
        </Link>
      </div>

      {/* Full-viewport 3D viewer */}
      <IFCScene />
    </main>
  );
}
