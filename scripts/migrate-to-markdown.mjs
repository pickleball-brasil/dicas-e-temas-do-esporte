import fs from 'fs';
import path from 'path';

// Dados das seções (copiados dos arquivos TypeScript)
const BASIC_SECTIONS = [
  "Regras", "Saque", "Devolução", "Dink", "Voleio", "Footwork", "Posicionamento",
  "Empunhadura", "Aquecimento", "Erros Comuns", "Dicas", "Equipamentos",
  "Golpes Fundamentais", "Técnica de Base", "Concentração", "Respiração"
];

const INTERMEDIATE_SECTIONS = [
  "Drop Shot", "Terceira bola", "Lob", "Transição", "Jogo de Duplas", "Defesa",
  "Bloqueio", "Spin", "Contra-ataque", "Comunicação", "Drills e Treinos",
  "Preparação Física", "Estratégia de Jogo", "Tempo de Reação", "Antecipação",
  "Leitura de Jogo", "Adaptação", "Consistência"
];

const ADVANCED_SECTIONS = [
  "Smash", "Acelerar as bolas", "Reset", "Ataque", "Mental Game", "Erne",
  "ATP (Around The Post)", "Stacking", "Switching", "Poaching", "Finalizações",
  "Jogo Singles", "Torneios", "Golpes Especiais", "Técnicas Avançadas",
  "Pressão Mental", "Execução Sob Pressão", "Liderança em Quadra"
];

const TACTICS_SECTIONS = [
  "Controle de Ritmo", "Jogo no Meio", "Explorar Fraquezas", "Variação de Altura",
  "Pressão Constante", "Jogo Cruzado", "Isolamento de Jogador", "Mudança de Direção",
  "Jogo de Paciência", "Ataque ao Corpo", "Uso do Lob Tático", "Forçar Erros",
  "Estratégias de Abertura", "Controle de Ponto", "Quebra de Ritmo",
  "Exploração de Ângulos", "Jogos Mentais", "Adaptação Tática"
];

const SECTIONS = [
  ...BASIC_SECTIONS,
  ...INTERMEDIATE_SECTIONS,
  ...ADVANCED_SECTIONS,
  ...TACTICS_SECTIONS
];

function getSectionLevel(section) {
  if (BASIC_SECTIONS.includes(section)) return "Básico";
  if (INTERMEDIATE_SECTIONS.includes(section)) return "Intermediário";
  if (TACTICS_SECTIONS.includes(section)) return "Táticas";
  return "Avançado";
}

// Dicas das seções (dados simplificados para o exemplo)
const sectionTips = {
  "Regras": [
    "A zona da cozinha tem 7 pés de profundidade - não pode pisar na linha ao volear",
    "Saque deve ser por baixo (underhand) e na diagonal",
    "Apenas o time que está sacando pode pontuar",
    "A bola deve quicar uma vez de cada lado antes de poder volear"
  ],
  "Saque": [
    "Contato com a bola abaixo da cintura, cabeça da raquete abaixo do punho",
    "Mire profundo, perto da linha de fundo",
    "Varie entre corpo e cantos para manter adversário adivinhando",
    "Desenvolva rotina pré-saque (respirar, quicar) para consistência"
  ],
  "Devolução": [
    "Sempre devolva profundo para ganhar tempo de avançar",
    "Mire no meio ou no jogador mais fraco",
    "Use topspin para manter a bola baixa após o quique",
    "Prepare-se para avançar 2-3 passos após devolver"
  ],
  "Dink": [
    "Joelhos flexionados, corpo baixo, pulso firme",
    "Dink cruzado é mais seguro (mais distância e ângulo)",
    "Mire para os pés do adversário, mantenha bola baixa",
    "Seja paciente - não force o ataque prematuramente"
  ],
  "Voleio": [
    "Raquete alta e na frente do corpo, movimentos curtos",
    "Bloqueie ao invés de balançar forte",
    "Posicione-se a um braço de distância da rede",
    "Voleie para baixo quando possível"
  ]
};

const contentDir = path.join(__dirname, '..', 'content', 'sections');

// Garantir que o diretório existe
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Função para criar arquivo Markdown para uma seção
function createMarkdownFile(section) {
  const tips = sectionTips[section] || [];
  const level = getSectionLevel(section);
  
  // Criar descrição baseada no nome da seção
  const descriptions = {
    'Regras': 'Conheça as regras fundamentais do pickleball para jogar corretamente.',
    'Saque': 'Domine a técnica de saque para começar cada ponto com vantagem.',
    'Devolução': 'Aprenda a devolver o saque de forma eficaz e estratégica.',
    'Dink': 'Desenvolva o jogo de dink para controlar o ritmo do ponto.',
    'Voleio': 'Melhore sua técnica de voleio para finalizar pontos na rede.',
    'Footwork': 'Aprimore seu movimento e posicionamento na quadra.',
    'Posicionamento': 'Entenda onde se posicionar para maximizar sua cobertura.',
    'Empunhadura': 'Encontre a empunhadura ideal para seus golpes.',
    'Aquecimento': 'Prepare-se adequadamente antes de jogar.',
    'Erros Comuns': 'Evite os erros mais frequentes dos iniciantes.',
    'Dicas': 'Dicas gerais para melhorar seu jogo.',
    'Equipamentos': 'Escolha os equipamentos certos para seu nível.',
    'Golpes Fundamentais': 'Domine os golpes básicos do pickleball.',
    'Técnica de Base': 'Desenvolva uma base técnica sólida.',
    'Concentração': 'Mantenha o foco durante todo o jogo.',
    'Respiração': 'Use a respiração para controlar nervos e ritmo.'
  };

  const description = descriptions[section] || `Aprenda sobre ${section.toLowerCase()} no pickleball.`;

  const frontmatter = `---
title: "${section}"
description: "${description}"
level: "${level}"
lastModified: "${new Date().toISOString()}"
tips:
${tips.map(tip => `  - "${tip}"`).join('\n')}
---

# ${section}

${description}

## Dicas e Técnicas

${tips.map((tip, index) => `${index + 1}. ${tip}`).join('\n\n')}

## Conteúdo Adicional

*Esta seção está em desenvolvimento. Mais conteúdo será adicionado em breve.*

## Próximos Passos

- Pratique as técnicas descritas
- Aplique as dicas em seus jogos
- Continue estudando outras seções
`;

  const filePath = path.join(contentDir, `${section}.md`);
  fs.writeFileSync(filePath, frontmatter, 'utf8');
  console.log(`Criado: ${section}.md`);
}

// Migrar todas as seções
console.log('Iniciando migração para Markdown...');
SECTIONS.forEach(createMarkdownFile);
console.log('Migração concluída!');
