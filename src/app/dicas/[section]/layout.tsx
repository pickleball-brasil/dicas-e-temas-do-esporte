import { SECTIONS } from "@/lib/sections";
import { hasSectionTips } from "@/lib/tipsData";
import type { Section } from "@/lib/sections";

// Necessário para static export com dynamic routes
export function generateStaticParams() {
  // Retornar apenas as seções que têm dicas disponíveis
  const sectionsWithTips = SECTIONS.filter((section): section is Section => 
    hasSectionTips(section)
  );
  
  return sectionsWithTips.map((section) => ({
    section: section,
  }));
}

export default function DicasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

