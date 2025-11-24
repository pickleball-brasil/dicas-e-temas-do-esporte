"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SECTIONS, getSectionLevel, type Section, type SectionLevel } from "@/lib/sections";
import { getDisplayName } from "@/lib/displayNames";
import { CONTENT_REGISTRY, getSectionsByCategory } from "@/lib/contentRegistry";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const levelConfig: Record<SectionLevel, { 
  color: string; 
  bgColor: string; 
  hoverBgColor: string;
  borderColor: string; 
  icon: string; 
  gradient: string;
  borderGradient: string;
}> = {
  "Básico": { 
    color: "text-sky-700", 
    bgColor: "bg-sky-50", 
    hoverBgColor: "hover:bg-sky-100",
    borderColor: "border-sky-200",
    icon: "🟢",
    gradient: "from-sky-500 to-blue-600",
    borderGradient: "border-sky-500"
  },
  "Intermediário": { 
    color: "text-orange-700", 
    bgColor: "bg-orange-50", 
    hoverBgColor: "hover:bg-orange-100",
    borderColor: "border-orange-200",
    icon: "🟡",
    gradient: "from-orange-500 to-amber-600",
    borderGradient: "border-orange-500"
  },
  "Avançado": { 
    color: "text-red-700", 
    bgColor: "bg-red-50", 
    hoverBgColor: "hover:bg-red-100",
    borderColor: "border-red-200",
    icon: "🔴",
    gradient: "from-red-500 to-rose-600",
    borderGradient: "border-red-500"
  },
  "Táticas": { 
    color: "text-purple-700", 
    bgColor: "bg-purple-50", 
    hoverBgColor: "hover:bg-purple-100",
    borderColor: "border-purple-200",
    icon: "🟣",
    gradient: "from-purple-500 to-violet-600",
    borderGradient: "border-purple-500"
  },
  "Roteiro de Aulas": { 
    color: "text-emerald-700", 
    bgColor: "bg-emerald-50", 
    hoverBgColor: "hover:bg-emerald-100",
    borderColor: "border-emerald-200",
    icon: "📚",
    gradient: "from-emerald-500 to-teal-600",
    borderGradient: "border-emerald-500"
  }
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(new Set());
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Agrupar seções por nível usando o sistema antigo (compatibilidade)
  const sectionsByLevel = SECTIONS.reduce((acc, section) => {
    const level = getSectionLevel(section);
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(section);
    return acc;
  }, {} as Record<SectionLevel, Section[]>);

  // Carregar estado do toggle do localStorage
  useEffect(() => {
    const savedToggle = localStorage.getItem('sidebarCollapsed');
    if (savedToggle) {
      setIsCollapsed(JSON.parse(savedToggle));
    }

    // Função para carregar visitedSections do localStorage
    const loadVisitedSections = () => {
      const saved = localStorage.getItem('visitedSections');
      if (saved) {
        try {
          const visited = JSON.parse(saved);
          setVisitedSections(new Set(visited));
        } catch (error) {
          console.error('Erro ao carregar seções estudadas:', error);
        }
      }
    };

    // Carregar inicialmente
    loadVisitedSections();

    // Listener para mudanças no localStorage (de outras abas/components)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'visitedSections') {
        loadVisitedSections();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Fallback: usar setInterval para verificar mudanças na mesma aba
    let lastKnownValue = localStorage.getItem('visitedSections');
    const interval = setInterval(() => {
      const current = localStorage.getItem('visitedSections');
      if (current !== lastKnownValue) {
        lastKnownValue = current;
        loadVisitedSections();
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []); // Sem visitedSections para evitar re-executar

  // Note: visitedSections é agora gerenciado apenas pelo listener e não salvo pela Sidebar
  // para evitar loops infinitos. A sincronização acontece automaticamente.

  // Salvar estado do toggle no localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  // Expandir automaticamente apenas a categoria do estudo atual
  useEffect(() => {
    if (pathname.includes('/estudo/')) {
      const currentPath = pathname.split('/').pop() || '';
      const activeSection = currentPath.replace(/\/$/, '');
      
      const isValidSection = (s: string): s is Section => (SECTIONS as readonly string[]).includes(s);
      if (activeSection && isValidSection(activeSection)) {
        const level = getSectionLevel(activeSection);
        if (level) {
          setExpandedLevels(new Set([level]));
        }
      }
    } else {
      // Se não estiver em uma página de estudo, limpar expansões
      setExpandedLevels(new Set());
    }
  }, [pathname]);

  // Filtrar seções baseado na busca
  const filteredSections = (Object.entries(sectionsByLevel) as [SectionLevel, Section[]][])
    .map(([level, sections]) => [
      level,
      sections.filter(section => 
        getDisplayName(section).toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ] as [SectionLevel, Section[]])
    .filter(([, sections]) => sections.length > 0);

  const toggleLevel = (level: string) => {
    setExpandedLevels(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(level)) {
        newExpanded.delete(level);
      } else {
        newExpanded.add(level);
      }
      return newExpanded;
    });
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSectionClick = (section: string) => {
    // Navegar para a página de estudo (sem marcar automaticamente)
    router.push(`/estudo/${section}`);
    onClose();
  };

  const isActive = (section: string) => {
    const currentPath = pathname.split('/').pop() || '';
    // Remover trailing slash se existir
    const cleanPath = currentPath.replace(/\/$/, '');
    return cleanPath === section;
  };

  const isVisited = (section: string) => {
    return visitedSections.has(section);
  };

  // const clearVisitedHistory = () => {
  //   setVisitedSections(new Set());
  //   localStorage.removeItem('visitedSections');
  // };

  // Fechar sidebar ao clicar fora (mobile)
  useEffect(() => {
    // Só desabilita scroll no mobile quando sidebar está aberto
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024; // lg breakpoint
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white/98 backdrop-blur-xl border-r border-gray-200/80 z-50
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        shadow-2xl lg:shadow-lg
        flex flex-col
        ${isCollapsed ? 'w-16' : 'w-72'}
      `}>
        {/* Header */}
        <div className={`px-4 py-5 border-b border-gray-200/60 bg-gradient-to-br from-white to-gray-50/50 ${isCollapsed ? 'flex flex-col items-center justify-center' : ''}`}>
          {isCollapsed ? (
            <div className="flex flex-col items-center space-y-4">
              {/* Menu Icon */}
              <div className="w-10 h-10 bg-gradient-to-r from-sky-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              {/* Toggle Button */}
              <button
                onClick={toggleCollapse}
                className="hidden lg:flex p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                title="Expandir sidebar"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-sky-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">Navegação</h2>
                    <p className="text-xs text-gray-500">Guia de Estudo</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Toggle Button - Desktop only */}
                  <button
                    onClick={toggleCollapse}
                    className="hidden lg:flex p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                    title="Colapsar sidebar"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  {/* Close Button - Mobile only */}
                  <button
                    onClick={onClose}
                    className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Buscar tópicos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200/80 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/80 focus:bg-white transition-all duration-200 placeholder-gray-400 text-sm shadow-sm"
                />
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto py-4 px-3 overscroll-contain">
            {filteredSections.map(([level, sections]) => {
              const config = levelConfig[level];
              const visitedInLevel = sections.filter(section => isVisited(section)).length;
              const progressPercentage = sections.length > 0 ? (visitedInLevel / sections.length) * 100 : 0;
              
              return (
                <div key={level} className="mb-5">
                  {/* Level Header */}
                  <button
                    onClick={() => toggleLevel(level)}
                    className={`
                      w-full flex items-center justify-between px-4 py-4 text-left
                      hover:bg-gray-50/80 transition-all duration-200 rounded-xl cursor-pointer
                      ${expandedLevels.has(level) ? `${config.bgColor} shadow-sm border ${config.borderColor}` : 'hover:shadow-sm'}
                      group border border-transparent
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-start">
                        <span className={`font-bold text-sm ${config.color}`}>{level}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{sections.length} tópicos</span>
                          {visitedInLevel > 0 && (
                            <span className={`text-xs font-medium ${config.color}`}>
                              • {visitedInLevel} estudados
                            </span>
                          )}
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                          <div 
                            className={`h-1.5 rounded-full bg-gradient-to-r ${config.gradient} transition-all duration-300`}
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-lg ${config.bgColor} flex items-center justify-center group-hover:scale-105 transition-all duration-200`}>
                      <svg 
                        className={`w-3 h-3 ${config.color} transition-transform duration-200 ${
                          expandedLevels.has(level) ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Sections List */}
                  {expandedLevels.has(level) && (
                    <div className="mt-3 ml-2 space-y-1">
                      {sections.map((section) => (
                        <button
                          key={section}
                          onClick={() => handleSectionClick(section)}
                          className={`
                            w-full text-left px-4 py-3 rounded-lg transition-all duration-200 group cursor-pointer
                            ${isActive(section) 
                              ? `${config.bgColor} border-l-4 ${config.borderGradient} shadow-sm ${config.color}`
                              : isVisited(section)
                              ? `${config.bgColor} ${config.hoverBgColor} ${config.color} opacity-90`
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50/60'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-2 h-2 rounded-full transition-all duration-200
                              ${isActive(section) 
                                ? `bg-gradient-to-r ${config.gradient} scale-125` 
                                : isVisited(section)
                                ? `bg-gradient-to-r ${config.gradient} group-hover:scale-110`
                                : 'bg-gray-300 group-hover:bg-gray-400 group-hover:scale-110'
                              }
                            `} />
                            <span className="text-sm font-medium flex-1 truncate">{getDisplayName(section)}</span>
                            {isActive(section) && (
                              <div className={`w-2 h-2 bg-gradient-to-r ${config.gradient} rounded-full animate-pulse`} />
                            )}
                            {isVisited(section) && !isActive(section) && (
                              <div className={`w-4 h-4 ${config.color} flex items-center justify-center`}>
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Empty State */}
            {filteredSections.length === 0 && (
              <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm font-medium">Nenhum tópico encontrado</p>
                <p className="text-gray-400 text-xs mt-1">Tente uma busca diferente</p>
              </div>
            )}
          </div>
        )}

  
      </div>
    </>
  );
}
