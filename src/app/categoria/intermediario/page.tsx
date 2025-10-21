"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { INTERMEDIATE_SECTIONS, type Section } from "@/lib/sections";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { getDisplayName } from '@/lib/displayNames';
import Link from "next/link";

const sectionColors: Record<string, string> = {
  "drop-shot": "bg-gradient-to-br from-amber-400 to-orange-600",
  "terceira-bola": "bg-gradient-to-br from-amber-500 to-orange-600",
  "lob": "bg-gradient-to-br from-amber-400 to-amber-600",
  "transicao": "bg-gradient-to-br from-amber-400 to-orange-600",
  "jogo-de-duplas": "bg-gradient-to-br from-orange-500 to-orange-600",
  "defesa": "bg-gradient-to-br from-orange-500 to-orange-600",
  "bloqueio": "bg-gradient-to-br from-orange-400 to-orange-600",
  "spin": "bg-gradient-to-br from-orange-400 to-amber-500",
  "contra-ataque": "bg-gradient-to-br from-amber-500 to-orange-600",
  "comunicacao": "bg-gradient-to-br from-amber-400 to-amber-600",
  "drills-e-treinos": "bg-gradient-to-br from-orange-400 to-orange-600",
  "preparacao-fisica": "bg-gradient-to-br from-amber-400 to-orange-600",
  "estrategia-de-jogo": "bg-gradient-to-br from-orange-500 to-amber-600",
  "tempo-de-reacao": "bg-gradient-to-br from-amber-400 to-orange-500",
  "antecipacao": "bg-gradient-to-br from-amber-400 to-amber-600",
  "leitura-de-jogo": "bg-gradient-to-br from-amber-400 to-orange-500",
  "adaptacao": "bg-gradient-to-br from-amber-400 to-orange-600",
  "consistencia": "bg-gradient-to-br from-orange-400 to-amber-500",
};

const SectionCard = ({ section, onClick, isVisited }: { section: Section; onClick: () => void; isVisited: boolean }) => (
  <button
    onClick={onClick}
    className={`card block p-4 group hover:scale-[1.02] active:scale-100 transition-all duration-300 w-full text-left ${
      isVisited 
        ? 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 shadow-orange-100' 
        : 'hover:shadow-md'
    }`}
  >
    <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`section-icon ${sectionColors[section]} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 relative ${
              isVisited ? 'ring-2 ring-orange-300 ring-offset-2' : ''
            }`}>
              {section.charAt(0)}
              {isVisited && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
                   <div className="flex flex-col">
                     <span className={`font-semibold text-sm ${
                       isVisited 
                         ? 'text-orange-800' 
                         : 'text-gray-900'
                     }`}>{getDisplayName(section)}</span>
                     <span className={`text-xs ${
                       isVisited 
                         ? 'text-orange-600' 
                         : 'text-gray-500'
                     }`}>
                       {isVisited ? '✓ Concluído' : 'Clique para estudar'}
                     </span>
                   </div>
          </div>
          <div className="flex items-center gap-2">
            {isVisited && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Concluído
              </div>
            )}
            <svg className={`w-4 h-4 transition-all duration-300 flex-shrink-0 ${
              isVisited 
                ? 'text-orange-500 group-hover:text-orange-600' 
                : 'text-gray-400 group-hover:text-sky-600'
            } group-hover:translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
    </div>
  </button>
);

export default function IntermediarioPage() {
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
  const router = useRouter();
  const { t } = useLanguageContext();

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

  // Função para verificar se uma seção foi visitada
  const isVisited = (section: string) => {
    return visitedSections.has(section);
  };

  const handleSectionClick = (section: Section) => {
    // Marcar seção como visitada
    setVisitedSections(prev => new Set([...prev, section]));
    
    router.push(`/estudo/${section}`);
  };

  const visitedCount = INTERMEDIATE_SECTIONS.filter(s => isVisited(s)).length;
  const percentage = (visitedCount / INTERMEDIATE_SECTIONS.length) * 100;

  return (
    <main className="py-4">
      {/* Header da categoria */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-sky-50 to-purple-50 hover:from-sky-100 hover:to-purple-100 text-sky-700 hover:text-sky-800 transition-all duration-200 text-sm font-medium border border-sky-200 hover:border-sky-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Voltar</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-700 font-bold text-sm">
              2
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{t('sections.intermediate')}</h1>
          </div>
        </div>

        {/* Progresso da categoria */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Progresso: {visitedCount} de {INTERMEDIATE_SECTIONS.length} tópicos
            </span>
          </div>
          <div className="flex-1 max-w-xs">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-600 max-w-3xl">
          Desenvolva suas habilidades intermediárias com técnicas avançadas, estratégias de jogo e conceitos que elevarão seu nível no Pickleball.
        </p>
      </div>

      {/* Lista de seções */}
      <section className="mb-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTERMEDIATE_SECTIONS.map((s) => (
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
