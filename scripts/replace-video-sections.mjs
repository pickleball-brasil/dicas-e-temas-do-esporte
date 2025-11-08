import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const videoPlaceholder = `<div class="video-placeholder">
  <div class="video-placeholder-content">
    <svg class="video-placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div class="video-placeholder-text-container">
      <p class="video-placeholder-text">Vídeo Explicativo</p>
      <p class="video-placeholder-subtext">Será adicionado em breve</p>
    </div>
  </div>
</div>`;

// Função recursiva para encontrar todos os arquivos .md
function findMarkdownFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      findMarkdownFiles(filePath, fileList);
    } else if (extname(file) === '.md') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Padrão regex para encontrar a seção de vídeo completa (incluindo texto opcional antes do div)
const videoSectionPattern = /## Vídeo Demonstrativo[\s\S]*?<\/div>\s*<\/div>/g;

function replaceVideoSections() {
  try {
    const sectionsDir = join(process.cwd(), 'content', 'sections');
    const files = findMarkdownFiles(sectionsDir);
    
    let replacedCount = 0;
    
    for (const file of files) {
      const content = readFileSync(file, 'utf-8');
      
      // Verificar se o arquivo contém a seção de vídeo
      if (content.includes('## Vídeo Demonstrativo')) {
        // Substituir a seção completa - pega desde "## Vídeo Demonstrativo" até o fechamento do último </div>
        let newContent = content;
        
        // Primeiro, tentar o padrão completo com dois </div>
        newContent = newContent.replace(/## Vídeo Demonstrativo[\s\S]*?<\/div>\s*<\/div>/g, `## Vídeo Demonstrativo\n\n${videoPlaceholder}`);
        
        // Se não encontrou, tentar padrão com apenas um </div> (para casos sem div wrapper extra)
        if (newContent === content) {
          newContent = newContent.replace(/## Vídeo Demonstrativo[\s\S]*?<\/div>/g, `## Vídeo Demonstrativo\n\n${videoPlaceholder}`);
        }
        
        // Se ainda não encontrou, tentar padrão que captura até o próximo título ou separador
        if (newContent === content) {
          newContent = newContent.replace(/## Vídeo Demonstrativo[\s\S]*?(?=\n## |\n---|$)/g, `## Vídeo Demonstrativo\n\n${videoPlaceholder}`);
        }
        
        // Último recurso: remover tudo desde "## Vídeo Demonstrativo" até encontrar um padrão de fechamento de div ou fim de seção
        if (newContent === content) {
          // Remover texto e divs relacionados a vídeo
          newContent = newContent.replace(/## Vídeo Demonstrativo[\s\S]*?<div class="youtube-video">[\s\S]*?<\/div>/g, `## Vídeo Demonstrativo\n\n${videoPlaceholder}`);
          newContent = newContent.replace(/## Vídeo Demonstrativo[\s\S]*?<div class="vimeo-video">[\s\S]*?<\/div>/g, `## Vídeo Demonstrativo\n\n${videoPlaceholder}`);
          newContent = newContent.replace(/## Vídeo Demonstrativo[\s\S]*?<div class="video-container">[\s\S]*?<\/div>/g, `## Vídeo Demonstrativo\n\n${videoPlaceholder}`);
        }
        
        // Escrever o arquivo atualizado apenas se houve mudança
        if (newContent !== content) {
          writeFileSync(file, newContent, 'utf-8');
          replacedCount++;
          console.log(`✓ Atualizado: ${file.replace(process.cwd(), '')}`);
        }
      }
    }
    
    console.log(`\n✅ Total de arquivos atualizados: ${replacedCount}`);
  } catch (error) {
    console.error('Erro ao processar arquivos:', error);
    process.exit(1);
  }
}

replaceVideoSections();

