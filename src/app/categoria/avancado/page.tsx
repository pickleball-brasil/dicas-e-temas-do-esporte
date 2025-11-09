"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ADVANCED_SECTIONS, type Section } from "@/lib/sections";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { getDisplayName } from '@/lib/displayNames';

const sectionColors: Record<string, string> = {
  "smash": "bg-gradient-to-br from-rose-500 to-red-600",
  "acelerar-as-bolas": "bg-gradient-to-br from-rose-400 to-red-600",
  "reset": "bg-gradient-to-br from-rose-500 to-red-600",
  "ataque": "bg-gradient-to-br from-red-500 to-red-600",
  "mental-game": "bg-gradient-to-br from-rose-400 to-rose-600",
  "erne": "bg-gradient-to-br from-red-400 to-rose-500",
  "atp-around-the-post": "bg-gradient-to-br from-rose-500 to-red-600",
  "stacking": "bg-gradient-to-br from-red-400 to-red-600",
  "switching": "bg-gradient-to-br from-rose-400 to-red-600",
  "poaching": "bg-gradient-to-br from-red-400 to-red-600",
  "finalizacoes": "bg-gradient-to-br from-red-400 to-rose-500",
  "jogo-singles": "bg-gradient-to-br from-red-400 to-rose-500",
  "torneios": "bg-gradient-to-br from-red-400 to-red-600",
  "golpes-especiais": "bg-gradient-to-br from-red-400 to-red-600",
  "tecnicas-avancadas": "bg-gradient-to-br from-red-500 to-rose-600",
  "pressao-mental": "bg-gradient-to-br from-red-500 to-red-600",
  "execucao-sob-pressao": "bg-gradient-to-br from-red-400 to-rose-500",
  "lideranca-em-quadra": "bg-gradient-to-br from-rose-400 to-rose-600",
  "tecnicas-de-decepcao-engano": "bg-gradient-to-br from-rose-400 to-red-600",
  "recuperacao-e-cobertura-quadra-avancada": "bg-gradient-to-br from-red-500 to-rose-600",
  "quimica-e-sinergia-duplas-avancadas": "bg-gradient-to-br from-rose-400 to-rose-600",
  "selecao-de-golpes-avancada": "bg-gradient-to-br from-red-400 to-rose-500",
  "construcao-de-pontos": "bg-gradient-to-br from-rose-500 to-red-600",
  "analise-de-video": "bg-gradient-to-br from-red-400 to-rose-500",
  "preparacao-fisica-avancada-competicoes": "bg-gradient-to-br from-red-500 to-red-600",
  "scouting-analise-oponentes": "bg-gradient-to-br from-rose-500 to-red-600",
  "jogo-da-porcentagem": "bg-gradient-to-br from-red-500 to-rose-600",
  "drills-e-treinos-avancados": "bg-gradient-to-br from-red-500 to-rose-600",
  "transicao-defesa-ataque": "bg-gradient-to-br from-red-400 to-red-600",
  "gerenciamento-momentum-timeouts": "bg-gradient-to-br from-rose-400 to-red-600",
};

const SectionCard = ({ section, onClick, isVisited }: { section: Section; onClick: () => void; isVisited: boolean }) => (
  <button
    onClick={onClick}
    className={`card block p-4 group hover:scale-[1.02] active:scale-100 transition-all duration-300 w-full text-left ${
      isVisited 
        ? 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200 shadow-red-100' 
        : 'hover:shadow-md'
    }`}
  >
    <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`section-icon ${sectionColors[section]} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 relative ${
              isVisited ? 'ring-2 ring-red-300 ring-offset-2' : ''
            }`}>
              {section.charAt(0)}
              {isVisited && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
                   <div className="flex flex-col">
                     <span className={`font-semibold text-sm ${
                       isVisited 
                         ? 'text-red-800' 
                         : 'text-gray-900'
                     }`}>{getDisplayName(section)}</span>
                     <span className={`text-xs ${
                       isVisited 
                         ? 'text-red-600' 
                         : 'text-gray-500'
                     }`}>
                       {isVisited ? '✓ Concluído' : 'Clique para estudar'}
                     </span>
                   </div>
          </div>
          <div className="flex items-center gap-2">
            {isVisited && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Concluído
              </div>
            )}
            <svg className={`w-4 h-4 transition-all duration-300 flex-shrink-0 ${
              isVisited 
                ? 'text-red-500 group-hover:text-red-600' 
                : 'text-gray-400 group-hover:text-sky-600'
            } group-hover:translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
    </div>
  </button>
);

export default function AvancadoPage() {
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

  const visitedCount = ADVANCED_SECTIONS.filter(s => isVisited(s)).length;
  const percentage = (visitedCount / ADVANCED_SECTIONS.length) * 100;

  return (
    <main className="py-4 pt-12 sm:pt-14">
      {/* Header da categoria */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-700 font-bold text-sm">
              3
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{t('sections.advanced')}</h1>
          </div>
        </div>

        {/* Progresso da categoria */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Progresso: {visitedCount} de {ADVANCED_SECTIONS.length} tópicos
            </span>
          </div>
          <div className="flex-1 max-w-xs">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-500 to-rose-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-600 max-w-3xl">
          Domine as técnicas mais avançadas do Pickleball com golpes especiais, estratégias complexas e mental game para competições de alto nível.
        </p>
      </div>

      {/* Lista de seções */}
      <section className="mb-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANCED_SECTIONS.map((s) => (
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
