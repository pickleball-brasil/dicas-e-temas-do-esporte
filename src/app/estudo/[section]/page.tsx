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

  return <EstudoContent section={section} />;
}

