"use client";
import { PropsWithChildren } from "react";
import { ReadingProgressProvider } from "@/contexts/ReadingProgressContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <LanguageProvider>
      <ReadingProgressProvider>
        {children}
      </ReadingProgressProvider>
    </LanguageProvider>
  );
}


