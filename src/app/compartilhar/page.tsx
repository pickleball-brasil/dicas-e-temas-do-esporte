"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BASIC_SECTIONS, INTERMEDIATE_SECTIONS, ADVANCED_SECTIONS, TACTICS_SECTIONS, SECTIONS, ID_TO_SECTION, type Section } from "@/lib/sections";
import { useLanguageContext } from '@/contexts/LanguageContext';
import { getDisplayName } from '@/lib/displayNames';

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
  "golpes-fundamentais": "bg-gradient-to-br from-emerald-500 to-green-600",
  "tecnica-de-base": "bg-gradient-to-br from-emerald-500 to-emerald-600",
  "concentracao": "bg-gradient-to-br from-green-400 to-emerald-500",
  "respiracao": "bg-gradient-to-br from-green-500 to-emerald-600",
  "etiqueta-em-quadra": "bg-gradient-to-br from-green-500 to-emerald-600",
  "selecao-de-golpes": "bg-gradient-to-br from-amber-400 to-orange-500",
  "lidar-com-bangers": "bg-gradient-to-br from-orange-500 to-amber-600",
  "variacoes-de-saque-intermediario": "bg-gradient-to-br from-amber-500 to-orange-600",
  "tipos-de-voleios-pickleball": "bg-gradient-to-br from-orange-400 to-amber-500",
  "tipos-de-dink-pickleball": "bg-gradient-to-br from-amber-400 to-orange-600",
  "mecanicas-fundamentais": "bg-gradient-to-br from-amber-500 to-orange-600",
  "tecnicas-de-decepcao-engano": "bg-gradient-to-br from-rose-400 to-red-500",
  "recuperacao-e-cobertura-quadra-avancada": "bg-gradient-to-br from-red-500 to-rose-600",
  "quimica-e-sinergia-duplas-avancadas": "bg-gradient-to-br from-rose-500 to-red-600",
  "selecao-de-golpes-avancada": "bg-gradient-to-br from-red-500 to-rose-600",
  "transicao-defesa-ataque": "bg-gradient-to-br from-purple-400 to-indigo-500",
  "gerenciamento-momentum-timeouts": "bg-gradient-to-br from-indigo-500 to-purple-600",
  
  // Intermediário - LARANJA
  "drop-shot": "bg-gradient-to-br from-amber-400 to-orange-600",
  "terceira-bola": "bg-gradient-to-br from-amber-500 to-orange-600",
  "quarta-bola": "bg-gradient-to-br from-orange-500 to-amber-600",
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
  "consistencia": "bg-gradient-to-br from-amber-400 to-orange-600",
  
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

