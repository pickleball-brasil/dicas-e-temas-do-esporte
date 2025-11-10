"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BASIC_SECTIONS, INTERMEDIATE_SECTIONS, ADVANCED_SECTIONS, TACTICS_SECTIONS, SECTIONS, type Section } from "@/lib/sections";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { useLayoutContext } from '@/contexts/LayoutContext';
import { getDisplayName } from '@/lib/displayNames';
import { CONTENT_REGISTRY } from '@/lib/contentRegistry';

// Cores para os títulos das categorias - Gradientes azul, laranja, vermelho e roxo
const categoryHeaderColors = {
  basico: 'bg-gradient-to-r from-sky-50 to-blue-50 text-sky-900 border-sky-200',
  intermediario: 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-900 border-orange-200',
  avancado: 'bg-gradient-to-r from-red-50 to-rose-50 text-red-900 border-red-200',
  taticas: 'bg-gradient-to-r from-purple-50 to-violet-50 text-purple-900 border-purple-200',
};

const categoryBadgeColors = {
  basico: 'bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 border-sky-200',
  intermediario: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border-orange-200',
  avancado: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200',
  taticas: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 border-purple-200',
};

const categoryTextColors = {
  basico: 'text-sky-900',
  intermediario: 'text-orange-900',
  avancado: 'text-red-900',
  taticas: 'text-purple-900',
};

