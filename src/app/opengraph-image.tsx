import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/logo-shapes";

export const alt = "Mubien Ahsan · Learning and building with AI, in public";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card people see when the site is shared. Uses the site's warm cream and
 * orange rather than a screenshot, so it stays right as pages change.
 */
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
          background: "#f9f1e4",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              color: "#6f6350",
              letterSpacing: 2,
            }}
          >
            <img
              src={logoDataUri("#ee6a3a", 44)}
              alt=""
              width={44}
              height={44}
            />
            MUBIENAHSAN.COM
          </div>

          <div
            style={{
              marginTop: 40,
              fontSize: 82,
              lineHeight: 1.05,
              color: "#241a10",
              letterSpacing: -1,
              maxWidth: 980,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Learning &amp; building with AI, in public.
          </div>

          <div
            style={{
              marginTop: 32,
              fontSize: 34,
              lineHeight: 1.4,
              color: "#6f6350",
              maxWidth: 900,
              display: "flex",
            }}
          >
            Free guides that start from zero, real apps, and honest notes on what
            is worth learning.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#241a10",
              fontWeight: 600,
            }}
          >
            Mubien Ahsan
          </div>
          <div
            style={{
              display: "flex",
              height: 8,
              width: 8,
              borderRadius: 999,
              background: "#d8c9ad",
            }}
          />
          <div style={{ display: "flex", fontSize: 30, color: "#6f6350" }}>
            A calm take on a noisy field
          </div>
        </div>

        {/* Warm accent bar, echoing the footer */}
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
