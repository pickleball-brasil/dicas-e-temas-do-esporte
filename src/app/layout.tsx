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
  title: "Ziliotti Favorites",
  description: "Favoritos de Ziliotti",
  manifest: "/manifest.json",
  themeColor: "#0ea5e9",
  icons: {
    icon: "/favicon.ico",
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
            
            {/* Footer moderno */}
            <footer className="mt-20 py-10 text-center border-t border-gray-200/50">
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-2xl">🏓</span>
                  <span className="font-semibold">Ziliotti Picklebook</span>
                </div>
                <p className="text-sm text-gray-500">
                  Feito com <span className="text-red-500">♥</span> por Fabrício Ziliotti
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                  <span>© 2025</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>Todos os direitos reservados</span>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
