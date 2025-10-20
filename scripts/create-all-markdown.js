const fs = require('fs');
const path = require('path');

// Seções organizadas por nível
const sections = {
  basic: [
    "Footwork", "Posicionamento", "Empunhadura", "Aquecimento", "Erros Comuns", 
    "Dicas", "Equipamentos", "Golpes Fundamentais", "Técnica de Base", "Concentração", "Respiração"
  ],
  intermediate: [
    "Lob", "Transição", "Jogo de Duplas", "Defesa", "Bloqueio", "Spin", 
    "Contra-ataque", "Comunicação", "Drills e Treinos", "Preparação Física", 
    "Estratégia de Jogo", "Tempo de Reação", "Antecipação", "Leitura de Jogo", 
    "Adaptação", "Consistência"
  ],
  advanced: [
    "Acelerar as bolas", "Ataque", "Mental Game", "Erne", "ATP (Around The Post)", 
    "Stacking", "Switching", "Poaching", "Finalizações", "Jogo Singles", 
    "Torneios", "Golpes Especiais", "Técnicas Avançadas", "Pressão Mental", 
    "Execução Sob Pressão", "Liderança em Quadra"
  ],
  tactics: [
    "Jogo no Meio", "Explorar Fraquezas", "Variação de Altura", "Pressão Constante", 
    "Jogo Cruzado", "Isolamento de Jogador", "Mudança de Direção", "Jogo de Paciência", 
    "Ataque ao Corpo", "Uso do Lob Tático", "Forçar Erros", "Estratégias de Abertura", 
    "Controle de Ponto", "Quebra de Ritmo", "Exploração de Ângulos", 
    "Jogos Mentais", "Adaptação Tática"
  ]
};

// Templates de conteúdo por nível
const templates = {
  basic: {
    level: "Básico",
    description: "Aprenda os fundamentos essenciais do pickleball para começar a jogar com confiança.",
    tips: [
      "Pratique regularmente",
      "Foque na técnica básica",
      "Mantenha a calma",
      "Comunique com seu parceiro",
      "Observe o adversário",
      "Pratique a consistência",
      "Use equipamentos adequados",
      "Aqueça antes de jogar"
    ]
  },
  intermediate: {
    level: "Intermediário", 
    description: "Desenvolva suas habilidades intermediárias para elevar seu nível de jogo.",
    tips: [
      "Varie suas técnicas",
      "Desenvolva estratégias",
      "Melhore a comunicação",
      "Pratique drills específicos",
      "Trabalhe na consistência",
      "Observe padrões do jogo",
      "Adapte-se às situações",
      "Mantenha o foco"
    ]
  },
  advanced: {
    level: "Avançado",
    description: "Domine técnicas avançadas e estratégias complexas para competir em alto nível.",
    tips: [
      "Execute com precisão",
      "Use técnicas avançadas",
      "Mantenha a pressão",
      "Adapte-se rapidamente",
      "Lidere em quadra",
      "Execute sob pressão",
      "Use estratégias complexas",
      "Mantenha a concentração"
    ]
  },
  tactics: {
    level: "Táticas",
    description: "Aprenda estratégias táticas avançadas para dominar o adversário e controlar o jogo.",
    tips: [
      "Analise o adversário",
      "Use variações táticas",
      "Controle o ritmo",
      "Explore fraquezas",
      "Mantenha a pressão",
      "Adapte-se constantemente",
      "Use jogos mentais",
      "Execute estratégias complexas"
    ]
  }
};

// Função para criar conteúdo de exemplo
function createContent(section, level) {
  const template = templates[level];
  
  return `---
title: "${section}"
description: "${template.description}"
level: "${template.level}"
lastModified: "2025-01-19T18:30:00.000Z"
author: "Fabrício Ziliotti"
tags: ["${section.toLowerCase()}", "${level}", "técnica", "estratégia"]
tips:
${template.tips.map(tip => `  - "${tip}"`).join('\n')}
---

# ${section}

${template.description}

## Conceitos Básicos

### Fundamentos
- **Técnica**: Base sólida é essencial
- **Prática**: Consistência vem com repetição
- **Estratégia**: Pense antes de agir
- **Comunicação**: Trabalhe com seu parceiro

### Desenvolvimento
- **Iniciante**: Foque nos fundamentos
- **Intermediário**: Desenvolva variações
- **Avançado**: Execute com precisão
- **Expert**: Domine todas as situações

## Técnicas Principais

### Básicas
- Posicionamento correto
- Movimento eficiente
- Controle da bola
- Comunicação clara

### Intermediárias
- Variação de golpes
- Estratégias táticas
- Leitura de jogo
- Adaptação rápida

### Avançadas
- Execução precisa
- Pressão constante
- Liderança em quadra
- Controle mental

## Estratégias

### Para Iniciantes
- **Foque** na técnica básica
- **Pratique** regularmente
- **Comunique** com seu parceiro
- **Mantenha** a calma

### Para Intermediários
- **Varie** suas técnicas
- **Desenvolva** estratégias
- **Melhore** a comunicação
- **Pratique** drills específicos

### Para Avançados
- **Execute** com precisão
- **Use** técnicas avançadas
- **Mantenha** a pressão
- **Adapte-se** rapidamente

## Vídeos Educativos

### Técnica Básica
<div class="youtube-video">
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&fs=1&cc_load_policy=1" title="Técnica Básica - ${section}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

### Estratégias Avançadas
<div class="youtube-video">
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&fs=1&cc_load_policy=1&start=30" title="Estratégias Avançadas - ${section}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Links Úteis

<a href="https://www.pickleball.com/learning-center/${section.toLowerCase().replace(/\s+/g, '-')}" target="_blank" rel="noopener noreferrer" class="external-link">
  <svg fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
  </svg>
  Centro de Aprendizado - ${section}
</a>

<a href="https://www.pickleball.com/strategy/${section.toLowerCase().replace(/\s+/g, '-')}-strategies" target="_blank" rel="noopener noreferrer" class="external-link">
  <svg fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
  </svg>
  Estratégias de ${section}
</a>

<a href="https://www.youtube.com/c/PickleballChannel" target="_blank" rel="noopener noreferrer" class="external-link">
  <svg fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
  </svg>
  Pickleball Channel - YouTube
</a>

## Próximos Passos

- Pratique regularmente
- Desenvolva suas habilidades
- Melhore a comunicação
- Trabalhe com seu parceiro
- Assista aos vídeos educativos
- Consulte os recursos de estratégia

---

*${section} é fundamental para seu desenvolvimento no pickleball. Pratique e melhore constantemente.*`;
}

// Criar diretório se não existir
const contentDir = path.join(process.cwd(), 'content', 'sections');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Criar arquivos para todas as seções
let totalCreated = 0;

Object.entries(sections).forEach(([level, sectionList]) => {
  sectionList.forEach(section => {
    const fileName = `${section}.md`;
    const filePath = path.join(contentDir, fileName);
    
    // Verificar se o arquivo já existe
    if (fs.existsSync(filePath)) {
      console.log(`Arquivo ${fileName} já existe, pulando...`);
      return;
    }
    
    const content = createContent(section, level);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Criado: ${fileName}`);
    totalCreated++;
  });
});

console.log(`\n✅ Total de arquivos criados: ${totalCreated}`);
console.log('🎉 Todos os arquivos Markdown foram criados com sucesso!');
