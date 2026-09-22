import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/logo-shapes";

export const alt =
  "Agents that spend · An interactive framework for AI agent permission, evidence, and revocation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#e6e5fd",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 430,
            height: 430,
            borderRadius: 999,
            right: -80,
            bottom: -170,
            background: "#cdece8",
            opacity: 0.82,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 24,
              fontWeight: 700,
              color: "#6a6cf2",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            <img
              src={logoDataUri("#ee6a3a", 42)}
              alt=""
              width={42}
              height={42}
            />
            Mubien · Flagship research
          </div>

          <div
            style={{
              marginTop: 40,
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: "#241a10",
              maxWidth: 1000,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Agents that spend
          </div>

          <div
            style={{
              marginTop: 24,
              fontSize: 31,
              lineHeight: 1.35,
              color: "#4f463a",
              maxWidth: 980,
              display: "flex",
            }}
          >
            When an AI agent buys something, how does permission survive from a
            human request to money moving?
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {[
              "6 controls",
              "Interactive test",
              "Primary sources",
            ].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  border: "1px solid #b9b8ef",
                  borderRadius: 999,
                  background: "rgba(255,253,247,0.82)",
                  padding: "10px 18px",
                  fontSize: 21,
                  color: "#4f50c9",
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              color: "#241a10",
            }}
          >
            mubienahsan.com/agents
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 12,
            display: "flex",
          }}
        >
          <div style={{ flex: 1, background: "#f2603f" }} />
          <div style={{ flex: 1, background: "#6a6cf2" }} />
          <div style={{ flex: 1, background: "#10a396" }} />
        </div>
      </div>
    ),
    size
  );
}
