import { SECTIONS, type Section } from "@/lib/sections";
import { notFound } from "next/navigation";
import EstudoContent from "@/components/EstudoContent";
import { getSectionContent } from "@/lib/markdown";

// Necessário para exportação estática
export function generateStaticParams() {
  return SECTIONS.map((section) => ({
    section: section,
  }));
}

interface EstudoPageProps {
  params: {
    section: string;
  };
}

export default async function EstudoPage({ params }: EstudoPageProps) {
  const { section: sectionParam } = params;
  
  // Verificar se a seção existe
  const section = SECTIONS.find(s => s === sectionParam) as Section | undefined;
  
  if (!section) {
    console.error(`Seção não encontrada: "${sectionParam}"`);
    notFound();
  }

  // Tentar carregar conteúdo do Markdown
  const content = await getSectionContent(section);

  return <EstudoContent section={section} content={content || undefined} />;
}

