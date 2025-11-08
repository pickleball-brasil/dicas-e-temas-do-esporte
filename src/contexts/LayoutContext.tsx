"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type LayoutType = "grid" | "list";

interface LayoutContextType {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayoutState] = useState<LayoutType>("grid");
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar layout do localStorage na montagem
  useEffect(() => {
    const saved = localStorage.getItem("layoutPreference");
    if (saved === "grid" || saved === "list") {
      setLayoutState(saved);
    }
    setIsLoaded(true);
  }, []);

  // Salvar layout no localStorage quando mudar
  const setLayout = (newLayout: LayoutType) => {
    setLayoutState(newLayout);
    if (isLoaded) {
      localStorage.setItem("layoutPreference", newLayout);
    }
  };

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
}

