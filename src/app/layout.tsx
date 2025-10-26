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
  title: "PickleMaster - Domine o Pickleball",
  description: "Domine o Pickleball com conhecimento. Guias completos para iniciantes, intermediários e avançados.",
  manifest: "/dicas-e-temas-do-esporte/manifest.json",
  themeColor: "#0ea5e9",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PickleMaster",
  },
  openGraph: {
    title: "PickleMaster - Domine o Pickleball",
    description: "Domine o Pickleball com conhecimento",
    type: "website",
    locale: "pt_BR",
  },
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
                        console.log('SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
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
