const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const contentDir = path.join(__dirname, '..', 'content', 'sections');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createSection() {
  console.log('=== Criador de Seção de Estudo ===\n');

  const sectionName = await question('Nome da seção: ');
  const description = await question('Descrição: ');
  
  console.log('\nNíveis disponíveis:');
  console.log('1. Básico');
  console.log('2. Intermediário');
  console.log('3. Avançado');
  console.log('4. Táticas');
  
  const levelChoice = await question('Escolha o nível (1-4): ');
  const levels = ['Básico', 'Intermediário', 'Avançado', 'Táticas'];
  const level = levels[parseInt(levelChoice) - 1] || 'Básico';

  const author = await question('Autor (opcional): ');
  const tags = await question('Tags (separadas por vírgula, opcional): ');

  console.log('\nDigite as dicas (uma por linha, digite "fim" para terminar):');
  const tips = [];
  let tip;
  do {
    tip = await question('Dica: ');
    if (tip.toLowerCase() !== 'fim' && tip.trim()) {
      tips.push(tip.trim());
    }
  } while (tip.toLowerCase() !== 'fim');

  console.log('\nDigite o conteúdo Markdown (digite "fim" para terminar):');
  const contentLines = [];
  let contentLine;
  do {
    contentLine = await question('> ');
    if (contentLine.toLowerCase() !== 'fim') {
      contentLines.push(contentLine);
    }
  } while (contentLine.toLowerCase() !== 'fim');

  const content = contentLines.join('\n');

  // Criar frontmatter
  const frontmatter = `---
title: "${sectionName}"
description: "${description}"
level: "${level}"
lastModified: "${new Date().toISOString()}"
${author ? `author: "${author}"` : ''}
${tags ? `tags: [${tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]` : ''}
tips:
${tips.map(tip => `  - "${tip}"`).join('\n')}
---

# ${sectionName}

${description}

${content}
`;

  // Salvar arquivo
  const fileName = `${sectionName.replace(/\s+/g, '-').toLowerCase()}.md`;
  const filePath = path.join(contentDir, fileName);
  
  fs.writeFileSync(filePath, frontmatter, 'utf8');
  
  console.log(`\n✅ Seção criada com sucesso: ${fileName}`);
  console.log(`📁 Localização: ${filePath}`);
  
  rl.close();
}

createSection().catch(console.error);
