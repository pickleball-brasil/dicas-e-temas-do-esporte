"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BASIC_SECTIONS, type Section } from "@/lib/sections";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { getDisplayName } from '@/lib/displayNames';

const sectionColors: Record<string, string> = {
  "regras": "bg-gradient-to-br from-sky-500 to-blue-600",
  "saque": "bg-gradient-to-br from-sky-400 to-blue-500",
  "devolucao": "bg-gradient-to-br from-blue-400 to-sky-600",
  "dink": "bg-gradient-to-br from-sky-400 to-blue-500",
  "voleio": "bg-gradient-to-br from-sky-500 to-blue-600",
  "footwork": "bg-gradient-to-br from-sky-400 to-blue-600",
  "posicionamento": "bg-gradient-to-br from-sky-500 to-blue-600",
  "empunhadura": "bg-gradient-to-br from-blue-500 to-sky-600",
  "aquecimento": "bg-gradient-to-br from-blue-500 to-sky-600",
  "erros-comuns": "bg-gradient-to-br from-sky-400 to-blue-500",
  "dicas": "bg-gradient-to-br from-sky-400 to-blue-500",
  "golpes-fundamentais": "bg-gradient-to-br from-blue-500 to-sky-600",
  "tecnica-de-base": "bg-gradient-to-br from-blue-500 to-blue-600",
  "concentracao": "bg-gradient-to-br from-sky-400 to-blue-500",
  "respiracao": "bg-gradient-to-br from-sky-500 to-blue-600",
  "etiqueta-em-quadra": "bg-gradient-to-br from-blue-500 to-sky-600",
  "historia-e-origem": "bg-gradient-to-br from-sky-400 to-blue-500",
  "como-escolher-parceiro": "bg-gradient-to-br from-sky-500 to-blue-600",
  "drills-e-treinos-basicos": "bg-gradient-to-br from-sky-400 to-blue-500",
};

const SectionCard = ({ section, onClick, isVisited }: { section: Section; onClick: () => void; isVisited: boolean }) => (
  <button
    onClick={onClick}
    className={`card block p-4 group hover:scale-[1.02] active:scale-100 transition-all duration-300 w-full text-left ${
      isVisited 
        ? 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200 shadow-sky-100' 
        : 'hover:shadow-md'
    }`}
  >
    <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`section-icon ${sectionColors[section]} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 relative ${
              isVisited ? 'ring-2 ring-sky-300 ring-offset-2' : ''
            }`}>
              {getDisplayName(section).charAt(0).toUpperCase()}
              {isVisited && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
                   <div className="flex flex-col">
                     <span className={`font-semibold text-sm ${
                       isVisited 
                         ? 'text-sky-800' 
                         : 'text-gray-900'
                     }`}>{getDisplayName(section)}</span>
                     <span className={`text-xs ${
                       isVisited 
                         ? 'text-sky-600' 
                         : 'text-gray-500'
                     }`}>
                       {isVisited ? '✓ Concluído' : 'Clique para estudar'}
                     </span>
                   </div>
          </div>
          <div className="flex items-center gap-2">
            {isVisited && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Concluído
              </div>
            )}
            <svg className={`w-4 h-4 transition-all duration-300 flex-shrink-0 ${
              isVisited 
                ? 'text-sky-500 group-hover:text-sky-600' 
                : 'text-gray-400 group-hover:text-sky-600'
            } group-hover:translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
    </div>
  </button>
);

export default function BasicoPage() {
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
  const router = useRouter();
  const { t } = useLanguageContext();

  // Carregar seções estudadas do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('visitedSections');
    if (saved) {
      try {
        const visited = JSON.parse(saved);
        setVisitedSections(new Set(visited));
      } catch (error) {
        console.error('Erro ao carregar seções estudadas:', error);
      }
    }
  }, []);

  // Salvar seções estudadas no localStorage
  useEffect(() => {
    if (visitedSections.size > 0) {
      localStorage.setItem('visitedSections', JSON.stringify([...visitedSections]));
      // Disparar evento customizado para atualizar barra de progresso
      window.dispatchEvent(new Event('visitedSectionsChanged'));
    }
  }, [visitedSections]);

  // Função para verificar se uma seção foi visitada
  const isVisited = (section: string) => {
    return visitedSections.has(section);
  };

  const handleSectionClick = (section: Section) => {
    // Marcar seção como visitada
    setVisitedSections(prev => new Set([...prev, section]));
    
    router.push(`/estudo/${section}`);
  };

  const visitedCount = BASIC_SECTIONS.filter(s => isVisited(s)).length;
  const percentage = (visitedCount / BASIC_SECTIONS.length) * 100;

  return (
    <main className="py-4 pt-12 sm:pt-14">
      {/* Header da categoria */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-100 text-sky-700 font-bold text-sm">
              1
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{t('sections.basic')}</h1>
          </div>
        </div>

        {/* Progresso da categoria */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-sky-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Progresso: {visitedCount} de {BASIC_SECTIONS.length} tópicos
            </span>
          </div>
          <div className="flex-1 max-w-xs">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-sky-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-600 max-w-3xl">
          Aprenda os fundamentos do Pickleball com técnicas básicas, regras essenciais e conceitos fundamentais para iniciar sua jornada no esporte.
        </p>
      </div>

      {/* Lista de seções */}
      <section className="mb-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BASIC_SECTIONS.map((s) => (
            <li key={s}>
              <SectionCard 
                section={s} 
                onClick={() => handleSectionClick(s)} 
                isVisited={isVisited(s)}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
