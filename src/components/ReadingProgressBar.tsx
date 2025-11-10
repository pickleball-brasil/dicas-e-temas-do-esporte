"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SECTIONS } from "@/lib/sections";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [visitedCount, setVisitedCount] = useState(0);
  const totalSections = SECTIONS.length;
  const pathname = usePathname();
  
  // Verificar se está na página principal (home)
  const isHomePage = pathname === '/' || pathname === '/dicas-e-temas-do-esporte' || pathname === '/dicas-e-temas-do-esporte/';

  useEffect(() => {
    const updateProgress = () => {
      try {
        const saved = localStorage.getItem('visitedSections');
        if (saved) {
          const visited = JSON.parse(saved);
          const count = Array.isArray(visited) ? visited.length : 0;
          const percentage = totalSections > 0 
            ? Math.round((count / totalSections) * 100)
            : 0;
          setProgress(percentage);
          setVisitedCount(count);
        } else {
          setProgress(0);
          setVisitedCount(0);
        }
      } catch (error) {
        console.error('Erro ao calcular progresso:', error);
        setProgress(0);
        setVisitedCount(0);
      }
    };

    // Atualizar progresso inicial
    updateProgress();

    // Atualizar progresso quando localStorage mudar
    const handleStorageChange = () => {
      updateProgress();
    };

    // Escutar mudanças no localStorage (de outras abas)
    window.addEventListener('storage', handleStorageChange);
    
    // Escutar mudanças customizadas (da mesma aba)
    window.addEventListener('visitedSectionsChanged', handleStorageChange);

    // Verificar mudanças periodicamente (fallback)
    const interval = setInterval(updateProgress, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('visitedSectionsChanged', handleStorageChange);
      clearInterval(interval);
    };
  }, [totalSections]);

  // Mostrar apenas na página principal
  if (!isHomePage) {
    return null;
  }

  return (
    <div className="relative w-full bg-gradient-to-r from-sky-50 to-purple-50 backdrop-blur-sm border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-8 sm:h-9">
          {/* Informação de progresso */}
          <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-700 font-medium whitespace-nowrap">
            <span className="text-sky-600 font-semibold">{visitedCount}</span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-700">{totalSections}</span>
            <span className="text-gray-500 ml-1">estudados</span>
          </div>
          
          {/* Barra de progresso - ocupa o resto do espaço */}
          <div className="flex-1 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

