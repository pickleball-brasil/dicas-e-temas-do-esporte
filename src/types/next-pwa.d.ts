declare module "next-pwa" {
  import type { NextConfig } from "next";
  export interface PWAOptions {
    dest?: string;
    disable?: boolean;
  }
  export default function withPWA(options?: PWAOptions): (config: NextConfig) => NextConfig;
}


