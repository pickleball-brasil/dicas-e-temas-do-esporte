import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // Nota: Para testar PWA localmente, use: npm run test:pwa
});

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/dicas-e-temas-do-esporte",
  images: {
    unoptimized: true,
  },
};

export default withPWA(nextConfig);
