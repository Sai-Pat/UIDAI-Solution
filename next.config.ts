import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Ensure we don't try to use server-side features that break export
  trailingSlash: true,
};

export default nextConfig;
