"use client";
import Link from "next/link";
// import LanguageSelector from "./LanguageSelector";
import { useLanguageContext } from '@/contexts/LanguageContext';

export default function Header() {
  const { t } = useLanguageContext();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200/50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo e branding */}
          <Link href="/" className="group flex items-center gap-3 hover:opacity-90 transition-opacity duration-200">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-purple-600 rounded-2xl blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-purple-600 text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                <span className="text-2xl">🏓</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-xl text-gray-900 tracking-tight bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                {t('header.title')}
              </span>
              <span className="text-xs text-gray-600 font-medium">{t('header.subtitle')}</span>
            </div>
          </Link>

          {/* Controles */}
          <div className="flex items-center gap-3">
            {/* <LanguageSelector /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

