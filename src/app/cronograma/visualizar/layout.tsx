import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://pickleball-brasil.github.io/dicas-e-temas-do-esporte"),
  title: "Cronograma de Aulas - Pickleball Estudos",
  description: "Visualize o cronograma semanal de aulas de pickleball com tópicos e horários organizados para seu aprendizado.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/dicas-e-temas-do-esporte/cronograma/visualizar",
    siteName: "Pickleball Estudos",
    title: "Cronograma de Aulas - Pickleball Estudos",
    description: "Visualize o cronograma semanal de aulas de pickleball com tópicos e horários organizados para seu aprendizado.",
    images: [
      {
        url: "/dicas-e-temas-do-esporte/logo.png",
        width: 512,
        height: 512,
        alt: "Pickleball Estudos - Cronograma de Aulas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cronograma de Aulas - Pickleball Estudos",
    description: "Visualize o cronograma semanal de aulas de pickleball com tópicos e horários organizados para seu aprendizado.",
    images: ["/dicas-e-temas-do-esporte/logo.png"],
  },
  other: {
    "og:image:width": "512",
    "og:image:height": "512",
    "og:image:type": "image/png",
  },
};

export default function CronogramaVisualizarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

