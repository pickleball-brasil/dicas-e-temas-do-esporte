"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BASIC_SECTIONS, INTERMEDIATE_SECTIONS, ADVANCED_SECTIONS, TACTICS_SECTIONS, SECTIONS, type Section } from "@/lib/sections";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { getDisplayName } from '@/lib/displayNames';
import { CONTENT_REGISTRY } from '@/lib/contentRegistry';

const sectionColors: Record<string, string> = {
  // Básico - VERDE
  "regras": "bg-gradient-to-br from-green-500 to-green-600",
  "saque": "bg-gradient-to-br from-emerald-400 to-green-500",
  "devolucao": "bg-gradient-to-br from-emerald-400 to-emerald-600",
  "dink": "bg-gradient-to-br from-green-400 to-emerald-500",
  "voleio": "bg-gradient-to-br from-green-500 to-green-600",
  "footwork": "bg-gradient-to-br from-green-400 to-green-600",
  "posicionamento": "bg-gradient-to-br from-green-500 to-green-600",
  "empunhadura": "bg-gradient-to-br from-emerald-500 to-green-600",
  "aquecimento": "bg-gradient-to-br from-emerald-500 to-green-600",
  "erros-comuns": "bg-gradient-to-br from-green-400 to-emerald-500",
  "dicas": "bg-gradient-to-br from-emerald-400 to-green-500",
  "equipamentos": "bg-gradient-to-br from-green-400 to-emerald-500",
  "golpes-fundamentais": "bg-gradient-to-br from-emerald-500 to-green-600",
  "tecnica-de-base": "bg-gradient-to-br from-emerald-500 to-emerald-600",
  "concentracao": "bg-gradient-to-br from-green-400 to-emerald-500",
  "respiracao": "bg-gradient-to-br from-green-500 to-emerald-600",
  "pontuacao-detalhada": "bg-gradient-to-br from-emerald-400 to-green-500",
  "etiqueta-em-quadra": "bg-gradient-to-br from-green-500 to-emerald-600",
  "seguranca-e-prevencao-lesoes": "bg-gradient-to-br from-emerald-500 to-green-600",
  "selecao-de-golpes": "bg-gradient-to-br from-amber-400 to-orange-500",
  "lidar-com-bangers": "bg-gradient-to-br from-orange-500 to-amber-600",
  "variacoes-de-saque-intermediario": "bg-gradient-to-br from-amber-500 to-orange-600",
  "tipos-de-voleios-pickleball": "bg-gradient-to-br from-orange-400 to-amber-500",
  "tipos-de-dink-pickleball": "bg-gradient-to-br from-amber-400 to-orange-600",
  "mecanicas-fundamentais": "bg-gradient-to-br from-amber-500 to-orange-600",
  "tecnicas-de-decepcao-engano": "bg-gradient-to-br from-rose-400 to-red-500",
  "recuperacao-e-cobertura-quadra-avancada": "bg-gradient-to-br from-red-500 to-rose-600",
  "quimica-e-sinergia-duplas-avancadas": "bg-gradient-to-br from-rose-500 to-red-600",
  "transicao-defesa-ataque": "bg-gradient-to-br from-purple-400 to-indigo-500",
  "gerenciamento-momentum-timeouts": "bg-gradient-to-br from-indigo-500 to-purple-600",
  
  // Intermediário - LARANJA
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
  
  // Avançado - VERMELHO
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
  "selecao-de-golpes-avancada": "bg-gradient-to-br from-red-500 to-rose-600",
  "construcao-de-pontos": "bg-gradient-to-br from-red-600 to-red-700",
  
  // Táticas - ROXO
  "controle-de-ritmo": "bg-gradient-to-br from-violet-400 to-purple-600",
  "jogo-no-meio": "bg-gradient-to-br from-purple-400 to-violet-500",
  "explorar-fraquezas": "bg-gradient-to-br from-purple-500 to-violet-600",
  "variacao-de-altura": "bg-gradient-to-br from-purple-500 to-violet-600",
  "pressao-constante": "bg-gradient-to-br from-violet-400 to-purple-600",
  "jogo-cruzado": "bg-gradient-to-br from-purple-400 to-violet-500",
  "isolamento-de-jogador": "bg-gradient-to-br from-violet-500 to-purple-600",
  "mudanca-de-direcao": "bg-gradient-to-br from-purple-500 to-violet-600",
  "jogo-de-paciencia": "bg-gradient-to-br from-violet-400 to-purple-600",
  "ataque-ao-corpo": "bg-gradient-to-br from-violet-400 to-purple-500",
  "uso-do-lob-tatico": "bg-gradient-to-br from-violet-400 to-purple-600",
  "forcar-erros": "bg-gradient-to-br from-purple-400 to-violet-500",
  "estrategias-de-abertura": "bg-gradient-to-br from-violet-400 to-purple-500",
  "controle-de-ponto": "bg-gradient-to-br from-violet-400 to-purple-600",
  "quebra-de-ritmo": "bg-gradient-to-br from-violet-400 to-purple-500",
  "exploracao-de-angulos": "bg-gradient-to-br from-violet-500 to-purple-600",
  "jogos-mentais": "bg-gradient-to-br from-violet-500 to-purple-600",
  "adaptacao-tatica": "bg-gradient-to-br from-purple-400 to-purple-600",
};

