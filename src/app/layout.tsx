import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estudando o Pickleball - Domine o Pickleball",
  description: "Domine o Pickleball com conhecimento. Guias completos para iniciantes, intermediários e avançados.",
  manifest: "/dicas-e-temas-do-esporte/manifest.json",
  themeColor: "#0ea5e9",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Estudando o Pickleball",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://ffzzi.github.io/dicas-e-temas-do-esporte",
    siteName: "Estudando o Pickleball",
    title: "Estudando o Pickleball - Domine o Pickleball",
    description: "Domine o Pickleball com conhecimento. Guias completos para iniciantes, intermediários e avançados.",
    images: [
      {
        url: "https://ffzzi.github.io/dicas-e-temas-do-esporte/logo.png",
        width: 512,
        height: 512,
        alt: "Estudando o Pickleball Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Estudando o Pickleball - Domine o Pickleball",
    description: "Domine o Pickleball com conhecimento. Guias completos para iniciantes, intermediários e avançados.",
    images: ["https://ffzzi.github.io/dicas-e-temas-do-esporte/logo.png"],
  },
  metadataBase: new URL("https://ffzzi.github.io/dicas-e-temas-do-esporte"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          
          {/* Conteúdo principal */}
          <div className="max-w-6xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
            {children}
            
            {/* Footer padronizado */}
            <footer className="mt-20 py-10 text-center border-t border-gray-200/50">
              <p className="text-sm text-gray-500">
                Desenvolvido por Fabrício Ziliotti @2025
              </p>
            </footer>
          </div>
          
          {/* PWA Service Worker Registration */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/dicas-e-temas-do-esporte/sw.js')
                      .then(function(registration) {
                        // Service worker registered
                      })
                      .catch(function(registrationError) {
                        // Service worker registration failed
                      });
                  });
                }
              `,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
