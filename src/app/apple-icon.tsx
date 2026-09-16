import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/logo-shapes";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Home-screen icon. iOS rounds and crops the corners itself, so the mark is
 * inset well clear of them and the background is filled edge to edge.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9f1e4",
        }}
      >
        <img src={logoDataUri("#ee6a3a", 116)} alt="" width={116} height={116} />
      </div>
    ),
    size
  );
}
