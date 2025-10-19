"use client";
import { createContext, useContext, type ReactNode } from "react";
import { useAppMode, type AppMode } from "@/hooks/useAppMode";

type AppModeContextType = {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
  isLoaded: boolean;
  isTrackingMode: boolean;
  isStudyMode: boolean;
};

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export function AppModeProvider({ children }: { children: ReactNode }) {
  const modeUtils = useAppMode();

  return (
    <AppModeContext.Provider value={modeUtils}>
      {children}
    </AppModeContext.Provider>
  );
}

export function useAppModeContext() {
  const context = useContext(AppModeContext);
  if (!context) {
    throw new Error("useAppModeContext must be used within AppModeProvider");
  }
  return context;
}

