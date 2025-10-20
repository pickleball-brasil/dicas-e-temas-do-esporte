import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/dicas-e-temas-do-esporte",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

export default withPWA(nextConfig);
