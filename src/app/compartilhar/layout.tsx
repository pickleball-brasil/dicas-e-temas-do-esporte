import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://pickleball-brasil.github.io/dicas-e-temas-do-esporte"),
  title: "Temas Compartilhados - Pickleball Estudos",
  description: "Explore uma coleção personalizada de temas sobre pickleball",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/compartilhar",
    siteName: "Pickleball Estudos",
    title: "Temas Compartilhados - Pickleball Estudos",
    description: "Explore uma coleção personalizada de temas sobre pickleball",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Pickleball Estudos Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Temas Compartilhados - Pickleball Estudos",
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

