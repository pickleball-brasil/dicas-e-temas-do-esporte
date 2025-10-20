"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SECTIONS, getSectionLevel } from "@/lib/sections";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const levelColors = {
  "Básico": "text-green-600 bg-green-50 border-green-200",
  "Intermediário": "text-orange-600 bg-orange-50 border-orange-200", 
  "Avançado": "text-red-600 bg-red-50 border-red-200",
  "Táticas": "text-purple-600 bg-purple-50 border-purple-200"
};

const levelIcons = {
  "Básico": "🟢",
  "Intermediário": "🟡", 
  "Avançado": "🔴",
  "Táticas": "🟣"
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(new Set());
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());

  // Agrupar seções por nível
  const sectionsByLevel = SECTIONS.reduce((acc, section) => {
    const level = getSectionLevel(section);
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(section);
    return acc;
  }, {} as Record<string, string[]>);

  // Carregar links visitados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('visitedSections');
    if (saved) {
      try {
        const visited = JSON.parse(saved);
        setVisitedSections(new Set(visited));
      } catch (error) {
        console.error('Erro ao carregar links visitados:', error);
      }
    }
  }, []);

  // Salvar links visitados no localStorage
  useEffect(() => {
    if (visitedSections.size > 0) {
      localStorage.setItem('visitedSections', JSON.stringify([...visitedSections]));
    }
  }, [visitedSections]);

  // Expandir automaticamente apenas a categoria do estudo atual
  useEffect(() => {
    if (isOpen) {
      const activeSection = decodeURIComponent(pathname.split('/').pop() || '');
      if (activeSection) {
        for (const [level, sections] of Object.entries(sectionsByLevel)) {
          if (sections.includes(activeSection)) {
            setExpandedLevels(prev => {
              // Só atualiza se a categoria for diferente da atual
              if (!prev.has(level) || prev.size > 1) {
                return new Set([level]);
              }
              return prev;
            });
            break;
          }
        }
      }
    }
  }, [isOpen, pathname]);

  // Filtrar seções baseado na busca
  const filteredSections = Object.entries(sectionsByLevel).map(([level, sections]) => [
    level,
    sections.filter(section => 
      section.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ]).filter(([, sections]) => (sections as string[]).length > 0) as [string, string[]][];

  const toggleLevel = (level: string) => {
    const newExpanded = new Set(expandedLevels);
    if (newExpanded.has(level)) {
      newExpanded.delete(level);
    } else {
      newExpanded.add(level);
    }
    setExpandedLevels(newExpanded);
  };

  const handleSectionClick = (section: string) => {
    // Marcar seção como visitada
    setVisitedSections(prev => new Set([...prev, section]));
    
    router.push(`/estudo/${encodeURIComponent(section)}`);
    onClose();
  };

  const isActive = (section: string) => {
    return pathname.includes(encodeURIComponent(section));
  };

  const isVisited = (section: string) => {
    return visitedSections.has(section);
  };

  const clearVisitedHistory = () => {
    setVisitedSections(new Set());
    localStorage.removeItem('visitedSections');
  };

  // Fechar sidebar ao clicar fora (mobile)
  useEffect(() => {
    // Só desabilita scroll no mobile quando sidebar está aberto
    const isMobile = window.innerWidth < 1024; // lg breakpoint
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-white/95 backdrop-blur-xl border-r border-gray-200/60 z-50
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        shadow-2xl lg:shadow-xl
        overflow-x-hidden overflow-y-auto
      `}>
        {/* Header */}
        <div className="px-3 py-4 border-b border-gray-200/40 bg-gradient-to-r from-slate-50 to-gray-50/80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Navegação
              </h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar tópicos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200/60 rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/60 focus:bg-white transition-all duration-200 placeholder-gray-400 text-sm"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3">
          {filteredSections.map(([level, sections]) => (
            <div key={level} className="mb-4">
              {/* Level Header */}
              <button
                onClick={() => toggleLevel(level)}
                className={`
                  w-full flex items-center justify-between px-3 py-3 text-left
                  hover:bg-gray-50 transition-all duration-200 rounded-lg mx-2
                  ${expandedLevels.has(level) ? 'bg-gray-50/80 shadow-sm' : ''}
                  group
                `}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <span className="text-sm">{levelIcons[level as keyof typeof levelIcons]}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 text-sm">{level}</span>
                    <span className="text-xs text-gray-500">{sections.length} tópicos</span>
                    {(() => {
                      const visitedInLevel = sections.filter(section => isVisited(section)).length;
                      return visitedInLevel > 0 && (
                        <span className="text-xs text-green-600 font-medium">
                          {visitedInLevel} de {sections.length} visitados
                        </span>
                      );
                    })()}
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                  <svg 
                    className={`w-2.5 h-2.5 text-gray-600 transition-transform duration-200 ${
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
                <div className="mt-1.5">
                  {sections.map((section) => (
                    <button
                      key={section}
                      onClick={() => handleSectionClick(section)}
                      className={`
                        w-full text-left px-3 py-2.5 mx-2 rounded-md transition-all duration-200 group
                        ${isActive(section) 
                          ? `bg-gradient-to-r from-blue-50 to-indigo-50 border-l-3 border-blue-500 shadow-sm ${levelColors[level as keyof typeof levelColors]}`
                          : isVisited(section)
                          ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 bg-gray-50/30'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50/60'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`
                          w-1.5 h-1.5 rounded-full transition-all duration-200
                          ${isActive(section) 
                            ? 'bg-blue-500 scale-125' 
                            : isVisited(section)
                            ? 'bg-green-400 group-hover:bg-green-500 group-hover:scale-110'
                            : 'bg-gray-300 group-hover:bg-gray-400 group-hover:scale-110'
                          }
                        `} />
                        <span className="text-sm font-medium flex-1 truncate">{section}</span>
                        {isActive(section) && (
                          <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                        )}
                        {isVisited(section) && !isActive(section) && (
                          <div className="w-3.5 h-3.5 text-green-500 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
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
          ))}

          {/* Empty State */}
          {filteredSections.length === 0 && (
            <div className="px-4 py-6 text-center">
              <svg className="w-8 h-8 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-gray-500 text-sm">Nenhum tópico encontrado</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-gray-200/40 bg-gradient-to-r from-slate-50 to-gray-50/80">
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-lg shadow-sm">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <p className="text-xs font-medium text-gray-600">
                {SECTIONS.length} tópicos disponíveis
              </p>
            </div>
            {visitedSections.size > 0 && (
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-50/80 rounded-lg shadow-sm">
                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                <p className="text-xs font-medium text-blue-700">
                  {visitedSections.size} visitados
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
