import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "br-patient-hat-b42s35bq.storage.c-6.us-east-2.aws.neon.tech",
        pathname: "/avatars/**"
      },
      {
        protocol: "https",
        hostname: "br-patient-hat-b42s35bq.storage.c-6.us-east-2.aws.neon.tech",
        pathname: "/project-background/**"
      },
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
}

export default nextConfig;
