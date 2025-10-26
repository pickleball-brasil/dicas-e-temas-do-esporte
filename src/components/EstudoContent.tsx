"use client";
import { useState } from "react";
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
      <div className="flex-1 lg:ml-4">
        <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-gray-50/80 to-white/60">
          {/* Header da página */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Menu Button - Mobile */}
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200 text-gray-700 shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  
                  {/* Breadcrumb */}
                  <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium">Estudo</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="font-semibold text-gray-900 truncate max-w-32 sm:max-w-48 md:max-w-none">{sectionName}</span>
                  </div>
                </div>
                
                {/* Level Badge */}
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${badgeColor}`}>
                  {level}
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Section */}
          <div className={`relative bg-gradient-to-br ${gradientColor} text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/20 rounded-full translate-y-24 -translate-x-24"></div>
            </div>
            
            <div className="max-w-7xl mx-auto relative">
              <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold mb-4 sm:mb-5 border bg-white/95 ${badgeColor.replace('bg-', 'text-')}`}>
                {level}
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-5 drop-shadow-lg leading-tight">{sectionName}</h1>
              <p className="text-white/95 text-lg sm:text-xl leading-relaxed max-w-3xl">
                {description}
              </p>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="w-full px-4 sm:px-6 py-8 sm:py-12">
            <div className="max-w-7xl mx-auto">
              {/* Conteúdo Markdown */}
              {content ? (
                <div 
                  className="markdown-content w-full"
                  dangerouslySetInnerHTML={{ __html: content.content }}
                />
              ) : (
                <div className="text-center py-24">
                  <div className="inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 mb-8 shadow-lg">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-semibold text-xl mb-2">{t('study.contentInDevelopment')}</p>
                  <p className="text-gray-500 text-base">{t('study.moreTipsSoon')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Botão flutuante para menu mobile */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

