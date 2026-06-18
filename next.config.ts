import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a self-contained server in .next/standalone for small Docker images
  output: "standalone",
};

export default nextConfig;
