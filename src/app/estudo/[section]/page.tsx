import { SECTIONS, type Section } from "@/lib/sections";
import { notFound } from "next/navigation";
import EstudoContent from "@/components/EstudoContent";
import { getSectionContent } from "@/lib/markdown";

// Necessário para exportação estática
export function generateStaticParams() {
  return SECTIONS.map((section) => ({
    section: encodeURIComponent(section),
  }));
}

interface EstudoPageProps {
  params: Promise<{
    section: string;
  }>;
}

export default async function EstudoPage({ params }: EstudoPageProps) {
  const { section: sectionParam } = await params;
  const decodedSection = decodeURIComponent(sectionParam);
  
  // Verificar se a seção existe
  const section = SECTIONS.find(s => s === decodedSection) as Section | undefined;
  
  if (!section) {
    notFound();
  }

  // Tentar carregar conteúdo do Markdown
  const content = await getSectionContent(section);

  return <EstudoContent section={section} content={content || undefined} />;
}