const sectionColors: Record<string, string> = {
  // Básico - AZUL (sky/blue)
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
  "equipamentos": "bg-gradient-to-br from-sky-400 to-blue-500",
  "golpes-fundamentais": "bg-gradient-to-br from-blue-500 to-sky-600",
  "tecnica-de-base": "bg-gradient-to-br from-blue-500 to-blue-600",
  "concentracao": "bg-gradient-to-br from-sky-400 to-blue-500",
  "respiracao": "bg-gradient-to-br from-sky-500 to-blue-600",
  "pontuacao-detalhada": "bg-gradient-to-br from-sky-400 to-blue-500",
  "etiqueta-em-quadra": "bg-gradient-to-br from-sky-500 to-blue-600",
  "seguranca-e-prevencao-lesoes": "bg-gradient-to-br from-blue-500 to-sky-600",
  "historia-e-origem": "bg-gradient-to-br from-sky-400 to-blue-500",
  "vocabulario-e-termos": "bg-gradient-to-br from-blue-500 to-sky-600",
  "como-escolher-parceiro": "bg-gradient-to-br from-sky-500 to-blue-600",
  "drills-e-treinos-basicos": "bg-gradient-to-br from-sky-400 to-blue-500",
  "selecao-de-golpes": "bg-gradient-to-br from-amber-400 to-orange-500",
  "lidar-com-bangers": "bg-gradient-to-br from-orange-500 to-amber-600",
  "variacoes-de-saque-intermediario": "bg-gradient-to-br from-amber-500 to-orange-600",
  "tipos-de-voleios-pickleball": "bg-gradient-to-br from-orange-400 to-amber-500",
  "tipos-de-dink-pickleball": "bg-gradient-to-br from-amber-400 to-orange-600",
  "mecanicas-fundamentais": "bg-gradient-to-br from-amber-500 to-orange-600",
  "analise-de-pontos": "bg-gradient-to-br from-amber-400 to-orange-500",
  "preparacao-mental-intermediaria": "bg-gradient-to-br from-amber-500 to-orange-600",
  "estrategias-saque-devolucao-avancadas": "bg-gradient-to-br from-orange-400 to-amber-500",
  "controle-mental": "bg-gradient-to-br from-amber-500 to-orange-600",
  "exercicios-mobilidade-forca": "bg-gradient-to-br from-amber-500 to-orange-600",
  "tecnicas-de-decepcao-engano": "bg-gradient-to-br from-rose-400 to-red-500",
  "recuperacao-e-cobertura-quadra-avancada": "bg-gradient-to-br from-red-500 to-rose-600",
  "quimica-e-sinergia-duplas-avancadas": "bg-gradient-to-br from-rose-500 to-red-600",
  "transicao-defesa-ataque": "bg-gradient-to-br from-purple-400 to-violet-500",
  "gerenciamento-momentum-timeouts": "bg-gradient-to-br from-violet-500 to-purple-600",

  // Intermediário - LARANJA (orange/amber)
  "drop-shot": "bg-gradient-to-br from-amber-400 to-orange-600",
  "drive": "bg-gradient-to-br from-amber-400 to-orange-600",
  "terceira-bola": "bg-gradient-to-br from-amber-500 to-orange-600",
  "lob": "bg-gradient-to-br from-amber-400 to-orange-500",
  "transicao": "bg-gradient-to-br from-amber-400 to-orange-600",
  "jogo-de-duplas": "bg-gradient-to-br from-orange-500 to-amber-600",
  "defesa": "bg-gradient-to-br from-orange-500 to-amber-600",
  "bloqueio": "bg-gradient-to-br from-orange-400 to-amber-600",
  "spin": "bg-gradient-to-br from-orange-400 to-amber-500",
  "contra-ataque": "bg-gradient-to-br from-amber-500 to-orange-600",
  "comunicacao": "bg-gradient-to-br from-amber-400 to-orange-500",
  "drills-e-treinos": "bg-gradient-to-br from-orange-400 to-amber-600",
  "treino-com-paredao": "bg-gradient-to-br from-amber-400 to-orange-600",
  "preparacao-fisica": "bg-gradient-to-br from-amber-400 to-orange-600",
  "estrategia-de-jogo": "bg-gradient-to-br from-orange-500 to-amber-600",
  "tempo-de-reacao": "bg-gradient-to-br from-amber-400 to-orange-500",
  "antecipacao": "bg-gradient-to-br from-amber-400 to-orange-500",
  "leitura-de-jogo": "bg-gradient-to-br from-amber-400 to-orange-500",
  "adaptacao": "bg-gradient-to-br from-amber-400 to-orange-600",
  "consistencia": "bg-gradient-to-br from-orange-400 to-amber-500",

  // Avançado - VERMELHO (red/rose) - mantém vermelho
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
  "analise-de-video": "bg-gradient-to-br from-red-400 to-rose-500",
  "preparacao-fisica-avancada-competicoes": "bg-gradient-to-br from-red-500 to-red-600",
  "scouting-analise-oponentes": "bg-gradient-to-br from-rose-500 to-red-600",
  "jogo-da-porcentagem": "bg-gradient-to-br from-red-500 to-rose-600",
  "drills-e-treinos-avancados": "bg-gradient-to-br from-red-500 to-rose-600",

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

const SectionCard = ({ section, onClick, isVisited, onToggleStudied }: { section: Section; onClick: () => void; isVisited: boolean; onToggleStudied: (event: React.MouseEvent) => void }) => {
  const category = getSectionCategory(section);
  const studiedColors = categoryStudiedColors[category];
  const studiedTextColors = categoryStudiedTextColors[category];
  const studiedButtonColors = categoryStudiedButtonColors[category];
  const studiedRingColors = categoryStudiedRingColors[category];
  const studiedBadgeColors = categoryStudiedBadgeColors[category];

  return (
    <div 
      className={`card block p-4 group hover:scale-[1.02] active:scale-100 transition-all duration-300 w-full text-left relative cursor-pointer ${isVisited
       ? `${studiedColors} shadow-sm`
       : 'hover:shadow-md'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div 
          className={`section-icon ${sectionColors[section]} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 relative flex-shrink-0 cursor-pointer ${isVisited ? studiedRingColors : ''
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {section.charAt(0)}
          {isVisited && (
            <div className={`absolute -top-1 -right-1 w-4 h-4 ${studiedBadgeColors} rounded-full flex items-center justify-center shadow-sm`}>
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1">
          <span className={`font-semibold text-sm ${isVisited ? studiedTextColors.title : 'text-gray-900'
            }`}>{getDisplayName(section)}</span>
          <span className={`text-xs block line-clamp-2 ${isVisited ? studiedTextColors.description : 'text-gray-500'
            }`}>
            {CONTENT_REGISTRY[section]?.description || ''}
          </span>
        </div>

        {/* Botão de marcar como estudado */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleStudied(e);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer ${isVisited
               ? studiedButtonColors
               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            title={isVisited ? 'Marcar como não estudado' : 'Marcar como estudado'}
          >
            {isVisited ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium hidden sm:inline">Estudado</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span className="text-xs font-medium hidden sm:inline">Marcar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Função para determinar a categoria de uma seção
const getSectionCategory = (section: Section): 'basic' | 'intermediate' | 'advanced' | 'tactics' => {
  if ((BASIC_SECTIONS as readonly Section[]).includes(section)) return 'basic';
  if ((INTERMEDIATE_SECTIONS as readonly Section[]).includes(section)) return 'intermediate';
  if ((ADVANCED_SECTIONS as readonly Section[]).includes(section)) return 'advanced';
  if ((TACTICS_SECTIONS as readonly Section[]).includes(section)) return 'tactics';
  return 'basic'; // fallback
};

// Cores dos checkboxes por categoria - Nova paleta azul, laranja, vermelho e roxo
const categoryCheckboxColors = {
  basic: 'bg-sky-500 border-sky-500',
  intermediate: 'bg-orange-500 border-orange-500',
  advanced: 'bg-red-500 border-red-500',
  tactics: 'bg-violet-500 border-violet-500',
};

// Cores de background para cards estudados por categoria
const categoryStudiedColors = {
  basic: 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200',
  intermediate: 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200',
  advanced: 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200',
  tactics: 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200',
};

// Cores de texto para cards estudados por categoria
const categoryStudiedTextColors = {
  basic: { title: 'text-sky-800', description: 'text-sky-600' },
  intermediate: { title: 'text-orange-800', description: 'text-orange-600' },
  advanced: { title: 'text-red-800', description: 'text-red-600' },
  tactics: { title: 'text-purple-800', description: 'text-purple-600' },
};

// Cores do botão estudado por categoria
const categoryStudiedButtonColors = {
  basic: 'bg-sky-100 text-sky-700 hover:bg-sky-200',
  intermediate: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
  advanced: 'bg-red-100 text-red-700 hover:bg-red-200',
  tactics: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
};

// Cores do ring do ícone quando estudado por categoria
const categoryStudiedRingColors = {
  basic: 'ring-2 ring-sky-300 ring-offset-2',
  intermediate: 'ring-2 ring-orange-300 ring-offset-2',
  advanced: 'ring-2 ring-red-300 ring-offset-2',
  tactics: 'ring-2 ring-purple-300 ring-offset-2',
};

// Cores do badge de check quando estudado por categoria
const categoryStudiedBadgeColors = {
  basic: 'bg-sky-500',
  intermediate: 'bg-orange-500',
  advanced: 'bg-red-500',
  tactics: 'bg-purple-500',
};

// Componente simplificado em lista (checklist)
const SectionListItem = ({ section, onClick, isVisited, onToggleStudied }: { section: Section; onClick: () => void; isVisited: boolean; onToggleStudied: (event: React.MouseEvent) => void }) => {
  const category = getSectionCategory(section);
  const checkboxColor = categoryCheckboxColors[category];

  return (
    <li>
      <div
        className={`flex items-center gap-3 py-2 px-1 transition-all duration-200 cursor-pointer ${isVisited ? 'opacity-60' : ''}`}
        onClick={onClick}
      >
        {/* Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleStudied(e);
          }}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${isVisited
              ? `${checkboxColor} text-white`
              : 'border-gray-300 hover:border-gray-400'
            }`}
          title={isVisited ? 'Marcar como não estudado' : 'Marcar como estudado'}
        >
          {isVisited && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Título e Descrição lado a lado */}
        <div className="flex-1 flex items-center gap-4 min-w-0">
          <span className={`text-sm font-medium flex-shrink-0 ${isVisited ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {getDisplayName(section)}
          </span>
          <span className={`text-xs flex-1 truncate ${isVisited ? 'text-gray-400' : 'text-gray-500'}`}>
            {CONTENT_REGISTRY[section]?.description || ''}
          </span>
        </div>
      </div>
    </li>
  );
};

export default function Home() {
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { t } = useLanguageContext();
  const { layout } = useLayoutContext();

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
      // Disparar evento customizado para atualizar barra de progresso
      window.dispatchEvent(new Event('visitedSectionsChanged'));
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

  // Função para filtrar seções baseado no termo de busca
  const filterSections = (sections: readonly Section[]): Section[] => {
    if (!searchTerm.trim()) {
      return [...sections];
    }
    
    const term = searchTerm.toLowerCase().trim();
    return sections.filter(section => {
      const displayName = getDisplayName(section).toLowerCase();
      const description = (CONTENT_REGISTRY[section]?.description || '').toLowerCase();
      return displayName.includes(term) || description.includes(term);
    });
  };

  // Filtrar seções de cada categoria
  const filteredBasicSections = filterSections(BASIC_SECTIONS);
  const filteredIntermediateSections = filterSections(INTERMEDIATE_SECTIONS);
  const filteredAdvancedSections = filterSections(ADVANCED_SECTIONS);
  const filteredTacticsSections = filterSections(TACTICS_SECTIONS);

  // Verificar se há resultados na busca
  const hasSearchResults = searchTerm.trim() && (
    filteredBasicSections.length > 0 ||
    filteredIntermediateSections.length > 0 ||
    filteredAdvancedSections.length > 0 ||
    filteredTacticsSections.length > 0
  );

  const hasNoResults = searchTerm.trim() && !hasSearchResults;

  return (
    <main className="py-4 pt-6 sm:pt-8">
      <div className="mb-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
            Aprenda Pickleball de Forma Estruturada
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Explore tópicos organizados por nível de dificuldade. Cada categoria oferece conteúdo completo para seu desenvolvimento no esporte.
          </p>
          
          {/* Campo de busca */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar tópicos..."
                className="block w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mensagem quando não há resultados */}
      {hasNoResults && (
        <div className="max-w-2xl mx-auto mb-6 sm:mb-8 text-center py-6 sm:py-8 px-4">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-sky-100 to-purple-100 mb-3 sm:mb-4">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
            Nenhum resultado encontrado
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">
            Não encontramos tópicos correspondentes a <span className="font-medium text-gray-900">"{searchTerm}"</span>
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            Tente usar termos diferentes ou verifique a ortografia
          </p>
        </div>
      )}

      {/* Básico */}
      {(filteredBasicSections.length > 0 || !searchTerm.trim()) && (
      <section className="mb-12">
        <div className={`${layout === "list" ? "max-w-2xl mx-auto" : ""}`}>
          <div className={`rounded-xl border-2 ${categoryHeaderColors.basico} px-3 sm:px-5 py-2 sm:py-3 mb-4 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden`}>
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-blue-100/30 opacity-50 pointer-events-none"></div>
            
            <div className="flex items-center justify-between gap-2 sm:gap-3 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {/* Icon */}
                <div className="w-8 h-8 sm:w-11 sm:h-11 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                    {/* Mobile: título como link */}
                    <Link
                      href="/categoria/basico"
                      className={`sm:hidden text-base font-bold ${categoryTextColors.basico} hover:opacity-80 transition-opacity truncate`}
                    >
                      {t('sections.basic')}
                    </Link>
                    {/* Desktop: título normal + botão */}
                    <h2 className={`hidden sm:block text-xl font-bold ${categoryTextColors.basico}`}>{t('sections.basic')}</h2>
                    <Link
                      href="/categoria/basico"
                      className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200`}
                    >
                      <span>Ver todos</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {(() => {
                const visitedCount = BASIC_SECTIONS.filter(s => isVisited(s)).length;
                const percentage = (visitedCount / BASIC_SECTIONS.length) * 100;
                return (
                  <div className="flex items-center gap-1.5 sm:gap-4 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full shadow-sm"></div>
                      <span className={`text-xs sm:text-sm font-semibold ${categoryTextColors.basico}`}>{visitedCount}/{BASIC_SECTIONS.length}</span>
                    </div>
                    <div className="w-12 sm:w-22 bg-gray-200 rounded-full h-1.5 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-sky-500 to-blue-600 h-1.5 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className={`sm:hidden text-xs font-semibold ${categoryTextColors.basico}`}>{visitedCount}/{BASIC_SECTIONS.length}</span>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
        {layout === "grid" ? (
          <ul className="columns-1 sm:columns-2 lg:columns-3 gap-3">
            {filteredBasicSections.map((s) => (
              <li key={s} className="break-inside-avoid mb-3">
                <SectionCard
                  section={s}
                  onClick={() => handleSectionClick(s)}
                  isVisited={isVisited(s)}
                  onToggleStudied={(e) => toggleStudiedStatus(s, e)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-1">
              {filteredBasicSections.map((s) => (
                <SectionListItem
                  key={s}
                  section={s}
                  onClick={() => handleSectionClick(s)}
                  isVisited={isVisited(s)}
                  onToggleStudied={(e) => toggleStudiedStatus(s, e)}
                />
              ))}
            </ul>
          </div>
        )}
      </section>
      )}

      {/* Intermediário */}
      {(filteredIntermediateSections.length > 0 || !searchTerm.trim()) && (
      <section className="mb-12">
        <div className={`${layout === "list" ? "max-w-2xl mx-auto" : ""}`}>
          <div className={`rounded-xl border-2 ${categoryHeaderColors.intermediario} px-3 sm:px-5 py-2 sm:py-3 mb-4 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden`}>
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-amber-100/30 opacity-50 pointer-events-none"></div>
            
            <div className="flex items-center justify-between gap-2 sm:gap-3 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {/* Icon */}
                <div className="w-8 h-8 sm:w-11 sm:h-11 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                    {/* Mobile: título como link */}
                    <Link
                      href="/categoria/intermediario"
                      className={`sm:hidden text-base font-bold ${categoryTextColors.intermediario} hover:opacity-80 transition-opacity truncate`}
                    >
                      {t('sections.intermediate')}
                    </Link>
                    {/* Desktop: título normal + botão */}
                    <h2 className={`hidden sm:block text-xl font-bold ${categoryTextColors.intermediario}`}>{t('sections.intermediate')}</h2>
                    <Link
                      href="/categoria/intermediario"
                      className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200`}
                    >
                      <span>Ver todos</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {(() => {
                const visitedCount = INTERMEDIATE_SECTIONS.filter(s => isVisited(s)).length;
                const percentage = (visitedCount / INTERMEDIATE_SECTIONS.length) * 100;
                return (
                  <div className="flex items-center gap-1.5 sm:gap-4 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full shadow-sm"></div>
                      <span className={`text-xs sm:text-sm font-semibold ${categoryTextColors.intermediario}`}>{visitedCount}/{INTERMEDIATE_SECTIONS.length}</span>
                    </div>
                    <div className="w-12 sm:w-22 bg-gray-200 rounded-full h-1.5 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-amber-600 h-1.5 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className={`sm:hidden text-xs font-semibold ${categoryTextColors.intermediario}`}>{visitedCount}/{INTERMEDIATE_SECTIONS.length}</span>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
        {layout === "grid" ? (
          <ul className="columns-1 sm:columns-2 lg:columns-3 gap-3">
            {filteredIntermediateSections.map((s) => (
              <li key={s} className="break-inside-avoid mb-3">
                <SectionCard
                  section={s}
                  onClick={() => handleSectionClick(s)}
                  isVisited={isVisited(s)}
                  onToggleStudied={(e) => toggleStudiedStatus(s, e)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-1">
              {filteredIntermediateSections.map((s) => (
                <SectionListItem
                  key={s}
                  section={s}
                  onClick={() => handleSectionClick(s)}
                  isVisited={isVisited(s)}
                  onToggleStudied={(e) => toggleStudiedStatus(s, e)}
                />
              ))}
            </ul>
          </div>
        )}
      </section>
      )}

      {/* Avançado */}
      {(filteredAdvancedSections.length > 0 || !searchTerm.trim()) && (
      <section className="mb-12">
        <div className={`${layout === "list" ? "max-w-2xl mx-auto" : ""}`}>
          <div className={`rounded-xl border-2 ${categoryHeaderColors.avancado} px-3 sm:px-5 py-2 sm:py-3 mb-4 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden`}>
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-rose-100/30 opacity-50 pointer-events-none"></div>
            
            <div className="flex items-center justify-between gap-2 sm:gap-3 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {/* Icon */}
                <div className="w-8 h-8 sm:w-11 sm:h-11 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                    {/* Mobile: título como link */}
                    <Link
                      href="/categoria/avancado"
                      className={`sm:hidden text-base font-bold ${categoryTextColors.avancado} hover:opacity-80 transition-opacity truncate`}
                    >
                      {t('sections.advanced')}
                    </Link>
                    {/* Desktop: título normal + botão */}
                    <h2 className={`hidden sm:block text-xl font-bold ${categoryTextColors.avancado}`}>{t('sections.advanced')}</h2>
                    <Link
                      href="/categoria/avancado"
                      className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200`}
                    >
                      <span>Ver todos</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {(() => {
                const visitedCount = ADVANCED_SECTIONS.filter(s => isVisited(s)).length;
                const percentage = (visitedCount / ADVANCED_SECTIONS.length) * 100;
                return (
                  <div className="flex items-center gap-1.5 sm:gap-4 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-gradient-to-br from-red-500 to-rose-600 rounded-full shadow-sm"></div>
                      <span className={`text-xs sm:text-sm font-semibold ${categoryTextColors.avancado}`}>{visitedCount}/{ADVANCED_SECTIONS.length}</span>
                    </div>
                    <div className="w-12 sm:w-22 bg-gray-200 rounded-full h-1.5 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-red-500 to-rose-600 h-1.5 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className={`sm:hidden text-xs font-semibold ${categoryTextColors.avancado}`}>{visitedCount}/{ADVANCED_SECTIONS.length}</span>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
        {layout === "grid" ? (
          <ul className="columns-1 sm:columns-2 lg:columns-3 gap-3">
            {filteredAdvancedSections.map((s) => (
              <li key={s} className="break-inside-avoid mb-3">
                <SectionCard
                  section={s}
                  onClick={() => handleSectionClick(s)}
                  isVisited={isVisited(s)}
                  onToggleStudied={(e) => toggleStudiedStatus(s, e)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-1">
              {filteredAdvancedSections.map((s) => (
                <SectionListItem
                  key={s}
                  section={s}
                  onClick={() => handleSectionClick(s)}
                  isVisited={isVisited(s)}
                  onToggleStudied={(e) => toggleStudiedStatus(s, e)}
                />
              ))}
            </ul>
          </div>
        )}
      </section>
      )}

      {/* Táticas */}
      {(filteredTacticsSections.length > 0 || !searchTerm.trim()) && (
      <section className="mb-12">
        <div className={`${layout === "list" ? "max-w-2xl mx-auto" : ""}`}>
          <div className={`rounded-xl border-2 ${categoryHeaderColors.taticas} px-3 sm:px-5 py-2 sm:py-3 mb-4 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden`}>
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-violet-100/30 opacity-50 pointer-events-none"></div>
            
            <div className="flex items-center justify-between gap-2 sm:gap-3 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {/* Icon */}
                <div className="w-8 h-8 sm:w-11 sm:h-11 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                    {/* Mobile: título como link */}
                    <Link
                      href="/categoria/taticas"
                      className={`sm:hidden text-base font-bold ${categoryTextColors.taticas} hover:opacity-80 transition-opacity truncate`}
                    >
                      {t('sections.tactics')}
                    </Link>
                    {/* Desktop: título normal + botão */}
                    <h2 className={`hidden sm:block text-xl font-bold ${categoryTextColors.taticas}`}>{t('sections.tactics')}</h2>
                    <Link
                      href="/categoria/taticas"
                      className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200`}
                    >
                      <span>Ver todos</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              {(() => {
                const visitedCount = TACTICS_SECTIONS.filter(s => isVisited(s)).length;
                const percentage = (visitedCount / TACTICS_SECTIONS.length) * 100;
                return (
                  <div className="flex items-center gap-1.5 sm:gap-4 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full shadow-sm"></div>
                      <span className={`text-xs sm:text-sm font-semibold ${categoryTextColors.taticas}`}>{visitedCount}/{TACTICS_SECTIONS.length}</span>
                    </div>
                    <div className="w-12 sm:w-22 bg-gray-200 rounded-full h-1.5 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-violet-600 h-1.5 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className={`sm:hidden text-xs font-semibold ${categoryTextColors.taticas}`}>{visitedCount}/{TACTICS_SECTIONS.length}</span>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
        {layout === "grid" ? (
          <ul className="columns-1 sm:columns-2 lg:columns-3 gap-3">
            {filteredTacticsSections.map((s) => (
              <li key={s} className="break-inside-avoid mb-3">
                <SectionCard
                  section={s}
                  onClick={() => handleSectionClick(s)}
                  isVisited={isVisited(s)}
                  onToggleStudied={(e) => toggleStudiedStatus(s, e)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-1">
              {filteredTacticsSections.map((s) => (
                <SectionListItem
                  key={s}
                  section={s}
                  onClick={() => handleSectionClick(s)}
                  isVisited={isVisited(s)}
                  onToggleStudied={(e) => toggleStudiedStatus(s, e)}
                />
              ))}
            </ul>
          </div>
        )}
      </section>
      )}

      {/* Theme Selector Section */}
      {/* <section className="mb-10">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm w-full sm:w-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Criar Seleção
            </Link>
          </div>
        </div>
      </section> */}

    </main>
  );
}