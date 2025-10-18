// Básico
export const BASIC_SECTIONS = [
  "Regras",
  "Saque",
  "Devolução",
  "Dink",
  "Voleio",
  "Footwork",
  "Posicionamento",
  "Empunhadura",
  "Aquecimento",
  "Erros Comuns",
  "Dicas",
  "Equipamentos",
] as const;

// Intermediário
export const INTERMEDIATE_SECTIONS = [
  "Drop Shot",
  "Terceira bola",
  "Lob",
  "Transição",
  "Jogo de Duplas",
  "Defesa",
  "Bloqueio",
  "Spin",
  "Contra-ataque",
  "Comunicação",
  "Drills e Treinos",
  "Preparação Física",
  "Estratégia de Jogo",
] as const;

// Avançado
export const ADVANCED_SECTIONS = [
  "Smash",
  "Acelerar as bolas",
  "Reset",
  "Ataque",
  "Mental Game",
  "Erne",
  "ATP (Around The Post)",
  "Stacking",
  "Switching",
  "Poaching",
  "Finalizações",
  "Jogo Singles",
  "Torneios",
] as const;

// Táticas
export const TACTICS_SECTIONS = [
  "Controle de Ritmo",
  "Jogo no Meio",
  "Explorar Fraquezas",
  "Variação de Altura",
  "Pressão Constante",
  "Jogo Cruzado",
  "Isolamento de Jogador",
  "Mudança de Direção",
  "Jogo de Paciência",
  "Ataque ao Corpo",
  "Uso do Lob Tático",
  "Forçar Erros",
] as const;

export const SECTIONS = [
  ...BASIC_SECTIONS,
  ...INTERMEDIATE_SECTIONS,
  ...ADVANCED_SECTIONS,
  ...TACTICS_SECTIONS,
] as const;

export type Section = typeof SECTIONS[number];

export type SectionLinks = {
  section: Section;
  urls: string[];
};

export type SectionLevel = "Básico" | "Intermediário" | "Avançado" | "Táticas";

export const getSectionLevel = (section: Section): SectionLevel => {
  if ((BASIC_SECTIONS as readonly string[]).includes(section)) return "Básico";
  if ((INTERMEDIATE_SECTIONS as readonly string[]).includes(section)) return "Intermediário";
  if ((TACTICS_SECTIONS as readonly string[]).includes(section)) return "Táticas";
  return "Avançado";
};

