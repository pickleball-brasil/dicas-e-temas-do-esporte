import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://pickleball-brasil.github.io/dicas-e-temas-do-esporte"),
  title: "Temas Compartilhados - Estudando o Pickleball",
  description: "Explore uma coleção personalizada de temas sobre pickleball",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/compartilhar",
    siteName: "Estudando o Pickleball",
    title: "Temas Compartilhados - Estudando o Pickleball",
    description: "Explore uma coleção personalizada de temas sobre pickleball",
    images: [
      {
        url: "/logo.png",
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
    images: ["/logo.png"],
  },
};

export default function SharedThemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

