"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SECTIONS, getSectionLevel, type Section, type SectionLevel } from "@/lib/sections";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { SectionContent } from "@/lib/markdown";
import { getDisplayName } from "@/lib/displayNames";
import { hasSectionTips } from "@/lib/tipsData";
import Sidebar from "./Sidebar";

const levelColors: Record<SectionLevel, string> = {
  "Básico": "from-green-500 to-emerald-600",
  "Intermediário": "from-orange-500 to-amber-600",
  "Avançado": "from-red-500 to-rose-600",
  "Táticas": "from-purple-500 to-violet-600",
};

const levelBadgeColors: Record<SectionLevel, string> = {
  "Básico": "bg-green-100 text-green-700 border-green-200",
  "Intermediário": "bg-orange-100 text-orange-700 border-orange-200",
  "Avançado": "bg-red-100 text-red-700 border-red-200",
  "Táticas": "bg-purple-100 text-purple-700 border-purple-200",
};

interface EstudoContentProps {
  section: Section;
  content?: SectionContent;
}

export default function EstudoContent({ section, content }: EstudoContentProps) {
  const { getSectionDescription, t } = useLanguageContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  
  // Carregar estado de visitação do localStorage
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem('visitedSections');
    if (saved) {
      try {
        const visited = JSON.parse(saved);
        setVisitedSections(new Set(visited));
      } catch (error) {
        console.error('Erro ao carregar seções visitadas:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Salvar estado de visitação no localStorage (apenas após carregar do localStorage inicialmente)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('visitedSections', JSON.stringify([...visitedSections]));
    }
  }, [visitedSections, isLoaded]);

  // Detectar quando chegou a 60% do scroll e marcar como visitado
  useEffect(() => {
    if (!isLoaded) return;

    let scrollTimeout: NodeJS.Timeout;
    let hasMarkedAsVisited = visitedSections.has(section); // Verificar se já está marcado
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (hasMarkedAsVisited) return;
        
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calcular a porcentagem de scroll atual
        const totalScrollable = scrollHeight - clientHeight;
        
        // Se não há scroll (conteúdo menor que a viewport), não marcar
        if (totalScrollable <= 0) {
          return;
        }
        
        const scrollPercentage = (scrollTop / totalScrollable) * 100;
        
        // Marcar como visitado quando chegar a 60% (apenas se o usuário realmente fez scroll)
        if (scrollPercentage >= 60 && scrollTop > 0) {
          hasMarkedAsVisited = true;
          setVisitedSections(prev => {
            if (!prev.has(section)) {
              return new Set([...prev, section]);
            }
            return prev;
          });
        }
      }, 100); // Debounce de 100ms
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoaded, section, visitedSections]);
  
  // Usar conteúdo do Markdown se disponível, senão usar o nome de exibição
  const sectionName = content?.title || getDisplayName(section);
  const description = content?.description || getSectionDescription(section);
  const level = content?.level || getSectionLevel(section);
  const gradientColor = levelColors[level];
  const badgeColor = levelBadgeColors[level];

  // Encontrar seções anterior e próxima
  const currentIndex = SECTIONS.indexOf(section);
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;
  
  const prevSectionName = prevSection ? getDisplayName(prevSection) : null;
  const nextSectionName = nextSection ? getDisplayName(nextSection) : null;
  
  const prevSectionLevel = prevSection ? getSectionLevel(prevSection) : null;
  const nextSectionLevel = nextSection ? getSectionLevel(nextSection) : null;

  const handlePrevSection = () => {
    if (prevSection) {
      router.push(`/estudo/${prevSection}`);
    }
  };

  const handleNextSection = () => {
    if (nextSection) {
      router.push(`/estudo/${nextSection}`);
    }
  };

  const toggleStudiedStatus = () => {
    const newVisited = new Set(visitedSections);
    if (newVisited.has(section)) {
      newVisited.delete(section);
    } else {
      newVisited.add(section);
    }
    setVisitedSections(newVisited);
  };

  const isVisited = visitedSections.has(section);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-4">
        <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-gray-50/80 to-white/60">
          {/* Hero Section */}
          <div className={`relative bg-gradient-to-br ${gradientColor} text-white pt-12 sm:pt-14 md:pt-16 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 overflow-hidden`}>
            {/* Botão de marcação de estudo - topo direito */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={toggleStudiedStatus}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm transition-all duration-200 hover:scale-105 ${
                  isVisited 
                    ? 'bg-green-400/30 text-green-50 border-green-300/50 hover:bg-green-400/40' 
                    : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                }`}
                title={isVisited ? 'Marcar como não estudado' : 'Marcar como estudado'}
              >
                {isVisited ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                <span className="hidden sm:inline">{isVisited ? 'Estudado' : 'Marcar como estudado'}</span>
              </button>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/20 rounded-full translate-y-24 -translate-x-24"></div>
            </div>
            
            <div className="max-w-7xl mx-auto relative pt-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-5 drop-shadow-lg leading-tight">{sectionName}</h1>
              <p className="text-white/95 text-lg sm:text-xl leading-relaxed max-w-3xl">
                {description}
              </p>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="w-full px-4 sm:px-6 py-8 sm:py-12">
            <div className="max-w-7xl mx-auto">
              {/* Banner de Dicas e Provas */}
              {hasSectionTips(section) && (
                <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                        📚 Dicas e Prova Disponíveis
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Estude as principais dicas e teste seu conhecimento com nossa prova interativa
                      </p>
                    </div>
                    <Link
                      href={`/dicas/${section}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Estudar Dicas
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Conteúdo Markdown */}
              {content ? (
                <div 
                  className="markdown-content w-full"
                  dangerouslySetInnerHTML={{ __html: content.content }}
                />
              ) : (
                <div className="text-center py-24">
                  <div className="inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 mb-8 shadow-lg">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-semibold text-xl mb-2">{t('study.contentInDevelopment')}</p>
                  <p className="text-gray-500 text-base">{t('study.moreTipsSoon')}</p>
                </div>
              )}
              
              {/* Botão de marcação de estudo no final da página */}
              {content && (
                <div className="mt-16 py-8 border-t border-gray-200">
                  <button
                    onClick={toggleStudiedStatus}
                    className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-100 ${
                      isVisited
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-300'
                    }`}
                  >
                    {isVisited ? (
                      <>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-lg font-semibold">Marcado como Estudado</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-lg font-semibold">Marcar como Estudado</span>
                      </>
                    )}
                  </button>
                  
                  {/* Link para página do autor */}
                  <div className="mt-8 text-center">
                    <a 
                      href="https://pickleball-brasil.github.io/fabricio-ziliotti/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-white hover:from-sky-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 group"
                    >
                      <span>✨ Conheça o autor deste projeto</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botão de navegação flutuante */}
          {(prevSection || nextSection) && (
            <div className="fixed bottom-6 right-6 z-40">
              <div className="flex items-center justify-center gap-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-2 w-24 sm:w-80">
                {/* Botão Anterior */}
                {prevSection && (
                  <button
                    onClick={handlePrevSection}
                    className="flex items-center gap-1 px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors duration-200 cursor-pointer sm:gap-2 sm:px-3 sm:w-36"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="flex flex-col items-center text-center hidden sm:flex flex-1 min-w-0">
                      <span className="text-xs text-gray-500">Anterior</span>
                      <span className="text-sm font-medium truncate w-full" title={prevSectionName || ''}>{prevSectionName}</span>
                    </div>
                  </button>
                )}

                {/* Separador */}
                {prevSection && nextSection && (
                  <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
                )}

                {/* Botão Próximo */}
                {nextSection && (
                  <button
                    onClick={handleNextSection}
                    className="flex items-center gap-1 px-2 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors duration-200 cursor-pointer sm:gap-2 sm:px-3 sm:w-36"
                  >
                    <div className="flex flex-col items-center text-center hidden sm:flex flex-1 min-w-0">
                      <span className="text-xs text-gray-500">Próximo</span>
                      <span className="text-sm font-medium truncate w-full" title={nextSectionName || ''}>{nextSectionName}</span>
                    </div>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Botão flutuante para menu mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden fixed top-20 left-4 z-40 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