const SectionCard = ({ section, onClick, isVisited, onToggleStudied }: { section: Section; onClick: () => void; isVisited: boolean; onToggleStudied: (event: React.MouseEvent) => void }) => (
  <div className={`card block p-4 group hover:scale-[1.02] active:scale-100 transition-all duration-300 w-full text-left relative ${
      isVisited 
        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-green-100' 
        : 'hover:shadow-md'
    }`}>
    <div className="flex items-center gap-3">
      <div className={`section-icon ${sectionColors[section]} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 relative flex-shrink-0 ${
        isVisited ? 'ring-2 ring-green-300 ring-offset-2' : ''
      }`}>
        {section.charAt(0)}
        {isVisited && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1 cursor-pointer" onClick={onClick}>
        <span className={`font-semibold text-sm ${
          isVisited ? 'text-green-800' : 'text-gray-900'
        }`}>{getDisplayName(section)}</span>
        <span className={`text-xs block line-clamp-2 ${
          isVisited ? 'text-green-600' : 'text-gray-500'
        }`}>
          {CONTENT_REGISTRY[section]?.description || ''}
        </span>
      </div>
      
      {/* Dois botões separados */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Botão de visitar página */}
        <button
          onClick={onClick}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer ${
            isVisited 
              ? 'bg-green-100 text-green-600 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-sky-600'
          }`}
          title="Visitar página de estudo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span className="text-xs font-medium">Estudar</span>
        </button>
        
        {/* Botão de marcar como estudado */}
        <button
          onClick={onToggleStudied}
          className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 cursor-pointer ${
            isVisited 
              ? 'bg-green-100 text-green-600 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
          }`}
          title={isVisited ? 'Marcar como não estudado' : 'Marcar como estudado'}
        >
          {isVisited ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          )}
        </button>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const { t } = useLanguageContext();

  // Carregar seções estudadas do localStorage na montagem
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
    setIsLoaded(true);
  }, []);

  // Salvar seções estudadas no localStorage (apenas após carregar inicialmente)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('visitedSections', JSON.stringify([...visitedSections]));
    }
  }, [visitedSections, isLoaded]);

  // Função para verificar se uma seção foi visitada
  const isVisited = (section: string) => {
    return visitedSections.has(section);
  };

  // Função para alternar status de estudo (toggle visitedSections)
  const toggleStudiedStatus = (section: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const newVisited = new Set(visitedSections);
    if (newVisited.has(section)) {
      newVisited.delete(section);
    } else {
      newVisited.add(section);
    }
    setVisitedSections(newVisited);
  };

  const handleSectionClick = (section: Section) => {
    // Marcar seção como visitada
    setVisitedSections(prev => new Set([...prev, section]));
    
    router.push(`/estudo/${section}`);
  };

  return (
    <main className="py-4">
      <div className="mb-8">
        <div className="mb-3">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t('sections.title')}
          </h1>
          {visitedSections.size > 0 && (
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Progresso Geral: {visitedSections.size} de {SECTIONS.length} tópicos
                </span>
              </div>
              <div className="flex-1 max-w-xs">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(visitedSections.size / SECTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-lg">
          Explore todos os tópicos de pickleball organizados por nível de dificuldade. Clique em qualquer tópico para começar a estudar.
        </p>
      </div>

      {/* Básico */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-700 font-bold text-sm">
              1
            </div>
            <div className="flex items-center gap-4">
              {/* Mobile: título como link */}
              <Link 
                href="/categoria/basico"
                className="sm:hidden text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors"
              >
                {t('sections.basic')}
              </Link>
              {/* Desktop: título normal + botão */}
              <h2 className="hidden sm:block text-2xl font-bold text-gray-900">{t('sections.basic')}</h2>
              <Link 
                href="/categoria/basico"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Ver categoria
              </Link>
            </div>
          </div>
          {(() => {
            const visitedCount = BASIC_SECTIONS.filter(s => isVisited(s)).length;
            const percentage = (visitedCount / BASIC_SECTIONS.length) * 100;
            return (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-600">{visitedCount}/{BASIC_SECTIONS.length}</span>
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })()}
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BASIC_SECTIONS.map((s) => (
            <li key={s}>
              <SectionCard 
                section={s} 
                onClick={() => handleSectionClick(s)} 
                isVisited={isVisited(s)}
                onToggleStudied={(e) => toggleStudiedStatus(s, e)}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Intermediário */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-700 font-bold text-sm">
              2
            </div>
            <div className="flex items-center gap-4">
              {/* Mobile: título como link */}
              <Link 
                href="/categoria/intermediario"
                className="sm:hidden text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors"
              >
                {t('sections.intermediate')}
              </Link>
              {/* Desktop: título normal + botão */}
              <h2 className="hidden sm:block text-2xl font-bold text-gray-900">{t('sections.intermediate')}</h2>
              <Link 
                href="/categoria/intermediario"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-700 hover:text-orange-800 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Ver categoria
              </Link>
            </div>
          </div>
          {(() => {
            const visitedCount = INTERMEDIATE_SECTIONS.filter(s => isVisited(s)).length;
            const percentage = (visitedCount / INTERMEDIATE_SECTIONS.length) * 100;
            return (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-600">{visitedCount}/{INTERMEDIATE_SECTIONS.length}</span>
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })()}
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTERMEDIATE_SECTIONS.map((s) => (
            <li key={s}>
              <SectionCard 
                section={s} 
                onClick={() => handleSectionClick(s)} 
                isVisited={isVisited(s)}
                onToggleStudied={(e) => toggleStudiedStatus(s, e)}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Avançado */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-700 font-bold text-sm">
              3
            </div>
            <div className="flex items-center gap-4">
              {/* Mobile: título como link */}
              <Link 
                href="/categoria/avancado"
                className="sm:hidden text-2xl font-bold text-gray-900 hover:text-red-600 transition-colors"
              >
                {t('sections.advanced')}
              </Link>
              {/* Desktop: título normal + botão */}
              <h2 className="hidden sm:block text-2xl font-bold text-gray-900">{t('sections.advanced')}</h2>
              <Link 
                href="/categoria/avancado"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Ver categoria
              </Link>
            </div>
          </div>
          {(() => {
            const visitedCount = ADVANCED_SECTIONS.filter(s => isVisited(s)).length;
            const percentage = (visitedCount / ADVANCED_SECTIONS.length) * 100;
            return (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-600">{visitedCount}/{ADVANCED_SECTIONS.length}</span>
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-rose-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })()}
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANCED_SECTIONS.map((s) => (
            <li key={s}>
              <SectionCard 
                section={s} 
                onClick={() => handleSectionClick(s)} 
                isVisited={isVisited(s)}
                onToggleStudied={(e) => toggleStudiedStatus(s, e)}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Táticas */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-bold text-sm">
              4
            </div>
            <div className="flex items-center gap-4">
              {/* Mobile: título como link */}
              <Link 
                href="/categoria/taticas"
                className="sm:hidden text-2xl font-bold text-gray-900 hover:text-purple-600 transition-colors"
              >
                {t('sections.tactics')}
              </Link>
              {/* Desktop: título normal + botão */}
              <h2 className="hidden sm:block text-2xl font-bold text-gray-900">{t('sections.tactics')}</h2>
              <Link 
                href="/categoria/taticas"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 hover:text-purple-800 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Ver categoria
              </Link>
            </div>
          </div>
          {(() => {
            const visitedCount = TACTICS_SECTIONS.filter(s => isVisited(s)).length;
            const percentage = (visitedCount / TACTICS_SECTIONS.length) * 100;
            return (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-600">{visitedCount}/{TACTICS_SECTIONS.length}</span>
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-violet-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })()}
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TACTICS_SECTIONS.map((s) => (
            <li key={s}>
              <SectionCard 
                section={s} 
                onClick={() => handleSectionClick(s)} 
                isVisited={isVisited(s)}
                onToggleStudied={(e) => toggleStudiedStatus(s, e)}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Theme Selector Section */}
      <section className="mb-10">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1">
                🎯 Seletor de Temas Personalizado
              </h2>
              <p className="text-blue-100 text-sm">
                Crie sua coleção personalizada e compartilhe com outros jogadores
              </p>
            </div>
            <Link
              href="/selecionar-temas"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Criar Seleção
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}