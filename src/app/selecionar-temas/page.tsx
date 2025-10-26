"use client";
import { useState } from "react";
import Link from "next/link";
import { BASIC_SECTIONS, INTERMEDIATE_SECTIONS, ADVANCED_SECTIONS, TACTICS_SECTIONS, SECTIONS, SECTION_IDS, type Section } from "@/lib/sections";
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
  "selecao-de-golpes-avancada": "bg-gradient-to-br from-red-500 to-rose-600",
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

const SectionCard = ({ section, isSelected, onToggle }: { 
  section: Section; 
  isSelected: boolean; 
  onToggle: (section: Section) => void;
}) => (
  <button
    onClick={() => onToggle(section)}
    className={`card block p-4 group hover:scale-[1.02] active:scale-100 transition-all duration-300 w-full text-left ${
      isSelected 
        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-blue-100' 
        : 'hover:shadow-md'
    }`}
  >
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`section-icon ${sectionColors[section]} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 relative ${
            isSelected ? 'ring-2 ring-blue-300 ring-offset-2' : ''
          }`}>
            {section.charAt(0)}
            {isSelected && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className={`font-semibold text-sm ${
              isSelected 
                ? 'text-blue-800' 
                : 'text-gray-900'
            }`}>{getDisplayName(section)}</span>
            <span className={`text-xs ${
              isSelected 
                ? 'text-blue-600' 
                : 'text-gray-500'
            }`}>
              {isSelected ? '✓ Selecionado' : 'Clique para selecionar'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(section)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>
      </div>
    </div>
  </button>
);

const LevelSection = ({ 
  title, 
  sections, 
  selectedSections, 
  onToggle 
}: { 
  title: string; 
  sections: readonly Section[]; 
  selectedSections: Set<Section>; 
  onToggle: (section: Section) => void;
}) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sections.map((section) => (
        <SectionCard
          key={section}
          section={section}
          isSelected={selectedSections.has(section)}
          onToggle={onToggle}
        />
      ))}
    </div>
  </div>
);

export default function ThemeSelector() {
  const [selectedSections, setSelectedSections] = useState<Set<Section>>(new Set());
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [customTitle, setCustomTitle] = useState("");

  const toggleSection = (section: Section) => {
    const newSelected = new Set(selectedSections);
    if (newSelected.has(section)) {
      newSelected.delete(section);
    } else {
      newSelected.add(section);
    }
    setSelectedSections(newSelected);
  };

  const selectAll = () => {
    setSelectedSections(new Set(SECTIONS));
  };

  const selectNone = () => {
    setSelectedSections(new Set());
  };

  const generateShareLink = () => {
    if (selectedSections.size === 0) return null;
    
    // Converter seções selecionadas para IDs únicos
    const selectedIds = Array.from(selectedSections)
      .map(section => SECTION_IDS[section])
      .filter(id => id !== undefined) // Filtrar IDs válidos
      .sort(); // Ordenar alfabeticamente para consistência
    
    // Converter para string compacta (ex: "basic_001,inter_003,adv_005")
    const idsString = selectedIds.join(',');
    
    // Adicionar título se fornecido
    const titleParam = customTitle.trim() ? `&t=${encodeURIComponent(customTitle.trim())}` : '';
    
    return `${window.location.origin}/dicas-e-temas-do-esporte/compartilhar?s=${idsString}${titleParam}`;
  };

  const copyToClipboard = async () => {
    const link = generateShareLink();
    if (link) {
      try {
        await navigator.clipboard.writeText(link);
        alert('Link copiado para a área de transferência!');
      } catch (err) {
        console.error('Erro ao copiar:', err);
        alert('Erro ao copiar o link. Tente novamente.');
      }
    }
  };

  const openSharedPage = () => {
    const link = generateShareLink();
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Seletor de Temas
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Selecione os temas que deseja incluir e compartilhe um link personalizado
            </p>
            
            {/* Controls */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <button
                onClick={selectAll}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Selecionar Todos
              </button>
              <button
                onClick={selectNone}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Limpar Seleção
              </button>
              <button
                onClick={copyToClipboard}
                disabled={selectedSections.size === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Copiar Link
              </button>
              <button
                onClick={openSharedPage}
                disabled={selectedSections.size === 0}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Abrir Página Compartilhada
              </button>
            </div>

            {/* Custom Title Input */}
            {selectedSections.size > 0 && (
              <div className="bg-white rounded-lg p-4 shadow-md mb-6 max-w-md mx-auto">
                <label htmlFor="customTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Título Personalizado (Opcional)
                </label>
                <input
                  id="customTitle"
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Ex: Meus Temas Favoritos de Pickleball"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {customTitle.length}/50 caracteres
                </p>
              </div>
            )}

            {/* Selection Summary */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <p className="text-gray-700">
                <strong>{selectedSections.size}</strong> de <strong>{SECTIONS.length}</strong> temas selecionados
              </p>
              {selectedSections.size > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Link gerado: {generateShareLink()?.substring(0, 50)}...
                </p>
              )}
            </div>
          </div>

          {/* Sections by Level */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <LevelSection
              title="🟢 Nível Básico"
              sections={BASIC_SECTIONS}
              selectedSections={selectedSections}
              onToggle={toggleSection}
            />
            
            <LevelSection
              title="🟡 Nível Intermediário"
              sections={INTERMEDIATE_SECTIONS}
              selectedSections={selectedSections}
              onToggle={toggleSection}
            />
            
            <LevelSection
              title="🔴 Nível Avançado"
              sections={ADVANCED_SECTIONS}
              selectedSections={selectedSections}
              onToggle={toggleSection}
            />
            
            <LevelSection
              title="🟣 Táticas"
              sections={TACTICS_SECTIONS}
              selectedSections={selectedSections}
              onToggle={toggleSection}
            />
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Voltar ao Início
            </Link>
          </div>
        </div>
      </div>

      {/* Botão flutuante */}
      {selectedSections.size > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex flex-col items-center gap-3">
            {/* Botão principal com menu dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </button>
              
              {/* Menu dropdown */}
              {showMobileMenu && (
                <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px]">
                  <button
                    onClick={() => {
                      copyToClipboard();
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                  >
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copiar Link
                  </button>
                  <button
                    onClick={() => {
                      openSharedPage();
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                  >
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Abrir Página
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="w-full px-4 py-2 text-center text-gray-500 hover:bg-gray-50 text-sm"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </div>
            
            {/* Indicador de quantidade */}
            <div className="bg-white rounded-full px-3 py-1 shadow-md border border-gray-200">
              <span className="text-xs font-medium text-gray-600">
                {selectedSections.size} tema{selectedSections.size !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
