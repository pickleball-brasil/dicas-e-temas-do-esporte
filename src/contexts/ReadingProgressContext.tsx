"use client";
import { createContext, useContext, type ReactNode } from "react";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { type Section } from "@/lib/sections";

type ReadingProgressContextType = {
  toggleTipRead: (section: Section, tipIndex: number) => void;
  isTipRead: (section: Section, tipIndex: number) => boolean;
  getSectionProgress: (section: Section, totalTips: number) => {
    read: number;
    total: number;
    percentage: number;
  };
  markAllAsRead: (section: Section, totalTips: number) => void;
  markAllAsUnread: (section: Section) => void;
  isLoaded: boolean;
};

const ReadingProgressContext = createContext<ReadingProgressContextType | undefined>(undefined);

export function ReadingProgressProvider({ children }: { children: ReactNode }) {
  const progressUtils = useReadingProgress();

  return (
    <ReadingProgressContext.Provider value={progressUtils}>
      {children}
    </ReadingProgressContext.Provider>
  );
}

export function useReadingProgressContext() {
  const context = useContext(ReadingProgressContext);
  if (!context) {
    throw new Error("useReadingProgressContext must be used within ReadingProgressProvider");
  }
  return context;
}

