import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/logo-shapes";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Browser tab icon: the mark in the site orange, on the warm cream so it does
 * not sit in a white box against a light tab strip. Generated from the same
 * shape data as the header mark.
 */
export default function Icon() {
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
          borderRadius: 12,
        }}
      >
        <img src={logoDataUri("#ee6a3a", 50)} alt="" width={50} height={50} />
      </div>
    ),
    size
  );
}
