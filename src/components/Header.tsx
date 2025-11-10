"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import LanguageSelector from "./LanguageSelector";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useLayoutContext } from '@/contexts/LayoutContext';

export default function Header() {
  const { t } = useLanguageContext();
  const { layout, setLayout } = useLayoutContext();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="relative z-50 backdrop-blur-xl bg-gradient-to-r from-sky-50 to-purple-50 border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo e branding */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            {/* Botão de voltar (apenas fora da página principal) */}
            {!isHomePage && (
              <Link
                href="/"
                className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 transition-all duration-200 text-white border border-transparent flex-shrink-0 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Início</span>
              </Link>
            )}
            
            <Link href="/" className="group flex items-center hover:opacity-90 transition-all duration-300 min-w-0">
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-base sm:text-xl md:text-2xl text-gray-900 tracking-tight bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent truncate">
                  <span className="sm:hidden">Pickleball</span>
                  <span className="hidden sm:inline">{t('header.title')}</span>
                </span>
                <span className="text-xs sm:text-sm text-gray-600 font-medium hidden sm:block">{t('header.subtitle')}</span>
              </div>
            </Link>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
            {/* Seletor de Layout - apenas na página principal e desktop */}
            {isHomePage && (
              <div className="hidden sm:inline-flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 bg-gradient-to-r from-sky-50 to-purple-50 rounded-lg border border-gray-200/60">
                <button
                  onClick={() => setLayout("grid")}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    layout === "grid"
                      ? "bg-gradient-to-r from-sky-600 to-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                  title="Layout em grade"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    layout === "list"
                      ? "bg-gradient-to-r from-sky-600 to-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                  title="Layout em lista"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* Link para Vídeos Recomendados */}
            <Link
              href="/videos"
              className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 text-white transition-all duration-200 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Vídeos</span>
            </Link>
            
            {/* Link para o Seletor de Temas */}
            <Link
              href="/selecionar-temas"
              className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 text-white transition-all duration-200 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              <span>Temas</span>
            </Link>
            
            {/* Link para Cronograma */}
            <Link
              href="/cronograma"
              className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 text-white transition-all duration-200 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Cronograma</span>
            </Link>
            
            {/* <LanguageSelector /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

