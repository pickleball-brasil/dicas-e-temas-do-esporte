"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import LanguageSelector from "./LanguageSelector";
import { useLanguageContext } from '@/contexts/LanguageContext';

export default function Header() {
  const { t } = useLanguageContext();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-gray-200/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo e branding */}
          <div className="flex items-center gap-4">
            {/* Botão de voltar (apenas fora da página principal) */}
            {!isHomePage && (
              <Link
                href="/"
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors text-gray-600 border border-gray-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Início</span>
              </Link>
            )}
            
            <Link href="/" className="group flex items-center hover:opacity-90 transition-all duration-300">
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-2xl text-gray-900 tracking-tight bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                  {t('header.title')}
                </span>
                <span className="text-xs sm:text-sm text-gray-600 font-medium hidden sm:block">{t('header.subtitle')}</span>
              </div>
            </Link>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Link para Contribua */}
            <Link
              href="/contribua"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">Contribua</span>
            </Link>
            
            {/* Link para o Seletor de Temas */}
            <Link
              href="/selecionar-temas"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <span className="hidden sm:inline">Temas</span>
              <span className="sm:hidden">Temas</span>
            </Link>
            
            {/* <LanguageSelector /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

