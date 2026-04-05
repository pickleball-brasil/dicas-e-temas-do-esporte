/**
 * Sistema Centralizado de Registro de Conteúdo
 * 
 * Este arquivo centraliza todas as configurações de seções, eliminando a necessidade
 * de atualizar múltiplos arquivos manualmente ao criar novos posts.
 */

export type ContentLevel = 'Básico' | 'Intermediário' | 'Avançado' | 'Táticas' | 'Roteiro de Aulas';

export interface SectionConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  level: ContentLevel;
  fileName: string;
  color: string;
  englishName: string;
  englishDescription: string;
  category: 'basico' | 'intermediario' | 'avancado' | 'taticas' | 'roteiros';
}

// 🎯 REGISTRO CENTRALIZADO DE TODAS AS SEÇÕES
export const CONTENT_REGISTRY: Record<string, SectionConfig> = {
  // BÁSICO
  "regras": {
    id: "rules",
    name: "Regras",
    displayName: "Regras",
    description: "Regras fundamentais do pickleball",
    level: "Básico",
    fileName: "regras.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Rules",
    englishDescription: "Fundamental pickleball rules",
    category: "basico"
  },
  "saque": {
    id: "serve",
    name: "Saque",
    displayName: "Saque",
    description: "Técnicas básicas de saque",
    level: "Básico",
    fileName: "saque.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Serve",
    englishDescription: "Basic serving techniques",
    category: "basico"
  },
  "devolucao": {
    id: "return",
    name: "Devolução",
    displayName: "Devolução",
    description: "Como devolver o saque",
    level: "Básico",
    fileName: "devolucao.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Return",
    englishDescription: "How to return the serve",
    category: "basico"
  },
  "dink": {
    id: "dink",
    name: "Dink",
    displayName: "Dink",
    description: "Golpe suave próximo à rede",
    level: "Básico",
    fileName: "dink.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Dink",
    englishDescription: "Soft shot near the net",
    category: "basico"
  },
  "voleio": {
    id: "volley",
    name: "Voleio",
    displayName: "Voleio",
    description: "Técnica de voleio na rede",
    level: "Básico",
    fileName: "voleio.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Volley",
    englishDescription: "Net volley technique",
    category: "basico"
  },
  "footwork": {
    id: "footwork",
    name: "Footwork",
    displayName: "Footwork",
    description: "Movimentação e posicionamento",
    level: "Básico",
    fileName: "footwork.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Footwork",
    englishDescription: "Movement and positioning",
    category: "basico"
  },
  "posicionamento": {
    id: "positioning",
    name: "Posicionamento",
    displayName: "Posicionamento",
    description: "Estratégias de posicionamento",
    level: "Básico",
    fileName: "posicionamento.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Positioning",
    englishDescription: "Positioning strategies",
    category: "basico"
  },
  "empunhadura": {
    id: "grip",
    name: "Empunhadura",
    displayName: "Empunhadura",
    description: "Técnicas de empunhadura",
    level: "Básico",
    fileName: "empunhadura.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Grip",
    englishDescription: "Grip techniques",
    category: "basico"
  },
  "aquecimento": {
    id: "warmup",
    name: "Aquecimento",
    displayName: "Aquecimento",
    description: "Preparação física antes do jogo",
    level: "Básico",
    fileName: "aquecimento.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Warm-up",
    englishDescription: "Physical preparation before the game",
    category: "basico"
  },
  "erros-comuns": {
    id: "common-mistakes",
    name: "Erros Comuns",
    displayName: "Erros Comuns",
    description: "Erros frequentes e como evitá-los",
    level: "Básico",
    fileName: "erros-comuns.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Common Mistakes",
    englishDescription: "Frequent mistakes and how to avoid them",
    category: "basico"
  },
  "dicas": {
    id: "tips",
    name: "Dicas",
    displayName: "Dicas",
    description: "Dicas gerais para iniciantes",
    level: "Básico",
    fileName: "dicas.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Tips",
    englishDescription: "General tips for beginners",
    category: "basico"
  },
  "golpes-fundamentais": {
    id: "fundamental-shots",
    name: "Golpes Fundamentais",
    displayName: "Golpes Fundamentais",
    description: "Golpes básicos do pickleball",
    level: "Básico",
    fileName: "golpes-fundamentais.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Fundamental Shots",
    englishDescription: "Basic pickleball shots",
    category: "basico"
  },
  "tecnica-de-base": {
    id: "basic-technique",
    name: "Técnica de Base",
    displayName: "Técnica de Base",
    description: "Fundamentos técnicos",
    level: "Básico",
    fileName: "tecnica-de-base.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Basic Technique",
    englishDescription: "Technical fundamentals",
    category: "basico"
  },
  "concentracao": {
    id: "concentration",
    name: "Concentração",
    displayName: "Concentração",
    description: "Manter foco durante o jogo",
    level: "Básico",
    fileName: "concentracao.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Concentration",
    englishDescription: "Maintaining focus during the game",
    category: "basico"
  },
  "respiracao": {
    id: "breathing",
    name: "Respiração",
    displayName: "Respiração",
    description: "Controle da respiração",
    level: "Básico",
    fileName: "respiracao.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Breathing",
    englishDescription: "Breathing control",
    category: "basico"
  },
  "etiqueta-em-quadra": {
    id: "court-etiquette",
    name: "Etiqueta em Quadra",
    displayName: "Etiqueta em Quadra",
    description: "Boa conduta em quadra",
    level: "Básico",
    fileName: "etiqueta-em-quadra.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Court Etiquette",
    englishDescription: "Good court conduct",
    category: "basico"
  },
  "historia-e-origem": {
    id: "history-origin",
    name: "História e Origem do Pickleball",
    displayName: "História e Origem",
    description: "A fascinante história do pickleball desde sua criação",
    level: "Básico",
    fileName: "historia-e-origem.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "History and Origin",
    englishDescription: "Learn about the fascinating history of pickleball",
    category: "basico"
  },
  "como-escolher-parceiro": {
    id: "choosing-partner",
    name: "Como Escolher seu Primeiro Parceiro",
    displayName: "Escolher Parceiro",
    description: "Critérios para escolher um parceiro de duplas",
    level: "Básico",
    fileName: "como-escolher-parceiro.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "How to Choose Your First Partner",
    englishDescription: "Learn important criteria for choosing a doubles partner",
    category: "basico"
  },
  "drills-e-treinos-basicos": {
    id: "basic-drills-training",
    name: "Drills e Treinos Básicos",
    displayName: "Drills Básicos",
    description: "Exercícios fundamentais para desenvolver habilidades básicas",
    level: "Básico",
    fileName: "drills-e-treinos-basicos.md",
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    englishName: "Basic Drills and Training",
    englishDescription: "Fundamental exercises to develop basic skills",
    category: "basico"
  },

  // INTERMEDIÁRIO
  "drop-shot": {
    id: "drop-shot",
    name: "Drop Shot",
    displayName: "Drop Shot",
    description: "Golpe suave para a cozinha",
    level: "Intermediário",
    fileName: "drop-shot.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Drop Shot",
    englishDescription: "Soft shot to the kitchen",
    category: "intermediario"
  },
  "drive": {
    id: "drive",
    name: "Drive",
    displayName: "Drive",
    description: "Golpe rápido e linear usado para acelerar o jogo e criar pressão",
    level: "Intermediário",
    fileName: "drive.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Drive",
    englishDescription: "Fast, linear shot used to speed up the game and create pressure",
    category: "intermediario"
  },
  "terceira-bola": {
    id: "third-shot",
    name: "Terceira Bola",
    displayName: "Terceira Bola",
    description: "Estratégia da terceira bola",
    level: "Intermediário",
    fileName: "terceira-bola.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Third Shot",
    englishDescription: "Third shot strategy",
    category: "intermediario"
  },
  "quarta-bola": {
    id: "fourth-shot",
    name: "Quarta Bola",
    displayName: "Quarta Bola",
    description: "Estratégia da quarta bola para manter controle do ponto",
    level: "Intermediário",
    fileName: "quarta-bola.md",
    color: "bg-gradient-to-br from-orange-500 to-amber-600",
    englishName: "Fourth Shot",
    englishDescription: "Fourth shot strategy to maintain point control",
    category: "intermediario"
  },
  "roteiro-aula-dinks-aceleracao": {
    id: "lesson-plan-dinks-acceleration",
    name: "Roteiro: Dinks e Aceleração",
    displayName: "Roteiro: Dinks e Aceleração",
    description: "Roteiro completo de aula de 60 minutos focando em dinks e aceleração na NVZ",
    level: "Roteiro de Aulas",
    fileName: "roteiro-aula-dinks-aceleracao.md",
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    englishName: "Lesson Plan: Dinks and Acceleration",
    englishDescription: "Complete 60-minute lesson plan focusing on dinks and acceleration in the NVZ",
    category: "roteiros"
  },
  "roteiro-aula-terceira-bola": {
    id: "lesson-plan-third-shot",
    name: "Roteiro: Terceira Bola",
    displayName: "Roteiro: Terceira Bola",
    description: "Plano de aula de 60 minutos focando na decisão e execução da terceira bola (Drive vs Drop)",
    level: "Roteiro de Aulas",
    fileName: "roteiro-aula-terceira-bola.md",
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    englishName: "Lesson Plan: Third Shot",
    englishDescription: "60-minute lesson plan focusing on decision-making and execution of the third shot (Drive vs Drop)",
    category: "roteiros"
  },
  "roteiro-aula-drive": {
    id: "lesson-plan-drive",
    name: "Roteiro: Drive",
    displayName: "Roteiro: Drive",
    description: "Plano de aula de 60 minutos focando no desenvolvimento técnico e tático do drive",
    level: "Roteiro de Aulas",
    fileName: "roteiro-aula-drive.md",
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    englishName: "Lesson Plan: Drive",
    englishDescription: "60-minute lesson plan focusing on technical and tactical development of the drive",
    category: "roteiros"
  },
  "roteiro-aula-drop": {
    id: "lesson-plan-drop",
    name: "Roteiro: Drop",
    displayName: "Roteiro: Drop",
    description: "Plano de aula de 60 minutos focando no desenvolvimento técnico e tático do drop shot",
    level: "Roteiro de Aulas",
    fileName: "roteiro-aula-drop.md",
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    englishName: "Lesson Plan: Drop Shot",
    englishDescription: "60-minute lesson plan focusing on technical and tactical development of the drop shot",
    category: "roteiros"
  },
  "roteiro-aula-tomada-decisao": {
    id: "lesson-plan-decision-making",
    name: "Roteiro: Tomada de Decisão",
    displayName: "Roteiro: Tomada de Decisão",
    description: "Plano de aula de 60 minutos focando no desenvolvimento da capacidade de tomar decisões rápidas e eficazes",
    level: "Roteiro de Aulas",
    fileName: "roteiro-aula-tomada-decisao.md",
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    englishName: "Lesson Plan: Decision Making",
    englishDescription: "60-minute lesson plan focusing on developing quick and effective decision-making skills",
    category: "roteiros"
  },
  "roteiro-aula-saque-devolucao": {
    id: "lesson-plan-serve-return",
    name: "Roteiro: Saque e Devolução",
    displayName: "Roteiro: Saque e Devolução",
    description: "Plano de aula de 60 minutos focando no desenvolvimento técnico e tático do saque e da devolução",
    level: "Roteiro de Aulas",
    fileName: "roteiro-aula-saque-devolucao.md",
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    englishName: "Lesson Plan: Serve and Return",
    englishDescription: "60-minute lesson plan focusing on technical and tactical development of serve and return",
    category: "roteiros"
  },
  "roteiro-aula-jogo-das-porcentagens": {
    id: "lesson-plan-percentage-play",
    name: "Roteiro: Jogo das Porcentagens",
    displayName: "Roteiro: Jogo das Porcentagens",
    description: "Roteiro de 60-90 minutos focando no conceito tático do Jogo das Porcentagens e tomada de decisão",
    level: "Roteiro de Aulas",
    fileName: "roteiro-aula-jogo-das-porcentagens.md",
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    englishName: "Lesson Plan: Percentage Play",
    englishDescription: "60-90 minute lesson plan focusing on the tactical concept of percentage play and decision-making",
    category: "roteiros"
  },
  "estudos-e-pesquisas": {
    id: "studies-research",
    name: "Estudos e Pesquisas",
    displayName: "Estudos e Pesquisas",
    description: "Coleção de estudos e pesquisas sobre pickleball em formato PDF",
    level: "Roteiro de Aulas",
    fileName: "estudos-e-pesquisas.md",
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    englishName: "Studies and Research",
    englishDescription: "Collection of pickleball studies and research in PDF format",
    category: "roteiros"
  },
  "lob": {
    id: "lob",
    name: "Lob",
    displayName: "Lob",
    description: "Golpe alto sobre o oponente",
    level: "Intermediário",
    fileName: "lob.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Lob",
    englishDescription: "High shot over the opponent",
    category: "intermediario"
  },
  "transicao": {
    id: "transition",
    name: "Transição",
    displayName: "Transição",
    description: "Movimento da linha de fundo para a rede",
    level: "Intermediário",
    fileName: "transicao.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Transition",
    englishDescription: "Movement from baseline to net",
    category: "intermediario"
  },
  "jogo-de-duplas": {
    id: "doubles-play",
    name: "Jogo de Duplas",
    displayName: "Jogo de Duplas",
    description: "Estratégias específicas para duplas",
    level: "Intermediário",
    fileName: "jogo-de-duplas.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Doubles Play",
    englishDescription: "Specific strategies for doubles",
    category: "intermediario"
  },
  "defesa": {
    id: "defense",
    name: "Defesa",
    displayName: "Defesa",
    description: "Técnicas defensivas",
    level: "Intermediário",
    fileName: "defesa.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Defense",
    englishDescription: "Defensive techniques",
    category: "intermediario"
  },
  "bloqueio": {
    id: "blocking",
    name: "Bloqueio",
    displayName: "Bloqueio",
    description: "Técnica de bloqueio na rede",
    level: "Intermediário",
    fileName: "bloqueio.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Blocking",
    englishDescription: "Net blocking technique",
    category: "intermediario"
  },
  "spin": {
    id: "spin",
    name: "Spin",
    displayName: "Spin",
    description: "Aplicação de efeitos na bola",
    level: "Intermediário",
    fileName: "spin.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Spin",
    englishDescription: "Applying spin to the ball",
    category: "intermediario"
  },
  "contra-ataque": {
    id: "counter-attack",
    name: "Contra-ataque",
    displayName: "Contra-ataque",
    description: "Responder a ataques com contra-ataques",
    level: "Intermediário",
    fileName: "contra-ataque.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Counter-attack",
    englishDescription: "Responding to attacks with counter-attacks",
    category: "intermediario"
  },
  "comunicacao": {
    id: "communication",
    name: "Comunicação",
    displayName: "Comunicação",
    description: "Comunicação eficaz em duplas",
    level: "Intermediário",
    fileName: "comunicacao.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Communication",
    englishDescription: "Effective communication in doubles",
    category: "intermediario"
  },
  "drills-e-treinos": {
    id: "drills-training",
    name: "Drills e Treinos",
    displayName: "Drills e Treinos",
    description: "Exercícios específicos para melhoria",
    level: "Intermediário",
    fileName: "drills-e-treinos.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Drills and Training",
    englishDescription: "Specific exercises for improvement",
    category: "intermediario"
  },
  "treino-com-paredao": {
    id: "wall-training",
    name: "Treino com Paredão",
    displayName: "Paredão",
    description: "Treinos individuais usando parede ",
    level: "Intermediário",
    fileName: "treino-com-paredao.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Wall Training",
    englishDescription: "Complete guide to individual wall training to improve technique and consistency",
    category: "intermediario"
  },
  "preparacao-fisica": {
    id: "physical-prep",
    name: "Preparação Física",
    displayName: "Preparação Física",
    description: "Condicionamento físico para pickleball",
    level: "Intermediário",
    fileName: "preparacao-fisica.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Physical Preparation",
    englishDescription: "Physical conditioning for pickleball",
    category: "intermediario"
  },
  "estrategia-de-jogo": {
    id: "game-strategy",
    name: "Estratégia de Jogo",
    displayName: "Estratégia de Jogo",
    description: "Desenvolvimento de estratégias",
    level: "Intermediário",
    fileName: "estrategia-de-jogo.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Game Strategy",
    englishDescription: "Strategy development",
    category: "intermediario"
  },
  "tempo-de-reacao": {
    id: "reaction-time",
    name: "Tempo de Reação",
    displayName: "Tempo de Reação",
    description: "Melhorar tempo de reação",
    level: "Intermediário",
    fileName: "tempo-de-reacao.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Reaction Time",
    englishDescription: "Improving reaction time",
    category: "intermediario"
  },
  "antecipacao": {
    id: "anticipation",
    name: "Antecipação",
    displayName: "Antecipação",
    description: "Prever movimentos do oponente",
    level: "Intermediário",
    fileName: "antecipacao.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Anticipation",
    englishDescription: "Predicting opponent movements",
    category: "intermediario"
  },
  "leitura-de-jogo": {
    id: "game-reading",
    name: "Leitura de Jogo",
    displayName: "Leitura de Jogo",
    description: "Analisar e interpretar o jogo",
    level: "Intermediário",
    fileName: "leitura-de-jogo.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Game Reading",
    englishDescription: "Analyzing and interpreting the game",
    category: "intermediario"
  },
  "adaptacao": {
    id: "adaptation",
    name: "Adaptação",
    displayName: "Adaptação",
    description: "Adaptar-se a diferentes situações",
    level: "Intermediário",
    fileName: "adaptacao.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Adaptation",
    englishDescription: "Adapting to different situations",
    category: "intermediario"
  },
  "consistencia": {
    id: "consistency",
    name: "Consistência",
    displayName: "Consistência",
    description: "Manter performance constante",
    level: "Intermediário",
    fileName: "consistencia.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Consistency",
    englishDescription: "Maintaining consistent performance",
    category: "intermediario"
  },
  "selecao-de-golpes": {
    id: "shot-selection",
    name: "Seleção de Golpes",
    displayName: "Seleção de Golpes",
    description: "Escolher o golpe certo na hora certa",
    level: "Intermediário",
    fileName: "selecao-de-golpes.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Shot Selection",
    englishDescription: "Choosing the right shot at the right time",
    category: "intermediario"
  },
  "lidar-com-bangers": {
    id: "handling-bangers",
    name: "Lidar com Bangers",
    displayName: "Lidar com Bangers",
    description: "Estratégias contra jogadores agressivos",
    level: "Intermediário",
    fileName: "lidar-com-bangers.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Handling Bangers",
    englishDescription: "Strategies against aggressive players",
    category: "intermediario"
  },
  "variacoes-de-saque-intermediario": {
    id: "intermediate-serve-variations",
    name: "Variações de Saque Intermediário",
    displayName: "Variações de Saque Intermediário",
    description: "Diferentes tipos de saque",
    level: "Intermediário",
    fileName: "variacoes-de-saque-intermediario.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Intermediate Serve Variations",
    englishDescription: "Different types of serves",
    category: "intermediario"
  },
  "tipos-de-voleios-pickleball": {
    id: "volley-types",
    name: "Tipos de Voleios",
    displayName: "Tipos de Voleios",
    description: "Diferentes tipos de voleio",
    level: "Intermediário",
    fileName: "tipos-de-voleios-pickleball.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Volley Types",
    englishDescription: "Different types of volleys",
    category: "intermediario"
  },
  "tipos-de-dink-pickleball": {
    id: "dink-types",
    name: "Tipos de Dink",
    displayName: "Tipos de Dink",
    description: "Diferentes tipos de dink",
    level: "Intermediário",
    fileName: "tipos-de-dink-pickleball.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Dink Types",
    englishDescription: "Different types of dinks",
    category: "intermediario"
  },
  "mecanicas-fundamentais": {
    id: "fundamental-mechanics",
    name: "Mecânicas Fundamentais",
    displayName: "Mecânicas Fundamentais",
    description: "Biomecânica correta para consistência e controle",
    level: "Intermediário",
    fileName: "mecanicas-fundamentais.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Fundamental Mechanics",
    englishDescription: "Correct biomechanics for consistency and control",
    category: "intermediario"
  },
  "analise-de-pontos": {
    id: "point-analysis",
    name: "Análise de Pontos e Padrões de Jogo",
    displayName: "Análise de Pontos",
    description: "Analise sequências de pontos e identifique padrões",
    level: "Intermediário",
    fileName: "analise-de-pontos.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Point Analysis and Game Patterns",
    englishDescription: "Learn to analyze point sequences and identify opponent patterns",
    category: "intermediario"
  },
  "preparacao-mental-intermediaria": {
    id: "intermediate-mental-prep",
    name: "Preparação Mental Intermediária",
    displayName: "Preparação Mental Intermediária",
    description: "Técnicas de foco, confiança e controle emocional",
    level: "Intermediário",
    fileName: "preparacao-mental-intermediaria.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Intermediate Mental Preparation",
    englishDescription: "Develop focus, confidence and emotional control techniques",
    category: "intermediario"
  },
  "estrategias-saque-devolucao-avancadas": {
    id: "advanced-serve-return-strategies",
    name: "Estratégias de Saque e Devolução Avançadas",
    displayName: "Estratégias Saque/Devolução",
    description: "Variações táticas de saque e devolução",
    level: "Intermediário",
    fileName: "estrategias-saque-devolucao-avancadas.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Advanced Serve and Return Strategies",
    englishDescription: "Master tactical variations of serve and return",
    category: "intermediario"
  },
  "controle-mental": {
    id: "mental-control",
    name: "Controle Mental no Pickleball",
    displayName: "Controle Mental",
    description: "Técnicas de controle mental e mentalidade",
    level: "Intermediário",
    fileName: "controle-mental.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Mental Control in Pickleball",
    englishDescription: "Mental control and mindset techniques",
    category: "intermediario"
  },
  "exercicios-mobilidade-forca": {
    id: "mobility-strength-exercises",
    name: "Exercícios de Mobilidade e Força",
    displayName: "Mobilidade e Força",
    description: "Exercícios específicos de mobilidade e força para pickleball",
    level: "Intermediário",
    fileName: "exercicios-mobilidade-forca.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "Mobility and Strength Exercises",
    englishDescription: "Specific mobility and strength exercises for pickleball",
    category: "intermediario"
  },
  "sistema-de-semaforo": {
    id: "traffic-light-system",
    name: "O Sistema de Semáforo",
    displayName: "Sistema de Semáforo",
    description: "Heurística profissional para decisões inteligentes no pickleball",
    level: "Intermediário",
    fileName: "sistema-de-semaforo.md",
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    englishName: "The Traffic Light System",
    englishDescription: "Professional heuristic for smart decisions in pickleball",
    category: "intermediario"
  },

  // AVANÇADO
  "smash": {
    id: "smash",
    name: "Smash",
    displayName: "Smash",
    description: "Golpe de finalização",
    level: "Avançado",
    fileName: "smash.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Smash",
    englishDescription: "Finishing shot",
    category: "avancado"
  },
  "acelerar-as-bolas": {
    id: "speeding-up-balls",
    name: "Acelerar as Bolas",
    displayName: "Acelerar as Bolas",
    description: "Aumentar velocidade",
    level: "Avançado",
    fileName: "acelerar-as-bolas.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Speeding Up Balls",
    englishDescription: "Increasing speed",
    category: "avancado"
  },
  "reset": {
    id: "reset",
    name: "Reset",
    displayName: "Reset",
    description: "Recuperar controle do ponto",
    level: "Avançado",
    fileName: "reset.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Reset",
    englishDescription: "Regaining point control",
    category: "avancado"
  },
  "ataque": {
    id: "attack",
    name: "Ataque",
    displayName: "Ataque",
    description: "Estratégias ofensivas",
    level: "Avançado",
    fileName: "ataque.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Attack",
    englishDescription: "Offensive strategies",
    category: "avancado"
  },
  "mental-game": {
    id: "mental-game",
    name: "Mental Game",
    displayName: "Mental Game",
    description: "Aspectos mentais do jogo",
    level: "Avançado",
    fileName: "mental-game.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Mental Game",
    englishDescription: "Mental aspects of the game",
    category: "avancado"
  },
  "erne": {
    id: "erne",
    name: "Erne",
    displayName: "Erne",
    description: "Golpe especial de voleio",
    level: "Avançado",
    fileName: "erne.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Erne",
    englishDescription: "Special volley shot",
    category: "avancado"
  },
  "atp-around-the-post": {
    id: "atp-around-post",
    name: "ATP Around the Post",
    displayName: "ATP Around the Post",
    description: "Golpe ao redor do poste",
    level: "Avançado",
    fileName: "atp-around-the-post.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "ATP Around the Post",
    englishDescription: "Shot around the post",
    category: "avancado"
  },
  "stacking": {
    id: "stacking",
    name: "Stacking",
    displayName: "Stacking",
    description: "Formação estratégica em duplas",
    level: "Avançado",
    fileName: "stacking.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Stacking",
    englishDescription: "Strategic formation in doubles",
    category: "avancado"
  },
  "switching": {
    id: "switching",
    name: "Switching",
    displayName: "Switching",
    description: "Troca de posições em duplas",
    level: "Avançado",
    fileName: "switching.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Switching",
    englishDescription: "Position switching in doubles",
    category: "avancado"
  },
  "poaching": {
    id: "poaching",
    name: "Poaching",
    displayName: "Poaching",
    description: "Interceptar bolas do parceiro",
    level: "Avançado",
    fileName: "poaching.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Poaching",
    englishDescription: "Intercepting partner's balls",
    category: "avancado"
  },
  "finalizacoes": {
    id: "finishes",
    name: "Finalizações",
    displayName: "Finalizações",
    description: "Técnicas de finalização",
    level: "Avançado",
    fileName: "finalizacoes.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Finishes",
    englishDescription: "Finishing techniques",
    category: "avancado"
  },
  "jogo-singles": {
    id: "singles-play",
    name: "Jogo Singles",
    displayName: "Jogo Singles",
    description: "Estratégias para jogo individual",
    level: "Avançado",
    fileName: "jogo-singles.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Singles Play",
    englishDescription: "Strategies for individual play",
    category: "avancado"
  },
  "torneios": {
    id: "tournaments",
    name: "Torneios",
    displayName: "Torneios",
    description: "Preparação para competições",
    level: "Avançado",
    fileName: "torneios.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Tournaments",
    englishDescription: "Competition preparation",
    category: "avancado"
  },
  "golpes-especiais": {
    id: "special-shots",
    name: "Golpes Especiais",
    displayName: "Golpes Especiais",
    description: "Golpes únicos e avançados",
    level: "Avançado",
    fileName: "golpes-especiais.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Special Shots",
    englishDescription: "Unique and advanced shots",
    category: "avancado"
  },
  "tecnicas-avancadas": {
    id: "advanced-techniques",
    name: "Técnicas Avançadas",
    displayName: "Técnicas Avançadas",
    description: "Técnicas complexas",
    level: "Avançado",
    fileName: "tecnicas-avancadas.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Advanced Techniques",
    englishDescription: "Complex techniques",
    category: "avancado"
  },
  "pressao-mental": {
    id: "mental-pressure",
    name: "Pressão Mental",
    displayName: "Pressão Mental",
    description: "Lidar com pressão",
    level: "Avançado",
    fileName: "pressao-mental.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Mental Pressure",
    englishDescription: "Dealing with pressure",
    category: "avancado"
  },
  "execucao-sob-pressao": {
    id: "execution-under-pressure",
    name: "Execução Sob Pressão",
    displayName: "Execução Sob Pressão",
    description: "Performance em situações difíceis",
    level: "Avançado",
    fileName: "execucao-sob-pressao.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Execution Under Pressure",
    englishDescription: "Performance in difficult situations",
    category: "avancado"
  },
  "lideranca-em-quadra": {
    id: "court-leadership",
    name: "Liderança em Quadra",
    displayName: "Liderança em Quadra",
    description: "Liderar em quadra",
    level: "Avançado",
    fileName: "lideranca-em-quadra.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Court Leadership",
    englishDescription: "Leading on court",
    category: "avancado"
  },
  "tecnicas-de-decepcao-engano": {
    id: "deception-techniques",
    name: "Técnicas de Decepção",
    displayName: "Técnicas de Decepção",
    description: "Usar decepção para confundir oponentes",
    level: "Avançado",
    fileName: "tecnicas-de-decepcao-engano.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Deception Techniques",
    englishDescription: "Using deception to confuse opponents",
    category: "avancado"
  },
  "recuperacao-e-cobertura-quadra-avancada": {
    id: "advanced-court-coverage",
    name: "Recuperação e Cobertura de Quadra",
    displayName: "Recuperação e Cobertura de Quadra",
    description: "Cobertura avançada da quadra",
    level: "Avançado",
    fileName: "recuperacao-e-cobertura-quadra-avancada.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Advanced Court Coverage",
    englishDescription: "Advanced court coverage",
    category: "avancado"
  },
  "quimica-e-sinergia-duplas-avancadas": {
    id: "advanced-doubles-synergy",
    name: "Química e Sinergia em Duplas",
    displayName: "Química e Sinergia em Duplas",
    description: "Sinergia avançada em duplas",
    level: "Avançado",
    fileName: "quimica-e-sinergia-duplas-avancadas.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Advanced Doubles Synergy",
    englishDescription: "Advanced synergy in doubles",
    category: "avancado"
  },
  "selecao-de-golpes-avancada": {
    id: "advanced-shot-selection",
    name: "Seleção de Golpes Avançada",
    displayName: "Seleção de Golpes",
    description: "Tomada de decisão tática em alto nível",
    level: "Avançado",
    fileName: "selecao-de-golpes-avancada.md",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    englishName: "Advanced Shot Selection",
    englishDescription: "High-level tactical decision making",
    category: "avancado"
  },
  "construcao-de-pontos": {
    id: "point-construction",
    name: "Construção de Pontos",
    displayName: "Construção de Pontos",
    description: "Sistemas táticos para construir pontos e controlar o jogo",
    level: "Avançado",
    fileName: "construcao-de-pontos.md",
    color: "bg-gradient-to-br from-red-600 to-red-700",
    englishName: "Point Construction",
    englishDescription: "Tactical systems to build points and control the game",
    category: "avancado"
  },
  "analise-de-video": {
    id: "video-analysis",
    name: "Análise de Vídeo e Autoavaliação",
    displayName: "Análise de Vídeo",
    description: "Grave e analise vídeos do seu jogo",
    level: "Avançado",
    fileName: "analise-de-video.md",
    color: "bg-gradient-to-br from-red-600 to-red-700",
    englishName: "Video Analysis and Self-Assessment",
    englishDescription: "Learn to record, analyze and use videos of your own game",
    category: "avancado"
  },
  "preparacao-fisica-avancada-competicoes": {
    id: "advanced-physical-prep-competitions",
    name: "Preparação Física Avançada para Competições",
    displayName: "Preparação Física Avançada",
    description: "Programa completo de preparação física para torneios",
    level: "Avançado",
    fileName: "preparacao-fisica-avancada-competicoes.md",
    color: "bg-gradient-to-br from-red-600 to-red-700",
    englishName: "Advanced Physical Preparation for Competitions",
    englishDescription: "Develop a complete physical preparation program for tournaments",
    category: "avancado"
  },
  "scouting-analise-oponentes": {
    id: "scouting-opponent-analysis",
    name: "Estratégias de Scouting e Análise de Oponentes",
    displayName: "Scouting e Análise",
    description: "Estude oponentes e identifique fraquezas",
    level: "Avançado",
    fileName: "scouting-analise-oponentes.md",
    color: "bg-gradient-to-br from-red-600 to-red-700",
    englishName: "Scouting and Opponent Analysis Strategies",
    englishDescription: "Learn to study opponents before playing and identify weaknesses",
    category: "avancado"
  },
  "jogo-da-porcentagem": {
    id: "percentage-play",
    name: "Jogo da Porcentagem",
    displayName: "Jogo da Porcentagem",
    description: "Maximize sucesso e minimize erros",
    level: "Avançado",
    fileName: "jogo-da-porcentagem.md",
    color: "bg-gradient-to-br from-red-600 to-red-700",
    englishName: "Percentage Play",
    englishDescription: "Maximize success and minimize errors through percentage play",
    category: "avancado"
  },
  "drills-e-treinos-avancados": {
    id: "advanced-drills-training",
    name: "Drills e Treinos Avançados",
    displayName: "Drills Avançados",
    description: "Exercícios avançados para refinar habilidades e preparar para competições",
    level: "Avançado",
    fileName: "drills-e-treinos-avancados.md",
    color: "bg-gradient-to-br from-red-600 to-red-700",
    englishName: "Advanced Drills and Training",
    englishDescription: "Advanced exercises to refine skills and prepare for competitions",
    category: "avancado"
  },
  "maestria-no-pickleball": {
    id: "pickleball-mastery",
    name: "Maestria no Pickleball",
    displayName: "Maestria no Pickleball",
    description: "A ciência da construção de pontos e controle da quadra no nível elite",
    level: "Avançado",
    fileName: "maestria-no-pickleball.md",
    color: "bg-gradient-to-br from-red-600 to-red-700",
    englishName: "Pickleball Mastery",
    englishDescription: "The science of point construction and court control at elite level",
    category: "avancado"
  },

  // TÁTICAS
  "controle-de-ritmo": {
    id: "pace-control",
    name: "Controle de Ritmo",
    displayName: "Controle de Ritmo",
    description: "Controlar a velocidade do jogo através de variações estratégicas",
    level: "Táticas",
    fileName: "controle-de-ritmo.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Pace Control",
    englishDescription: "Controlling game speed",
    category: "taticas"
  },
  "jogo-no-meio": {
    id: "middle-play",
    name: "Jogo no Meio",
    displayName: "Jogo no Meio",
    description: "Estratégias para dominar o jogo no meio da quadra",
    level: "Táticas",
    fileName: "jogo-no-meio.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Middle Play",
    englishDescription: "Middle court strategies",
    category: "taticas"
  },
  "explorar-fraquezas": {
    id: "exploit-weaknesses",
    name: "Explorar Fraquezas",
    displayName: "Explorar Fraquezas",
    description: "Identificar e explorar pontos fracos",
    level: "Táticas",
    fileName: "explorar-fraquezas.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Exploit Weaknesses",
    englishDescription: "Identify and exploit weak points",
    category: "taticas"
  },
  "variacao-de-altura": {
    id: "height-variation",
    name: "Variação de Altura",
    displayName: "Variação de Altura",
    description: "Variações de altura das bolas",
    level: "Táticas",
    fileName: "variacao-de-altura.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Height Variation",
    englishDescription: "Ball height variations",
    category: "taticas"
  },
  "pressao-constante": {
    id: "constant-pressure",
    name: "Pressão Constante",
    displayName: "Pressão Constante",
    description: "Manter pressão constante no adversário para forçar erros",
    level: "Táticas",
    fileName: "pressao-constante.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Constant Pressure",
    englishDescription: "Maintaining pressure on opponent",
    category: "taticas"
  },
  "jogo-cruzado": {
    id: "cross-court-play",
    name: "Jogo Cruzado",
    displayName: "Jogo Cruzado",
    description: "Estratégias de jogadas cruzadas para abrir a quadra",
    level: "Táticas",
    fileName: "jogo-cruzado.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Cross-court Play",
    englishDescription: "Cross-court strategies",
    category: "taticas"
  },
  "isolamento-de-jogador": {
    id: "player-isolation",
    name: "Isolamento de Jogador",
    displayName: "Isolamento de Jogador",
    description: "Explorar fraquezas individuais",
    level: "Táticas",
    fileName: "isolamento-de-jogador.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Player Isolation",
    englishDescription: "Isolating a specific player",
    category: "taticas"
  },
  "variacao-de-velocidade": {
    id: "speed-variation",
    name: "Variação de Velocidade",
    displayName: "Variação de Velocidade",
    description: "Variações de velocidade para confundir e desequilibrar oponentes",
    level: "Táticas",
    fileName: "variacao-de-velocidade.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Speed Variation",
    englishDescription: "Speed changes",
    category: "taticas"
  },
  "variacao-de-direcao": {
    id: "direction-variation",
    name: "Variação de Direção",
    displayName: "Variação de Direção",
    description: "Variações de direção para surpreender e deslocar oponentes",
    level: "Táticas",
    fileName: "variacao-de-direcao.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Direction Variation",
    englishDescription: "Direction changes",
    category: "taticas"
  },
  "variacao-de-spin": {
    id: "spin-variation",
    name: "Variação de Spin",
    displayName: "Variação de Spin",
    description: "Variações de spin para controlar e dificultar a devolução do oponente",
    level: "Táticas",
    fileName: "variacao-de-spin.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Spin Variation",
    englishDescription: "Spin changes",
    category: "taticas"
  },
  "variacao-de-tempo": {
    id: "timing-variation",
    name: "Variação de Tempo",
    displayName: "Variação de Tempo",
    description: "Variações de timing para desequilibrar o ritmo do jogo",
    level: "Táticas",
    fileName: "variacao-de-tempo.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Timing Variation",
    englishDescription: "Timing changes",
    category: "taticas"
  },
  "variacao-de-posicao": {
    id: "position-variation",
    name: "Variação de Posição",
    displayName: "Variação de Posição",
    description: "Variações de posicionamento para criar oportunidades de ataque",
    level: "Táticas",
    fileName: "variacao-de-posicao.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Position Variation",
    englishDescription: "Position changes",
    category: "taticas"
  },
  "variacao-de-ritmo": {
    id: "rhythm-variation",
    name: "Variação de Ritmo",
    displayName: "Variação de Ritmo",
    description: "Variações de ritmo para manter o controle do jogo",
    level: "Táticas",
    fileName: "variacao-de-ritmo.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Rhythm Variation",
    englishDescription: "Rhythm changes",
    category: "taticas"
  },
  "variacao-de-estrategia": {
    id: "strategy-variation",
    name: "Variação de Estratégia",
    displayName: "Variação de Estratégia",
    description: "Variações de estratégia para manter o adversário desequilibrado",
    level: "Táticas",
    fileName: "variacao-de-estrategia.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Strategy Variation",
    englishDescription: "Strategy changes",
    category: "taticas"
  },
  "variacao-de-formacao": {
    id: "formation-variation",
    name: "Variação de Formação",
    displayName: "Variação de Formação",
    description: "Variações de formação para otimizar a cobertura da quadra em duplas",
    level: "Táticas",
    fileName: "variacao-de-formacao.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Formation Variation",
    englishDescription: "Formation changes",
    category: "taticas"
  },
  "variacao-de-cobertura": {
    id: "coverage-variation",
    name: "Variação de Cobertura",
    displayName: "Variação de Cobertura",
    description: "Variações de cobertura para melhorar a defesa em duplas",
    level: "Táticas",
    fileName: "variacao-de-cobertura.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Coverage Variation",
    englishDescription: "Coverage changes",
    category: "taticas"
  },
  "variacao-de-comunicacao": {
    id: "communication-variation",
    name: "Variação de Comunicação",
    displayName: "Variação de Comunicação",
    description: "Mudanças de comunicação",
    level: "Táticas",
    fileName: "variacao-de-comunicacao.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Communication Variation",
    englishDescription: "Communication changes",
    category: "taticas"
  },
  "variacao-de-mental": {
    id: "mental-variation",
    name: "Variação Mental",
    displayName: "Variação Mental",
    description: "Mudanças mentais",
    level: "Táticas",
    fileName: "variacao-de-mental.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Mental Variation",
    englishDescription: "Mental changes",
    category: "taticas"
  },
  "variacao-de-fisica": {
    id: "physical-variation",
    name: "Variação Física",
    displayName: "Variação Física",
    description: "Mudanças físicas",
    level: "Táticas",
    fileName: "variacao-de-fisica.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Physical Variation",
    englishDescription: "Physical changes",
    category: "taticas"
  },
  "variacao-de-tecnica": {
    id: "technique-variation",
    name: "Variação de Técnica",
    displayName: "Variação de Técnica",
    description: "Mudanças de técnica",
    level: "Táticas",
    fileName: "variacao-de-tecnica.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Technique Variation",
    englishDescription: "Technique changes",
    category: "taticas"
  },
  "variacao-de-tatica": {
    id: "tactical-variation",
    name: "Variação de Tática",
    displayName: "Variação de Tática",
    description: "Mudanças de tática",
    level: "Táticas",
    fileName: "variacao-de-tatica.md",
    color: "bg-gradient-to-br from-violet-400 to-purple-600",
    englishName: "Tactical Variation",
    englishDescription: "Tactical changes",
    category: "taticas"
  }
};

