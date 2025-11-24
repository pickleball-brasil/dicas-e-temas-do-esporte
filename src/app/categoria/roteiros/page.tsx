"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROTEIROS_SECTIONS, type Section } from "@/lib/sections";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { getDisplayName } from '@/lib/displayNames';
import { CONTENT_REGISTRY } from "@/lib/contentRegistry";

const sectionColors: Record<string, string> = {
  "roteiro-aula-dinks-aceleracao": "bg-gradient-to-br from-emerald-500 to-teal-600",
  "roteiro-aula-terceira-bola": "bg-gradient-to-br from-emerald-500 to-teal-600",
  "roteiro-aula-drive": "bg-gradient-to-br from-emerald-500 to-teal-600",
  "roteiro-aula-drop": "bg-gradient-to-br from-emerald-500 to-teal-600",
  "roteiro-aula-tomada-decisao": "bg-gradient-to-br from-emerald-500 to-teal-600",
  "roteiro-aula-saque-devolucao": "bg-gradient-to-br from-emerald-500 to-teal-600",
  "roteiro-aula-jogo-das-porcentagens": "bg-gradient-to-br from-emerald-500 to-teal-600",
  "estudos-e-pesquisas": "bg-gradient-to-br from-emerald-500 to-teal-600",
};

const SectionCard = ({ section, onClick, isVisited }: { section: Section; onClick: () => void; isVisited: boolean }) => {
  // Obter cor do objeto sectionColors ou usar fallback
  const sectionColor = sectionColors[section] || CONTENT_REGISTRY[section]?.color || "bg-gradient-to-br from-emerald-500 to-teal-600";
  
  // Função para obter a inicial do tópico (removendo "Roteiro: " se presente)
  const getInitial = (displayName: string) => {
    // Se começar com "Roteiro: ", pega a primeira letra após os dois pontos
    if (displayName.startsWith("Roteiro: ")) {
      const topicName = displayName.replace("Roteiro: ", "").trim();
      return topicName.charAt(0).toUpperCase();
    }
    // Caso contrário, pega a primeira letra normal
    return displayName.charAt(0).toUpperCase();
  };
  
  return (
    <button
      onClick={onClick}
      className={`card block p-4 group hover:scale-[1.02] active:scale-100 transition-all duration-300 w-full text-left ${
        isVisited 
          ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-emerald-100' 
          : 'hover:shadow-md'
      }`}
    >
      <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`section-icon ${sectionColor} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 relative ${
                isVisited ? 'ring-2 ring-emerald-300 ring-offset-2' : ''
              }`}>
                {getInitial(getDisplayName(section))}
                {isVisited && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
                     <div className="flex flex-col">
                       <span className={`font-semibold text-sm ${
                         isVisited 
                           ? 'text-emerald-800' 
                           : 'text-gray-900'
                       }`}>{getDisplayName(section)}</span>
                       <span className={`text-xs ${
                         isVisited 
                           ? 'text-emerald-600' 
                           : 'text-gray-500'
                       }`}>
                         {isVisited ? '✓ Concluído' : 'Clique para estudar'}
                       </span>
                     </div>
            </div>
            <div className="flex items-center gap-2">
              {isVisited && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Concluído
                </div>
              )}
              <svg className={`w-4 h-4 transition-all duration-300 flex-shrink-0 ${
                isVisited 
                  ? 'text-emerald-500 group-hover:text-emerald-600' 
                  : 'text-gray-400 group-hover:text-emerald-600'
              } group-hover:translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
      </div>
    </button>
  );
};

export default function RoteirosPage() {
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

  const visitedCount = ROTEIROS_SECTIONS.filter(s => isVisited(s)).length;
  const percentage = (visitedCount / ROTEIROS_SECTIONS.length) * 100;

  return (
    <main className="py-4 pt-12 sm:pt-14">
      {/* Header da categoria */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-sm">
              5
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Roteiro de Aulas</h1>
          </div>
        </div>

        {/* Progresso da categoria */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Progresso: {visitedCount} de {ROTEIROS_SECTIONS.length} tópicos
            </span>
          </div>
          <div className="flex-1 max-w-xs">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-600 max-w-3xl">
          Roteiros completos de aulas de pickleball com estrutura detalhada, drills práticos e objetivos de aprendizado para instrutores e alunos.
        </p>
      </div>

      {/* Lista de seções */}
      <section className="mb-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROTEIROS_SECTIONS.map((s) => (
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

