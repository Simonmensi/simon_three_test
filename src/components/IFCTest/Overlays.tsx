"use client";

/* ------------------------------------------------------------------ */
/*  IFC Viewer — Loading & error overlay components                   */
/* ------------------------------------------------------------------ */

export function LoadingOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(10,10,10,0.85)",
        zIndex: 20,
        gap: "1rem",
      }}
    >
      {/* CSS spinner */}
      <div
        style={{
          width: 40,
          height: 40,
          border: "3px solid rgba(255,255,255,0.15)",
          borderTopColor: "#fff",
          borderRadius: "50%",
          animation: "ifc-spin 0.8s linear infinite",
        }}
      />
      <p style={{ color: "#d4d4d4", fontSize: 14, margin: 0 }}>
        Loading BIM fragment...
      </p>
      <p style={{ color: "#737373", fontSize: 12, margin: 0 }}>
        Fetching worker and model data
      </p>

      {/* Inline keyframes -- only injected once */}
      <style>{`@keyframes ifc-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export function ErrorOverlay({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(10,10,10,0.9)",
        zIndex: 20,
        gap: "0.75rem",
        padding: "2rem",
      }}
    >
      <p style={{ color: "#f87171", fontSize: 14, margin: 0 }}>
        Failed to load fragment
      </p>
      <p
        style={{
          color: "#a3a3a3",
          fontSize: 12,
          margin: 0,
          maxWidth: 400,
          textAlign: "center",
          wordBreak: "break-word",
        }}
      >
        {message}
      </p>
      <button
        onClick={onRetry}
        style={{
          marginTop: 8,
          padding: "6px 20px",
          fontSize: 13,
          color: "#fff",
          backgroundColor: "#262626",
          border: "1px solid #404040",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Retry
      </button>
    </div>
  );
}
