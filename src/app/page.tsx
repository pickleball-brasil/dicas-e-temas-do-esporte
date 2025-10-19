"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASIC_SECTIONS, INTERMEDIATE_SECTIONS, ADVANCED_SECTIONS, TACTICS_SECTIONS, type Section } from "@/lib/sections";
import Modal from "@/components/Modal";
import SectionModal from "@/components/SectionModal";
import { useReadingProgressContext } from "@/contexts/ReadingProgressContext";
import { useAppModeContext } from "@/contexts/AppModeContext";
import { useLanguageContext } from '@/contexts/LanguageContext';

const sectionColors: Record<string, string> = {
  // Básico - VERDE
  "Regras": "bg-gradient-to-br from-green-400 to-green-600",
  "Saque": "bg-gradient-to-br from-emerald-400 to-emerald-600",
  "Devolução": "bg-gradient-to-br from-green-500 to-emerald-600",
  "Dink": "bg-gradient-to-br from-emerald-500 to-green-600",
  "Voleio": "bg-gradient-to-br from-green-400 to-emerald-500",
  "Footwork": "bg-gradient-to-br from-emerald-400 to-green-500",
  "Posicionamento": "bg-gradient-to-br from-green-500 to-green-600",
  "Empunhadura": "bg-gradient-to-br from-emerald-500 to-emerald-600",
  "Aquecimento": "bg-gradient-to-br from-green-400 to-green-500",
  "Erros Comuns": "bg-gradient-to-br from-emerald-400 to-emerald-500",
  "Dicas": "bg-gradient-to-br from-green-500 to-emerald-500",
  "Equipamentos": "bg-gradient-to-br from-emerald-400 to-green-600",
  "Golpes Fundamentais": "bg-gradient-to-br from-green-400 to-green-600",
  "Técnica de Base": "bg-gradient-to-br from-emerald-400 to-emerald-600",
  "Concentração": "bg-gradient-to-br from-green-500 to-emerald-600",
  "Respiração": "bg-gradient-to-br from-emerald-500 to-green-600",
  
  // Intermediário - LARANJA
  "Drop Shot": "bg-gradient-to-br from-orange-400 to-orange-600",
  "Terceira bola": "bg-gradient-to-br from-amber-400 to-orange-600",
  "Lob": "bg-gradient-to-br from-orange-500 to-amber-600",
  "Transição": "bg-gradient-to-br from-amber-400 to-amber-600",
  "Jogo de Duplas": "bg-gradient-to-br from-orange-400 to-amber-500",
  "Defesa": "bg-gradient-to-br from-amber-500 to-orange-600",
  "Bloqueio": "bg-gradient-to-br from-orange-500 to-orange-600",
  "Spin": "bg-gradient-to-br from-amber-400 to-orange-500",
  "Contra-ataque": "bg-gradient-to-br from-orange-400 to-orange-500",
  "Comunicação": "bg-gradient-to-br from-amber-500 to-amber-600",
  "Drills e Treinos": "bg-gradient-to-br from-orange-500 to-amber-500",
  "Preparação Física": "bg-gradient-to-br from-amber-400 to-amber-500",
  "Estratégia de Jogo": "bg-gradient-to-br from-orange-400 to-amber-600",
  "Tempo de Reação": "bg-gradient-to-br from-orange-400 to-orange-600",
  "Antecipação": "bg-gradient-to-br from-amber-400 to-orange-600",
  "Leitura de Jogo": "bg-gradient-to-br from-orange-500 to-amber-600",
  "Adaptação": "bg-gradient-to-br from-amber-400 to-amber-600",
  "Consistência": "bg-gradient-to-br from-orange-400 to-amber-500",
  
  // Avançado - VERMELHO
  "Smash": "bg-gradient-to-br from-red-400 to-red-600",
  "Acelerar as bolas": "bg-gradient-to-br from-rose-400 to-red-600",
  "Reset": "bg-gradient-to-br from-red-500 to-rose-600",
  "Ataque": "bg-gradient-to-br from-rose-400 to-rose-600",
  "Mental Game": "bg-gradient-to-br from-red-400 to-rose-500",
  "Erne": "bg-gradient-to-br from-rose-500 to-red-600",
  "ATP (Around The Post)": "bg-gradient-to-br from-red-400 to-red-500",
  "Stacking": "bg-gradient-to-br from-rose-400 to-red-500",
  "Switching": "bg-gradient-to-br from-red-500 to-red-600",
  "Poaching": "bg-gradient-to-br from-rose-500 to-rose-600",
  "Finalizações": "bg-gradient-to-br from-red-500 to-rose-500",
  "Jogo Singles": "bg-gradient-to-br from-rose-400 to-rose-500",
  "Torneios": "bg-gradient-to-br from-red-400 to-rose-600",
  "Golpes Especiais": "bg-gradient-to-br from-red-400 to-red-600",
  "Técnicas Avançadas": "bg-gradient-to-br from-rose-400 to-red-600",
  "Pressão Mental": "bg-gradient-to-br from-red-500 to-rose-600",
  "Execução Sob Pressão": "bg-gradient-to-br from-rose-400 to-rose-600",
  "Liderança em Quadra": "bg-gradient-to-br from-red-400 to-rose-500",

  // Táticas - ROXO
  "Controle de Ritmo": "bg-gradient-to-br from-purple-400 to-purple-600",
  "Jogo no Meio": "bg-gradient-to-br from-violet-400 to-purple-600",
  "Explorar Fraquezas": "bg-gradient-to-br from-purple-500 to-violet-600",
  "Variação de Altura": "bg-gradient-to-br from-violet-400 to-violet-600",
  "Pressão Constante": "bg-gradient-to-br from-purple-400 to-violet-500",
  "Jogo Cruzado": "bg-gradient-to-br from-violet-500 to-purple-600",
  "Isolamento de Jogador": "bg-gradient-to-br from-purple-500 to-purple-600",
  "Mudança de Direção": "bg-gradient-to-br from-violet-400 to-purple-500",
  "Jogo de Paciência": "bg-gradient-to-br from-purple-400 to-purple-500",
  "Ataque ao Corpo": "bg-gradient-to-br from-violet-500 to-violet-600",
  "Uso do Lob Tático": "bg-gradient-to-br from-purple-500 to-violet-500",
  "Forçar Erros": "bg-gradient-to-br from-violet-400 to-violet-500",
  "Estratégias de Abertura": "bg-gradient-to-br from-purple-400 to-purple-600",
  "Controle de Ponto": "bg-gradient-to-br from-violet-400 to-purple-600",
  "Quebra de Ritmo": "bg-gradient-to-br from-purple-500 to-violet-600",
  "Exploração de Ângulos": "bg-gradient-to-br from-violet-400 to-violet-600",
  "Jogos Mentais": "bg-gradient-to-br from-purple-400 to-violet-500",
  "Adaptação Tática": "bg-gradient-to-br from-violet-500 to-purple-600",
};

