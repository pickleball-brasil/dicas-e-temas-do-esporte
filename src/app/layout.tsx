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
          <div className="max-w-6xl mx-auto w-full px-2 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
          
          {/* Footer padronizado - largura total */}
          <footer className="mt-20 w-full bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-600">
                    Desenvolvido por <span className="font-medium text-gray-800">Fabrício Ziliotti</span> © 2025
                  </p>
                </div>
                <a 
                  href="https://pickleball-brasil.github.io/fabricio-ziliotti/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center gap-1.5"
                >
                  <span>Conheça o autor deste projeto</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </footer>
          
          {/* PWA Service Worker Registration - next-pwa faz isso automaticamente em produção */}
        </Providers>
      </body>
    </html>
  );
}
