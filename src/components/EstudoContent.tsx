"use client";
import { useRouter } from "next/navigation";
import { getSectionLevel, type Section } from "@/lib/sections";
import { sectionDescriptions } from "@/lib/sectionDescriptions";
import { sectionTips } from "@/lib/sectionTips";

const levelColors = {
  "Básico": "from-green-500 to-emerald-600",
  "Intermediário": "from-orange-500 to-amber-600",
  "Avançado": "from-red-500 to-rose-600",
  "Táticas": "from-purple-500 to-violet-600",
};

const levelBadgeColors = {
  "Básico": "bg-green-100 text-green-700 border-green-200",
  "Intermediário": "bg-orange-100 text-orange-700 border-orange-200",
  "Avançado": "bg-red-100 text-red-700 border-red-200",
  "Táticas": "bg-purple-100 text-purple-700 border-purple-200",
};

interface EstudoContentProps {
  section: Section;
}

export default function EstudoContent({ section }: EstudoContentProps) {
  const router = useRouter();
  
  const tips = sectionTips[section] || [];
  const description = sectionDescriptions[section];
  const level = getSectionLevel(section);
  const gradientColor = levelColors[level];
  const badgeColor = levelBadgeColors[level];

  return (
    <div className="min-h-screen overflow-y-auto">
      {/* Header da página */}
      <button
            onClick={() => router.push("/")}
            className="inline-flex cursor-pointer items-center gap-2 text-black/90 hover:text-green-600 mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </button>
      <div className={`relative bg-gradient-to-br ${gradientColor} text-white py-16 px-4`}>
       
        <div className="max-w-4xl mx-auto">
       
          
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${badgeColor.replace('bg-', 'bg-white/90 ')}`}>
            {level}
          </div>
          
          <h1 className="text-5xl font-bold mb-4 drop-shadow-sm">{section}</h1>
          <p className="text-white/90 text-lg leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${gradientColor}`}></div>
          <h2 className="text-3xl font-bold text-gray-900">
            Dicas e Técnicas
          </h2>
        </div>

        {tips.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium text-lg">Conteúdo em desenvolvimento</p>
            <p className="text-gray-500 text-sm mt-2">Em breve mais dicas sobre este tema.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {tips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/60 hover:shadow-md transition-all duration-300"
              >
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradientColor} text-white text-lg font-bold shadow-md`}>
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-base text-gray-700 leading-relaxed">
                      {tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estatísticas */}
        {tips.length > 0 && (
          <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <p className="font-semibold text-gray-900">Total de dicas</p>
                  <p className="text-sm text-gray-600">Nesta seção</p>
                </div>
              </div>
              <div className={`text-4xl font-bold bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}>
                {tips.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

