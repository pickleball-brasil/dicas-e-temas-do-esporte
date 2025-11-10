import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://pickleball-brasil.github.io/dicas-e-temas-do-esporte"),
  title: "Temas Compartilhados - Pickleball Estudos",
  description: "Explore uma coleção personalizada de temas sobre pickleball selecionados para você estudar e praticar.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/dicas-e-temas-do-esporte/compartilhar",
    siteName: "Pickleball Estudos",
    title: "Temas Compartilhados - Pickleball Estudos",
    description: "Explore uma coleção personalizada de temas sobre pickleball selecionados para você estudar e praticar.",
    images: [
      {
        url: "/dicas-e-temas-do-esporte/logo.png",
        width: 512,
        height: 512,
        alt: "Pickleball Estudos - Temas Compartilhados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Temas Compartilhados - Pickleball Estudos",
    description: "Explore uma coleção personalizada de temas sobre pickleball selecionados para você estudar e praticar.",
    images: ["/dicas-e-temas-do-esporte/logo.png"],
  },
  other: {
    "og:image:width": "512",
    "og:image:height": "512",
    "og:image:type": "image/png",
  },
};

export default function SharedThemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

