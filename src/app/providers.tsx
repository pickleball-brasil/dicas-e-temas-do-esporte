"use client";
import { PropsWithChildren } from "react";
import { ReadingProgressProvider } from "@/contexts/ReadingProgressContext";
import { AppModeProvider } from "@/contexts/AppModeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <LanguageProvider>
      <AppModeProvider>
        <ReadingProgressProvider>
          {children}
        </ReadingProgressProvider>
      </AppModeProvider>
    </LanguageProvider>
  );
}


