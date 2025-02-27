import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    dangerouslyAllowSVG: true,
    remotePatterns : [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  experimental : {
    serverActions : {
      bodySizeLimit : "50mb"
    },
  },
  
};

export default nextConfig;