// 🎯 FUNÇÕES UTILITÁRIAS PARA GERAR DADOS AUTOMATICAMENTE

export function getAllSections(): string[] {
  return Object.keys(CONTENT_REGISTRY);
}

export function getSectionsByLevel(level: ContentLevel): string[] {
  return Object.entries(CONTENT_REGISTRY)
    .filter(([, config]) => config.level === level)
    .map(([key]) => key);
}

export function getSectionsByCategory(category: 'basico' | 'intermediario' | 'avancado' | 'taticas'): string[] {
  return Object.entries(CONTENT_REGISTRY)
    .filter(([, config]) => config.category === category)
    .map(([key]) => key);
}

export function getSectionConfig(sectionId: string): SectionConfig | undefined {
  return CONTENT_REGISTRY[sectionId];
}

export function getSectionColors(): Record<string, string> {
  const colors: Record<string, string> = {};
  Object.entries(CONTENT_REGISTRY).forEach(([key, config]) => {
    colors[key] = config.color;
  });
  return colors;
}

export function getDisplayNames(): Record<string, string> {
  const names: Record<string, string> = {};
  Object.entries(CONTENT_REGISTRY).forEach(([key, config]) => {
    names[key] = config.displayName;
  });
  return names;
}

export function getSectionDescriptions(): Record<string, string> {
  const descriptions: Record<string, string> = {};
  Object.entries(CONTENT_REGISTRY).forEach(([key, config]) => {
    descriptions[config.name] = config.description;
  });
  return descriptions;
}

