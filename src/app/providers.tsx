"use client";
import { PropsWithChildren } from "react";
import { ReadingProgressProvider } from "@/contexts/ReadingProgressContext";
import { AppModeProvider } from "@/contexts/AppModeContext";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <AppModeProvider>
      <ReadingProgressProvider>
        {children}
      </ReadingProgressProvider>
    </AppModeProvider>
  );
}


