"use client";
import { useAppModeContext } from "@/contexts/AppModeContext";

export default function ModeToggle() {
  const { mode, toggleMode, isLoaded } = useAppModeContext();

  if (!isLoaded) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl shadow-sm">
      <button
        onClick={toggleMode}
        className={`relative px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
          mode === "tracking"
            ? "bg-white text-sky-600 shadow-md"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <span className="hidden sm:inline">📊 Acompanhamento</span>
        <span className="sm:hidden">📊</span>
      </button>
      <button
        onClick={toggleMode}
        className={`relative px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
          mode === "study"
            ? "bg-white text-purple-600 shadow-md"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <span className="hidden sm:inline">📚 Estudo</span>
        <span className="sm:hidden">📚</span>
      </button>
    </div>
  );
}

