"use client";
import { useState, useEffect } from "react";

export type AppMode = "tracking" | "study";

export function useAppMode() {
  const [mode, setMode] = useState<AppMode>("tracking");
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar modo do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pickleball-app-mode");
      if (saved === "tracking" || saved === "study") {
        setMode(saved);
      }
    } catch (error) {
      console.error("Erro ao carregar modo:", error);
    }
    setIsLoaded(true);
  }, []);

  // Salvar modo no localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("pickleball-app-mode", mode);
      } catch (error) {
        console.error("Erro ao salvar modo:", error);
      }
    }
  }, [mode, isLoaded]);

  const toggleMode = () => {
    setMode((prev) => (prev === "tracking" ? "study" : "tracking"));
  };

  return {
    mode,
    setMode,
    toggleMode,
    isLoaded,
    isTrackingMode: mode === "tracking",
    isStudyMode: mode === "study",
  };
}

