import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  output: "export",
  // basePath: "/dicas-e-temas-do-esporte", // Comentado para i18n
  images: {
    unoptimized: true,
  },
};

export default withPWA(nextConfig);
