"use client";
import { useState, useEffect } from "react";
import { type Section } from "@/lib/sections";

type ReadingProgress = {
  [section: string]: {
    [tipIndex: number]: boolean;
  };
};

export function useReadingProgress() {
  const [progress, setProgress] = useState<ReadingProgress>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar progresso do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pickleball-reading-progress");
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Erro ao carregar progresso:", error);
    }
    setIsLoaded(true);
  }, []);

  // Salvar progresso no localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("pickleball-reading-progress", JSON.stringify(progress));
      } catch (error) {
        console.error("Erro ao salvar progresso:", error);
      }
    }
  }, [progress, isLoaded]);

  // Marcar/desmarcar uma dica como lida
  const toggleTipRead = (section: Section, tipIndex: number) => {
    setProgress((prev) => {
      const sectionProgress = prev[section] || {};
      return {
        ...prev,
        [section]: {
          ...sectionProgress,
          [tipIndex]: !sectionProgress[tipIndex],
        },
      };
    });
  };

  // Verificar se uma dica foi lida
  const isTipRead = (section: Section, tipIndex: number): boolean => {
    return progress[section]?.[tipIndex] || false;
  };

  // Obter estatísticas de progresso de uma seção
  const getSectionProgress = (section: Section, totalTips: number) => {
    const sectionProgress = progress[section] || {};
    const readCount = Object.values(sectionProgress).filter(Boolean).length;
    return {
      read: readCount,
      total: totalTips,
      percentage: totalTips > 0 ? Math.round((readCount / totalTips) * 100) : 0,
    };
  };

  // Marcar todas as dicas de uma seção como lidas
  const markAllAsRead = (section: Section, totalTips: number) => {
    setProgress((prev) => {
      const sectionProgress: { [key: number]: boolean } = {};
      for (let i = 0; i < totalTips; i++) {
        sectionProgress[i] = true;
      }
      return {
        ...prev,
        [section]: sectionProgress,
      };
    });
  };

  // Desmarcar todas as dicas de uma seção
  const markAllAsUnread = (section: Section) => {
    setProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[section];
      return newProgress;
    });
  };

  return {
    toggleTipRead,
    isTipRead,
    getSectionProgress,
    markAllAsRead,
    markAllAsUnread,
    isLoaded,
  };
}

