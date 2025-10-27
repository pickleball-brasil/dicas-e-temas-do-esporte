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
  const [customTitle, setCustomTitle] = useState("");
  const [copied, setCopied] = useState(false);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);

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
    setCustomTitle("");
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar link:', err);
    }
  };

  const openSharedPage = () => {
    const link = generateShareLink();
    if (!link) return;
    
    window.open(link, '_blank');
  };

  return (
    <div>
      {/* Floating Menu - Only shows when themes are selected */}

      <main className="py-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Seletor de Temas Personalizado
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Crie sua coleção personalizada de temas de pickleball e compartilhe com outros jogadores.
          </p>
        </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">


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
      </main>

      {/* Floating Action Menu */}
      {selectedSections.size > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Menu Expandido */}
          {showFloatingMenu && (
            <div className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              {/* Header */}
              <div className="bg-gradient-to-r from-sky-500 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg">
                      {selectedSections.size}
                    </div>
                    <div>
                      <p className="text-white font-semibold">Temas Selecionados</p>
                      <p className="text-white/80 text-sm">{selectedSections.size} de {allSections.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Title Input */}
                <div>
                  <label htmlFor="floatingTitle" className="block text-xs font-medium text-gray-700 mb-2">
                    Título personalizado (opcional)
                  </label>
                  <input
                    id="floatingTitle"
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Ex: Minha Seleção"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all text-sm text-gray-900 placeholder:text-gray-400"
                    maxLength={50}
                  />
                  {customTitle.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1 text-right">{customTitle.length}/50</p>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      copyToClipboard();
                    }}
                    className={`w-full px-4 py-3 ${copied ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm`}
                  >
                    {copied ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Link Copiado!
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copiar Link
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      openSharedPage();
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-700 hover:to-sky-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Abrir Página Compartilhada
                  </button>

                  <button
                    onClick={() => {
                      selectNone();
                      setShowFloatingMenu(false);
                    }}
                    className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Limpar Seleção
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main FAB Button */}
          <button
            onClick={() => setShowFloatingMenu(!showFloatingMenu)}
            className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center ${
              showFloatingMenu ? 'rotate-45' : ''
            }`}
          >
            {showFloatingMenu ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          </button>

          {/* Badge */}
          <div className="absolute -top-2 -left-2 bg-white rounded-full px-3 py-1.5 shadow-lg border border-gray-200">
            <span className="text-sm font-bold text-gray-900">{selectedSections.size}</span>
          </div>
        </div>
      )}
    </div>
  );
}