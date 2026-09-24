import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let .md / .mdx files act as pages and routes
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // The paid ZIP is committed only as ciphertext. Include it in the download
  // function bundle so the server can decrypt it after a signed-link check.
  outputFileTracingIncludes: {
    "/api/execution-kit/download": ["./private-assets/execution-kit-v1.enc"],
  },

  // Send any www visitor to the bare apex, the one canonical home. This keeps a
  // single clean address and avoids routing through any URL forwarder.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mubienahsan.com" }],
        destination: "https://mubienahsan.com/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: "base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    // String form is required for Turbopack (default in Next 16)
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