export function getEnglishTranslations(): Record<string, string> {
  const translations: Record<string, string> = {};
  Object.entries(CONTENT_REGISTRY).forEach(([, config]) => {
    translations[config.name] = config.englishName;
  });
  return translations;
}

export function getSectionIds(): Record<string, string> {
  const ids: Record<string, string> = {};
  Object.entries(CONTENT_REGISTRY).forEach(([key, config]) => {
    ids[key] = config.id;
  });
  return ids;
}

export function getIdToSection(): Record<string, string> {
  const mapping: Record<string, string> = {};
  Object.entries(CONTENT_REGISTRY).forEach(([key, config]) => {
    mapping[config.id] = key;
  });
  return mapping;
}

export function getSectionLevels(): Record<string, ContentLevel> {
  const levels: Record<string, ContentLevel> = {};
  Object.entries(CONTENT_REGISTRY).forEach(([key, config]) => {
    levels[key] = config.level;
  });
  return levels;
}

// 🎯 FUNÇÃO PARA ADICIONAR NOVA SEÇÃO (SIMPLIFICADA)
export function addNewSection(config: Omit<SectionConfig, 'id' | 'fileName'>): SectionConfig {
  const id = config.name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  
  const fileName = `${id}.md`;
  
  const newConfig: SectionConfig = {
    ...config,
    id,
    fileName
  };
  
  // Adicionar ao registro
  CONTENT_REGISTRY[id] = newConfig;
  
  return newConfig;
}

// 🎯 ESTATÍSTICAS AUTOMÁTICAS
export function getContentStatistics() {
  const sections = Object.values(CONTENT_REGISTRY);
  const total = sections.length;
  
  const byLevel = sections.reduce((acc, section) => {
    acc[section.level] = (acc[section.level] || 0) + 1;
    return acc;
  }, {} as Record<ContentLevel, number>);
  
  const byCategory = sections.reduce((acc, section) => {
    acc[section.category] = (acc[section.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total,
    byLevel,
    byCategory,
    percentages: {
      basico: Math.round((byCategory.basico / total) * 100),
      intermediario: Math.round((byCategory.intermediario / total) * 100),
      avancado: Math.round((byCategory.avancado / total) * 100),
      taticas: Math.round((byCategory.taticas / total) * 100)
    }
  };
}
