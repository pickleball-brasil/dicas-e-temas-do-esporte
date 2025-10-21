"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSectionLevel, type Section, type SectionLevel } from "@/lib/sections";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { SectionContent } from "@/lib/markdown";
import { getDisplayName } from "@/lib/displayNames";
import Sidebar from "./Sidebar";

const levelColors: Record<SectionLevel, string> = {
  "Básico": "from-green-500 to-emerald-600",
  "Intermediário": "from-orange-500 to-amber-600",
  "Avançado": "from-red-500 to-rose-600",
  "Táticas": "from-purple-500 to-violet-600",
};

const levelBadgeColors: Record<SectionLevel, string> = {
  "Básico": "bg-green-100 text-green-700 border-green-200",
  "Intermediário": "bg-orange-100 text-orange-700 border-orange-200",
  "Avançado": "bg-red-100 text-red-700 border-red-200",
  "Táticas": "bg-purple-100 text-purple-700 border-purple-200",
};

interface EstudoContentProps {
  section: Section;
  content?: SectionContent;
}

export default function EstudoContent({ section, content }: EstudoContentProps) {
  const router = useRouter();
  const { getSectionDescription, t } = useLanguageContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  console.log('content', content);
  
  // Usar conteúdo do Markdown se disponível, senão usar o nome de exibição
  const sectionName = content?.title || getDisplayName(section);
  const description = content?.description || getSectionDescription(section);
  const level = content?.level || getSectionLevel(section);
  const gradientColor = levelColors[level];
  const badgeColor = levelBadgeColors[level];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-5">
        <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-gray-100/40 to-gray-50/60">
          {/* Header da página */}
          <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-4">
                  {/* Menu Button */}
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
                
                {/* Breadcrumb */}
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                  <span>Estudo</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="font-medium text-gray-900 truncate max-w-32 sm:max-w-48 md:max-w-none">{sectionName}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Section */}
          <div className={`relative bg-gradient-to-br ${gradientColor} text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6`}>
            <div className="max-w-7xl mx-auto">
              <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold mb-3 sm:mb-4 border ${badgeColor.replace('bg-', 'bg-white/90 ')}`}>
                {level}
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-sm leading-tight">{sectionName}</h1>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="w-full px-4 sm:px-6 py-8 sm:py-12 md:py-16">
            <div className="max-w-7xl mx-auto">
              {/* Conteúdo Markdown */}
              {content ? (
                <div 
                  className="markdown-content w-full"
                  dangerouslySetInnerHTML={{ __html: content.content }}
                />
              ) : (
                <div className="text-center py-20">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium text-lg">{t('study.contentInDevelopment')}</p>
                  <p className="text-gray-500 text-sm mt-2">{t('study.moreTipsSoon')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

