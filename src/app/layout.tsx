import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import MobileLayoutSelector from "@/components/MobileLayoutSelector";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import InstallPrompt from "@/components/InstallPrompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pickleball Estudos - Domine o Pickleball",
  description: "Domine o Pickleball com conhecimento. Guias completos para iniciantes, intermediários e avançados.",
  manifest: "/dicas-e-temas-do-esporte/manifest.json",
  themeColor: "#0ea5e9",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: [
      { url: "/dicas-e-temas-do-esporte/favicon.png", type: "image/png" },
    ],
    apple: "/dicas-e-temas-do-esporte/favicon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pickleball Estudos",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Pickleball Estudos",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "",
    siteName: "Pickleball Estudos",
    title: "Pickleball Estudos - Domine o Pickleball",
    description: "Domine o Pickleball com conhecimento. Guias completos para iniciantes, intermediários e avançados.",
    images: [
      {
        url: "/dicas-e-temas-do-esporte/logo.png",
        width: 512,
        height: 512,
        alt: "Pickleball Estudos Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Pickleball Estudos - Domine o Pickleball",
    description: "Domine o Pickleball com conhecimento. Guias completos para iniciantes, intermediários e avançados.",
    images: ["/dicas-e-temas-do-esporte/logo.png"],
  },
  metadataBase: new URL("https://pickleball-brasil.github.io/dicas-e-temas-do-esporte"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <Providers>
          <Header />
          <ReadingProgressBar />
          <MobileLayoutSelector />
          <InstallPrompt />
          
          {/* Conteúdo principal */}
          <div className="max-w-6xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
            {children}
            
            {/* Footer padronizado */}
            <footer className="mt-20 py-10 text-center bg-gradient-to-r from-sky-50 to-purple-50 border-t border-gray-200/50 rounded-t-2xl">
              <p className="text-sm text-gray-500 mb-2">
                Desenvolvido por Fabrício Ziliotti @2025
              </p>
              <a 
                href="https://pickleball-brasil.github.io/fabricio-ziliotti/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <span>Conheça o autor deste projeto</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </footer>
          </div>
          
          {/* PWA Service Worker Registration - next-pwa faz isso automaticamente em produção */}
        </Providers>
      </body>
    </html>
  );
}
