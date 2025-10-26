"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  CONTENT_REGISTRY, 
  getSectionsByCategory, 
  getSectionColors,
  getDisplayNames,
  getSectionIds,
  type SectionConfig 
} from "@/lib/contentRegistry";

// Usar cores do sistema centralizado
const sectionColors = getSectionColors();

// Usar nomes de exibição do sistema centralizado
const displayNames = getDisplayNames();

// Obter seções por categoria do sistema centralizado
const basicSections = getSectionsByCategory('basico');
const intermediateSections = getSectionsByCategory('intermediario');
const advancedSections = getSectionsByCategory('avancado');
const tacticsSections = getSectionsByCategory('taticas');

// Obter todas as seções
const allSections = Object.keys(CONTENT_REGISTRY);

// Obter IDs das seções
const sectionIds = getSectionIds();

// Componente para cartão de seção
function SectionCard({ sectionId, isSelected, onToggle }: { 
  sectionId: string; 
  isSelected: boolean; 
  onToggle: () => void; 
}) {
  const config = CONTENT_REGISTRY[sectionId];
  if (!config) return null;

  const displayName = displayNames[sectionId] || config.name;
  const color = sectionColors[sectionId] || 'bg-gradient-to-br from-gray-500 to-gray-600';

  return (
    <li>
      <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md bg-white cursor-pointer">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${color}`}>
          {config.level === 'Básico' ? '1' : 
           config.level === 'Intermediário' ? '2' : 
           config.level === 'Avançado' ? '3' : '4'}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">{displayName}</h3>
          <p className="text-gray-600 text-xs mt-1">{config.description}</p>
        </div>
      </label>
    </li>
  );
}

export default function ThemeSelector() {
  const [selectedSections, setSelectedSections] = useState<Set<string>>(new Set());
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [customTitle, setCustomTitle] = useState("");

  const toggleSection = (sectionId: string) => {
    const newSelected = new Set(selectedSections);
    if (newSelected.has(sectionId)) {
      newSelected.delete(sectionId);
    } else {
      newSelected.add(sectionId);
    }
    setSelectedSections(newSelected);
  };

  const selectNone = () => {
    setSelectedSections(new Set());
  };

  const generateShareLink = () => {
    if (selectedSections.size === 0) return null;
    
    // Converter seções selecionadas para IDs únicos
    const selectedIds = Array.from(selectedSections)
      .map(sectionId => sectionIds[sectionId])
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
    if (!link) return;
    
    try {
      await navigator.clipboard.writeText(link);
      alert('Link copiado para a área de transferência!');
    } catch (err) {
      console.error('Erro ao copiar link:', err);
      alert('Erro ao copiar link. Tente novamente.');
    }
  };

  const openSharedPage = () => {
    const link = generateShareLink();
    if (!link) return;
    
    window.open(link, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sticky Controls Bar - Only show when themes are selected */}
      {selectedSections.size > 0 && (
        <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left side - Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={selectNone}
                className="px-3 py-1.5 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600 transition-colors"
              >
                Limpar
              </button>
              {selectedSections.size > 0 && (
                <>
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors"
                  >
                    Copiar Link
                  </button>
                  <button
                    onClick={openSharedPage}
                    className="px-3 py-1.5 bg-purple-500 text-white text-sm rounded-md hover:bg-purple-600 transition-colors"
                  >
                    Abrir Página
                  </button>
                </>
              )}
            </div>

            {/* Right side - Title Input */}
            {selectedSections.size > 0 && (
              <div className="flex items-center gap-2">
                <label htmlFor="customTitle" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Título:
                </label>
                <input
                  id="customTitle"
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Ex: Meus Temas Favoritos"
                  className="px-2 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500 text-sm min-w-[200px] max-w-[300px]"
                  maxLength={50}
                />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {customTitle.length}/50
                </span>
              </div>
            )}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight mb-3 flex items-center justify-center gap-3">
              <span className="text-4xl">🎯</span>
              <span className="bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
                Seletor de Temas Personalizado
              </span>
            </h1>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Crie sua coleção personalizada de temas de pickleball e compartilhe com outros jogadores.
            </p>
          </div>


          {/* Basic Sections */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-700 font-bold text-sm">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Básico</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {basicSections.filter(s => selectedSections.has(s)).length}/{basicSections.length} selecionados
                </span>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {basicSections.map((s) => (
                <SectionCard 
                  key={s}
                  sectionId={s} 
                  isSelected={selectedSections.has(s)}
                  onToggle={() => toggleSection(s)} 
                />
              ))}
            </ul>
          </section>

          {/* Intermediate Sections */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-700 font-bold text-sm">
                  2
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Intermediário</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {intermediateSections.filter(s => selectedSections.has(s)).length}/{intermediateSections.length} selecionados
                </span>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {intermediateSections.map((s) => (
                <SectionCard 
                  key={s}
                  sectionId={s} 
                  isSelected={selectedSections.has(s)}
                  onToggle={() => toggleSection(s)} 
                />
              ))}
            </ul>
          </section>

          {/* Advanced Sections */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-700 font-bold text-sm">
                  3
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Avançado</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {advancedSections.filter(s => selectedSections.has(s)).length}/{advancedSections.length} selecionados
                </span>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {advancedSections.map((s) => (
                <SectionCard 
                  key={s}
                  sectionId={s} 
                  isSelected={selectedSections.has(s)}
                  onToggle={() => toggleSection(s)} 
                />
              ))}
            </ul>
          </section>

          {/* Tactics Sections */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-bold text-sm">
                  4
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Táticas</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {tacticsSections.filter(s => selectedSections.has(s)).length}/{tacticsSections.length} selecionados
                </span>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tacticsSections.map((s) => (
                <SectionCard 
                  key={s}
                  sectionId={s} 
                  isSelected={selectedSections.has(s)}
                  onToggle={() => toggleSection(s)} 
                />
              ))}
            </ul>
          </section>
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