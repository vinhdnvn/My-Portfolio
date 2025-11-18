import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    globalNotFound: true,
  },
  images:{
     domains: [
      "hoirqrkdgbmvpwutwuwj.supabase.co",
      "images.unsplash.com"
    ],
  }
};

export default nextConfig;
