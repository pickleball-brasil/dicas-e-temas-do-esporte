"use client";
import { type Section } from "@/lib/sections";
import { sectionDescriptions } from "@/lib/sectionDescriptions";
import { sectionTips } from "@/lib/sectionTips";
import { getSectionLevel } from "@/lib/sections";

interface SectionModalProps {
  section: Section;
  onClose: () => void;
}

const levelColors = {
  "Básico": "from-emerald-500 to-green-600",
  "Intermediário": "from-blue-500 to-indigo-600",
  "Avançado": "from-red-500 to-orange-600",
  "Táticas": "from-purple-500 to-fuchsia-600",
};

const levelBadgeColors = {
  "Básico": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Intermediário": "bg-blue-100 text-blue-700 border-blue-200",
  "Avançado": "bg-red-100 text-red-700 border-red-200",
  "Táticas": "bg-purple-100 text-purple-700 border-purple-200",
};

export default function SectionModal({ section, onClose }: SectionModalProps) {
  const tips = sectionTips[section] || [];
  const description = sectionDescriptions[section];
  const level = getSectionLevel(section);
  const gradientColor = levelColors[level];
  const badgeColor = levelBadgeColors[level];

  return (
    <div className="flex flex-col max-h-[90vh] overflow-hidden">
      {/* Header com Gradiente */}
      <div className={`relative bg-gradient-to-br ${gradientColor} p-6 text-white`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
          aria-label="Fechar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="pr-10">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 border ${badgeColor.replace('bg-', 'bg-white/90 ')}`}>
            {level}
          </div>
          <h2 className="text-3xl font-bold mb-3 drop-shadow-sm">{section}</h2>
          <p className="text-white/90 text-sm leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${gradientColor}`}></div>
            <h3 className="text-lg font-bold text-gray-900">
              Dicas Essenciais
            </h3>
          </div>
          
          {tips.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">Dicas em breve</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white rounded-xl p-4 shadow-sm border border-gray-200/60 hover:shadow-md hover:border-gray-300/80 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${gradientColor} text-white text-sm font-bold shadow-sm`}>
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        {tip}
                      </p>
                    </div>
                    <div className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Footer Moderno */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tips.length} {tips.length === 1 ? 'dica' : 'dicas'}</span>
          </div>
          <button
            onClick={onClose}
            className={`px-6 py-2.5 rounded-lg bg-gradient-to-r ${gradientColor} text-white font-medium hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200`}
          >
            Entendi!
          </button>
        </div>
      </div>
    </div>
  );
}

