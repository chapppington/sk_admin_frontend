import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.regru.cloud",
      },
      {
        protocol: "https",
        hostname: "sibkomplekt.ru",
      },
    ],
  },
}

export default nextConfig
