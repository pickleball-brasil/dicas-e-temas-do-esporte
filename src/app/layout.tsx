import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Providers from "./providers";

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
          <div className="max-w-4xl mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
            <header className="mb-10">
              <div className="flex items-center justify-between py-4">
                <Link href="/" className="group flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                    <span className="text-xl">🏓</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-gray-900 tracking-tight">Ziliotti Picklebook</span>
                    <span className="text-xs text-gray-500">Material de estudo para o Pickleball</span>
                  </div>
                </Link>
                <nav className="flex items-center gap-2">
                  <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-sky-600 transition-colors duration-200 rounded-lg hover:bg-white/50">
                    Início
                  </Link>
                  <Link href="/admin" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-sky-600 transition-colors duration-200 rounded-lg hover:bg-white/50">
                    Admin
                  </Link>
                </nav>
              </div>
            </header>
            {children}
            <footer className="mt-16 py-8 text-center text-xs text-gray-500 border-t border-gray-200/50">
              <p>Feito por Fabrício Ziliotti</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
