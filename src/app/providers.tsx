"use client";
import { PropsWithChildren } from "react";
import { ReadingProgressProvider } from "@/contexts/ReadingProgressContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LayoutProvider } from "@/contexts/LayoutContext";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <LanguageProvider>
      <ReadingProgressProvider>
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </ReadingProgressProvider>
    </LanguageProvider>
  );
}


