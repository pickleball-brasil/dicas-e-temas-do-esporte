import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temas Compartilhados - Estudando o Pickleball",
  description: "Explore uma coleção personalizada de temas sobre pickleball",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/compartilhar",
    siteName: "Estudando o Pickleball",
    title: "Temas Compartilhados - Estudando o Pickleball",
    description: "Explore uma coleção personalizada de temas sobre pickleball",
    images: [
      {
        url: "https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/logo.png",
        width: 512,
        height: 512,
        alt: "Estudando o Pickleball Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Temas Compartilhados - Estudando o Pickleball",
    description: "Explore uma coleção personalizada de temas sobre pickleball",
    images: ["https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/logo.png"],
  },
};

export default function SharedThemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

