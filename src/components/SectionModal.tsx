"use client";
import { type Section } from "@/lib/sections";
import { getSectionLevel } from "@/lib/sections";
import { useReadingProgressContext } from "@/contexts/ReadingProgressContext";
import { useLanguageContext } from "@/contexts/LanguageContext";

interface SectionModalProps {
  section: Section;
  onClose: () => void;
}

const levelColors = {
  "Básico": "from-green-500 to-emerald-600",
  "Intermediário": "from-orange-500 to-amber-600",
  "Avançado": "from-red-500 to-rose-600",
  "Táticas": "from-purple-500 to-violet-600",
  "Roteiro de Aulas": "from-emerald-500 to-teal-600",
};

const levelBadgeColors = {
  "Básico": "bg-green-100 text-green-700 border-green-200",
  "Intermediário": "bg-orange-100 text-orange-700 border-orange-200",
  "Avançado": "bg-red-100 text-red-700 border-red-200",
  "Táticas": "bg-purple-100 text-purple-700 border-purple-200",
  "Roteiro de Aulas": "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export default function SectionModal({ section, onClose }: SectionModalProps) {
  const { getTips, getSectionName, getSectionDescription, t } = useLanguageContext();
  const tips = getTips(section);
  const sectionName = getSectionName(section);
  const description = getSectionDescription(section);
  const level = getSectionLevel(section);
  const gradientColor = levelColors[level];
  const badgeColor = levelBadgeColors[level];
  
  const { toggleTipRead, isTipRead, getSectionProgress, markAllAsRead, markAllAsUnread } = useReadingProgressContext();
  const progress = getSectionProgress(section, tips.length);

  return (
    <div className="flex flex-col max-h-[90vh] overflow-hidden">
      {/* Header com Gradiente */}
      <div className={`relative bg-gradient-to-br ${gradientColor} p-6 text-white`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
          aria-label={t('common.close')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="pr-10">
          <div className="flex items-center gap-2 mb-3">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor.replace('bg-', 'bg-white/90 ')}`}>
              {level}
            </div>
            {tips.length > 0 && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 border border-white/20">
                <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                {progress.read}/{progress.total} {t('progress.tipsRead')} ({progress.percentage}%)
              </div>
            )}
          </div>
          <h2 className="text-3xl font-bold mb-3 drop-shadow-sm">{sectionName}</h2>
          <p className="text-white/90 text-sm leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${gradientColor}`}></div>
              <h3 className="text-lg font-bold text-gray-900">
                {t('ui.essentialTips')}
              </h3>
            </div>
            {tips.length > 0 && (
              <button
                onClick={() => progress.read === tips.length ? markAllAsUnread(section) : markAllAsRead(section, tips.length)}
                className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-gray-100"
              >
                {progress.read === tips.length ? `✓ ${t('progress.unmarkAll')}` : t('progress.markAllAsRead')}
              </button>
            )}
          </div>
          
          {tips.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">{t('study.moreTipsSoon')}</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {tips.map((tip, idx) => {
                const isRead = isTipRead(section, idx);
                return (
                  <div
                    key={idx}
                    className={`group relative bg-white rounded-xl p-4 shadow-sm border transition-all duration-300 ${
                      isRead 
                        ? 'border-green-200 bg-green-50/30' 
                        : 'border-gray-200/60 hover:shadow-md hover:border-gray-300/80 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${gradientColor} text-white text-sm font-bold shadow-sm`}>
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className={`text-sm leading-relaxed font-medium ${isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                          {tip}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => toggleTipRead(section, idx)}
                          className={`flex items-center justify-center w-6 h-6 rounded-md border-2 transition-all duration-200 ${
                            isRead
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                          }`}
                          aria-label={isRead ? 'Marcar como não lida' : 'Marcar como lida'}
                        >
                          {isRead && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* Footer Moderno */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{tips.length} {tips.length === 1 ? t('ui.tip') : t('ui.tips')}</span>
            </div>
            {tips.length > 0 && (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${gradientColor} transition-all duration-500`}
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
                <span className="font-semibold text-gray-700">{progress.percentage}%</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className={`px-6 py-2.5 rounded-lg bg-gradient-to-r ${gradientColor} text-white font-medium hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200`}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
