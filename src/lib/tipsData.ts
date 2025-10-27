import { Section } from "./sections";

export interface Tip {
  id: string;
  text: string;
  completed?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface SectionTipsData {
  tips: Tip[];
  questions: QuizQuestion[];
}

// Base de dados de dicas por seção
export const TIPS_DATA: Partial<Record<Section, SectionTipsData>> = {
  "regras": {
    tips: [
      { id: "r1", text: "Entenda que cada jogo vai até 11 pontos e deve vencer por 2 pontos de diferença" },
      { id: "r2", text: "Lembre-se que apenas o time que está servindo pode marcar pontos" },
      { id: "r3", text: "A zona de não-voleio (kitchen) é uma área de 7 pés em cada lado da rede" },
      { id: "r4", text: "Você não pode pisar na zona de não-voleio durante um voleio, exceto após a bola quicar" },
      { id: "r5", text: "O saque deve ser feito com movimento de baixo para cima (underhand)" },
    ],
    questions: [
      {
        id: "q1",
        question: "Quantos pontos são necessários para vencer um jogo de pickleball?",
        options: ["9 pontos", "11 pontos", "15 pontos", "21 pontos"],
        correctAnswer: 1,
        explanation: "Um jogo de pickleball vai até 11 pontos, mas é preciso vencer por 2 pontos de diferença."
      },
      {
        id: "q2",
        question: "O que é a zona de não-voleio (kitchen)?",
        options: [
          "A área onde não se pode servir",
          "Uma área de 7 pés em cada lado da rede onde não se pode fazer voleio",
          "A área onde a bola deve cair no saque",
          "A área de penalidade"
        ],
        correctAnswer: 1,
        explanation: "A kitchen é uma área de 7 pés de cada lado da rede onde você não pode fazer voleio."
      }
    ]
  },
  "saque": {
    tips: [
      { id: "s1", text: "Use um movimento de baixo para cima com a palma da mão virada para cima" },
      { id: "s2", text: "Varie a profundidade do seu saque - algumas vezes curta, outras vezes funda" },
      { id: "s3", text: "Apunte para os pés do oponente para dificultar a devolução" },
      { id: "s4", text: "Use o spin para adicionar dificuldade ao saque" },
      { id: "s5", text: "Consistência é mais importante que potência no saque" },
    ],
    questions: [
      {
        id: "q1",
        question: "O movimento correto do saque é:",
        options: ["De cima para baixo (overhand)", "De baixo para cima (underhand)", "Lateral", "Qualquer movimento"],
        correctAnswer: 1,
        explanation: "O saque de pickleball deve ser feito com movimento de baixo para cima (underhand)."
      },
      {
        id: "q2",
        question: "Qual é mais importante no saque?",
        options: ["Potência", "Consistência", "Velocidade", "Spin"],
        correctAnswer: 1,
        explanation: "Consistência é fundamental para garantir que a bola entre em jogo e coloque pressão no oponente."
      }
    ]
  },
  "dink": {
    tips: [
      { id: "d1", text: "O dink é um golpe suave que coloca a bola na zona de não-voleio" },
      { id: "d2", text: "Use o dink para controlar o ritmo do jogo e esperar pela oportunidade de atacar" },
      { id: "d3", text: "Alveje os pés do oponente quando fizer um dink" },
      { id: "d4", text: "Tente colocar o dink o mais baixo possível sobre a rede" },
      { id: "d5", text: "Posicione-se na linha de não-voleio para executar dinks eficazes" },
    ],
    questions: [
      {
        id: "q1",
        question: "O objetivo principal do dink é:",
        options: [
          "Ganhar o ponto imediatamente",
          "Controlar o ritmo e criar oportunidades",
          "Aterrorizar o oponente",
          "Demonstrar habilidade"
        ],
        correctAnswer: 1,
        explanation: "O dink é usado para controlar o ritmo do jogo e criar oportunidades para golpes mais agressivos."
      }
    ]
  }
};

// Função para obter dicas de uma seção
export function getSectionTips(section: Section): Tip[] {
  return TIPS_DATA[section]?.tips || [];
}

// Função para obter questões de uma seção
export function getSectionQuestions(section: Section): QuizQuestion[] {
  return TIPS_DATA[section]?.questions || [];
}

// Função para verificar se uma seção tem dados de dicas
export function hasSectionTips(section: Section): boolean {
  return section in TIPS_DATA;
}

