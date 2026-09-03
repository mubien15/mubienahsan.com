import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let .md / .mdx files act as pages and routes
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

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
};

const withMDX = createMDX({
  options: {
    // String form is required for Turbopack (default in Next 16)
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
