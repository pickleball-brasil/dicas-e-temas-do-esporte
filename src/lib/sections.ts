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
  "Golpes Fundamentais",
  "Técnica de Base",
  "Concentração",
  "Respiração",
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
  "Tempo de Reação",
  "Antecipação",
  "Leitura de Jogo",
  "Adaptação",
  "Consistência",
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
  "Golpes Especiais",
  "Técnicas Avançadas",
  "Pressão Mental",
  "Execução Sob Pressão",
  "Liderança em Quadra",
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
  "Estratégias de Abertura",
  "Controle de Ponto",
  "Quebra de Ritmo",
  "Exploração de Ângulos",
  "Jogos Mentais",
  "Adaptação Tática",
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