const SectionCard = ({ section, onClick, progress, showProgress, t, getSectionName }: { section: Section; onClick: () => void; progress: { read: number; total: number; percentage: number }; showProgress: boolean; t: (key: string) => string; getSectionName: (section: string) => string }) => (
  <button
    onClick={onClick}
    className="card block p-4 group hover:scale-[1.02] active:scale-100 transition-transform duration-300 w-full text-left"
  >
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`section-icon ${sectionColors[section]} text-white shadow-md group-hover:shadow-lg group-hover:scale-110`}>
            {section.charAt(0)}
          </div>
                 <div className="flex flex-col">
                   <span className="font-semibold text-gray-900 text-sm">{getSectionName(section)}</span>
                   <span className="text-xs text-gray-500">
                     {showProgress && progress.total > 0 ? `${progress.read}/${progress.total} ${t('sections.tipsRead')}` : t('sections.viewResources')}
                   </span>
                 </div>
        </div>
        <svg className="w-4 h-4 text-gray-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      {showProgress && progress.total > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${sectionColors[section]} transition-all duration-500`}
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-gray-600 min-w-[32px] text-right">{progress.percentage}%</span>
        </div>
      )}
    </div>
  </button>
);

export default function Home() {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const { getSectionProgress } = useReadingProgressContext();
  const { isTrackingMode, isStudyMode } = useAppModeContext();
  const router = useRouter();
  const { t, getTips, getSectionName } = useLanguageContext();

  const handleSectionClick = (section: Section) => {
    if (isStudyMode) {
      router.push(`/estudo/${encodeURIComponent(section)}`);
    } else {
      setSelectedSection(section);
    }
  };

  return (
    <main className="py-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 tracking-tight bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
          {t('sections.title')}
        </h1>
        <p className="text-gray-600 text-lg">
          {isStudyMode 
            ? t('modes.studyDescription')
            : t('modes.trackingDescription')}
        </p>
      </div>

      {/* Básico */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 text-green-700 font-bold text-sm">
            1
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{t('sections.basic')}</h2>
          <span className="badge badge-primary text-xs">{t('sections.beginner')}</span>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BASIC_SECTIONS.map((s) => {
            const tips = getTips(s);
            const progress = getSectionProgress(s, tips.length);
            return (
              <li key={s}>
                       <SectionCard 
                         section={s} 
                         onClick={() => handleSectionClick(s)} 
                         progress={progress}
                         showProgress={isTrackingMode}
                         t={t}
                         getSectionName={getSectionName}
                       />
              </li>
            );
          })}
        </ul>
      </section>

      {/* Intermediário */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-700 font-bold text-sm">
            2
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{t('sections.intermediate')}</h2>
          <span className="badge badge-secondary text-xs">{t('sections.progress')}</span>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTERMEDIATE_SECTIONS.map((s) => {
            const tips = getTips(s);
            const progress = getSectionProgress(s, tips.length);
            return (
              <li key={s}>
                       <SectionCard 
                         section={s} 
                         onClick={() => handleSectionClick(s)} 
                         progress={progress}
                         showProgress={isTrackingMode}
                         t={t}
                         getSectionName={getSectionName}
                       />
              </li>
            );
          })}
        </ul>
      </section>

      {/* Avançado */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 text-red-700 font-bold text-sm">
            3
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{t('sections.advanced')}</h2>
          <span className="badge bg-red-100 text-red-700 text-xs">{t('sections.expert')}</span>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANCED_SECTIONS.map((s) => {
            const tips = getTips(s);
            const progress = getSectionProgress(s, tips.length);
            return (
              <li key={s}>
                       <SectionCard 
                         section={s} 
                         onClick={() => handleSectionClick(s)} 
                         progress={progress}
                         showProgress={isTrackingMode}
                         t={t}
                         getSectionName={getSectionName}
                       />
              </li>
            );
          })}
        </ul>
      </section>

      {/* Táticas */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-bold text-sm">
            4
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{t('sections.tactics')}</h2>
          <span className="badge bg-purple-100 text-purple-700 text-xs">{t('sections.strategy')}</span>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TACTICS_SECTIONS.map((s) => {
            const tips = getTips(s);
            const progress = getSectionProgress(s, tips.length);
            return (
              <li key={s}>
                       <SectionCard 
                         section={s} 
                         onClick={() => handleSectionClick(s)} 
                         progress={progress}
                         showProgress={isTrackingMode}
                         t={t}
                         getSectionName={getSectionName}
                       />
              </li>
            );
          })}
        </ul>
      </section>

      {/* Modal apenas no modo de acompanhamento */}
      {isTrackingMode && (
        <Modal isOpen={!!selectedSection} onClose={() => setSelectedSection(null)}>
          {selectedSection && (
            <SectionModal section={selectedSection} onClose={() => setSelectedSection(null)} />
          )}
        </Modal>
      )}
    </main>
  );
}