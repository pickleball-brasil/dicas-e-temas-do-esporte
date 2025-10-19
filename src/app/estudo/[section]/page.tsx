import { SECTIONS, type Section } from "@/lib/sections";
import { notFound } from "next/navigation";
import EstudoContent from "@/components/EstudoContent";

// Necessário para exportação estática
export function generateStaticParams() {
  return SECTIONS.map((section) => ({
    section: encodeURIComponent(section),
  }));
}

interface EstudoPageProps {
  params: {
    section: string;
  };
}

export default function EstudoPage({ params }: EstudoPageProps) {
  const sectionParam = decodeURIComponent(params.section);
  
  // Verificar se a seção existe
  const section = SECTIONS.find(s => s === sectionParam) as Section | undefined;
  
  if (!section) {
    notFound();
  }

  return <EstudoContent section={section} />;
}

