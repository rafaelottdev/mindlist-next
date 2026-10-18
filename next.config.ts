import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "br-patient-hat-b42s35bq.storage.c-6.us-east-2.aws.neon.tech",
        pathname: "/avatars/**"
      }
    ]
  }
}

export default nextConfig;
// 