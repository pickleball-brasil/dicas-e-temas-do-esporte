import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribua com o Projeto - Estudando o Pickleball",
  description: "Este projeto está aberto a ideias, sugestões e contribuições! Participe da evolução deste projeto educacional sobre pickleball.",
};

export default function ContribuaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