const SectionCard = ({ section, onClick }: { 
  section: Section; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="card block p-4 group hover:scale-[1.02] active:scale-100 transition-all duration-300 w-full text-left hover:shadow-md"
  >
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`section-icon ${sectionColors[section]} text-white shadow-md group-hover:shadow-lg group-hover:scale-110`}>
            {getDisplayName(section).charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-900">
              {getDisplayName(section)}
            </span>
            <span className="text-xs text-gray-500">
              Clique para estudar
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </button>
);

function SharedThemesContent() {
  const { t } = useLanguageContext();
  const searchParams = useSearchParams();
  const [selectedSections, setSelectedSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [customTitle, setCustomTitle] = useState("");

  useEffect(() => {
    const sectionsParam = searchParams.get('s');
    const indicesParam = searchParams.get('i'); // Manter compatibilidade com formato antigo
    const titleParam = searchParams.get('t');
    
    // Priorizar novo formato com IDs únicos
    if (sectionsParam) {
      try {
        // Decodificar IDs únicos (formato novo)
        const ids = sectionsParam.split(',');
        const validSections = ids
          .map(id => ID_TO_SECTION[id])
          .filter((section): section is Section => section !== undefined && SECTIONS.includes(section as Section));
        setSelectedSections(validSections);
      } catch (error) {
        console.error('Erro ao decodificar IDs únicos:', error);
        setSelectedSections([]);
      }
    } else if (indicesParam) {
      // Fallback para formato antigo (compatibilidade)
      try {
        const indices = indicesParam.split(',').map(Number);
        const validSections = indices
          .filter(index => index >= 0 && index < SECTIONS.length)
          .map(index => SECTIONS[index])
          .filter(section => section !== undefined);
        setSelectedSections(validSections);
      } catch (error) {
        console.error('Erro ao decodificar índices:', error);
        setSelectedSections([]);
      }
    }
    
    // Decodificar título personalizado se fornecido
    if (titleParam) {
      setCustomTitle(decodeURIComponent(titleParam));
    }
    
    setIsLoading(false);
  }, [searchParams]);

  // Atualizar título do documento e meta tags quando customTitle mudar
  useEffect(() => {
    if (customTitle) {
      // Atualizar título
      document.title = `${customTitle} - Estudos Pickleball`;
      
      // Helper para atualizar ou criar meta tag
      const updateOrCreateMeta = (nameOrProperty: string, value: string, isProperty: boolean = false) => {
        const selector = isProperty 
          ? `meta[property="${nameOrProperty}"]` 
          : `meta[name="${nameOrProperty}"]`;
        let meta = document.querySelector(selector);
        
        if (!meta) {
          meta = document.createElement('meta');
          if (isProperty) {
            meta.setAttribute('property', nameOrProperty);
          } else {
            meta.setAttribute('name', nameOrProperty);
          }
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', value);
      };
      
      // Atualizar meta description
      updateOrCreateMeta('description', `Coleção personalizada de estudos sobre ${customTitle} criado por Fabrício Ziliotti`);
      
      // Atualizar Open Graph tags
      updateOrCreateMeta('og:title', `${customTitle} - Estudos Pickleball`, true);
      updateOrCreateMeta('og:description', `Coleção personalizada de estudos sobre ${customTitle} criado por Fabrício Ziliotti`, true);
      updateOrCreateMeta('og:type', 'website', true);
      updateOrCreateMeta('og:url', window.location.href, true);
      
      // Twitter tags
      updateOrCreateMeta('twitter:title', `${customTitle} - Estudos Pickleball`, true);
      updateOrCreateMeta('twitter:description', `Coleção personalizada de estudos sobre ${customTitle} criado por Fabrício Ziliotti`, true);
      updateOrCreateMeta('twitter:card', 'summary', true);
    } else {
      document.title = "Temas Compartilhados - Estudos Pickleball";
    }
  }, [customTitle, selectedSections.length]);

  const handleSectionClick = (section: Section) => {
    window.location.href = `/dicas-e-temas-do-esporte/estudo/${section}`;
  };

  // Organizar seções por nível
  const basicSections = selectedSections.filter(s => (BASIC_SECTIONS as readonly string[]).includes(s));
  const intermediateSections = selectedSections.filter(s => (INTERMEDIATE_SECTIONS as readonly string[]).includes(s));
  const advancedSections = selectedSections.filter(s => (ADVANCED_SECTIONS as readonly string[]).includes(s));
  const tacticsSections = selectedSections.filter(s => (TACTICS_SECTIONS as readonly string[]).includes(s));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando temas...</p>
        </div>
      </div>
    );
  }

  if (selectedSections.length === 0) {
    return (
      <main className="py-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Nenhum Tema Encontrado
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            O link compartilhado não contém temas válidos ou está corrompido.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Ir para Início
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="py-4">
      <div className="mb-8">
        <div className="mb-3">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {customTitle || "Temas Compartilhados"}
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                Coleção personalizada: {selectedSections.length} tema{selectedSections.length !== 1 ? 's' : ''} selecionado{selectedSections.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex-1 max-w-xs">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(selectedSections.length / SECTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
    
      </div>

      {/* Básico */}
      {basicSections.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-700 font-bold text-sm">
                1
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t('sections.basic')}</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-gray-600">{basicSections.length}</span>
              </div>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {basicSections.map((s) => (
              <li key={s}>
                <SectionCard 
                  section={s} 
                  onClick={() => handleSectionClick(s)} 
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Intermediário */}
      {intermediateSections.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-700 font-bold text-sm">
                2
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t('sections.intermediate')}</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs font-medium text-gray-600">{intermediateSections.length}</span>
              </div>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {intermediateSections.map((s) => (
              <li key={s}>
                <SectionCard 
                  section={s} 
                  onClick={() => handleSectionClick(s)} 
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Avançado */}
      {advancedSections.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-700 font-bold text-sm">
                3
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t('sections.advanced')}</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs font-medium text-gray-600">{advancedSections.length}</span>
              </div>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {advancedSections.map((s) => (
              <li key={s}>
                <SectionCard 
                  section={s} 
                  onClick={() => handleSectionClick(s)} 
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Táticas */}
      {tacticsSections.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-bold text-sm">
                4
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t('sections.tactics')}</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs font-medium text-gray-600">{tacticsSections.length}</span>
              </div>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tacticsSections.map((s) => (
              <li key={s}>
                <SectionCard 
                  section={s} 
                  onClick={() => handleSectionClick(s)} 
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Theme Selector Section */}
      <section className="mb-10">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-1">
                🎯 Criar Minha Própria Seleção
              </h2>
              <p className="text-blue-100 text-sm">
                Personalize sua coleção de estudos e compartilhe com outros jogadores
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
      </section>
    </main>
  );
}

export default function SharedThemes() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando temas...</p>
        </div>
      </div>
    }>
      <SharedThemesContent />
    </Suspense>
  );
}