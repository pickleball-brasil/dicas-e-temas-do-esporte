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
            {/* Seletor de Layout - apenas na página principal */}
            {isHomePage && (
              <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg border border-gray-200">
                <button
                  onClick={() => setLayout("grid")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    layout === "grid"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="Layout em grade"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    layout === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="Layout em lista"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            )}
            
            {/* Link para Vídeos Recomendados */}
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Vídeos</span>
              <span className="sm:hidden">Vídeos</span>
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

