import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { Section } from './sections';

export interface SectionContent {
  title: string;
  description: string;
  level: 'Básico' | 'Intermediário' | 'Avançado' | 'Táticas' | 'Roteiro de Aulas';
  tips: string[];
  content: string;
  metadata: {
    lastModified: string;
    author?: string;
    tags?: string[];
  };
}

export interface SectionFile {
  section: Section;
  content: SectionContent;
}

const contentDirectory = path.join(process.cwd(), 'content', 'sections');

// Mapeamento de categorias para pastas
const categoryFolders = {
  'Básico': 'basico',
  'Intermediário': 'intermediario', 
  'Avançado': 'avancado',
  'Táticas': 'taticas',
  'Roteiro de Aulas': 'roteiros'
} as const;

// Debug para ambiente CI - removido

export async function getSectionContent(section: Section): Promise<SectionContent | null> {
  try {
    // Importar getSectionLevel para determinar a categoria
    const { getSectionLevel } = await import('./sections');
    const level = getSectionLevel(section);
    const categoryFolder = categoryFolders[level];
    
    // Construir caminho baseado na categoria
    let filePath = path.join(contentDirectory, categoryFolder, `${section}.md`);
    let fileName = `${section}.md`;
    
    // Se não existir, tentar no diretório raiz (fallback)
    if (!fs.existsSync(filePath)) {
      filePath = path.join(contentDirectory, `${section}.md`);
    }
    
    // Se não existir e estivermos no CI, tentar com primeira letra maiúscula
    if (!fs.existsSync(filePath) && process.env.CI) {
      const capitalizedSection = section.charAt(0).toUpperCase() + section.slice(1);
      filePath = path.join(contentDirectory, categoryFolder, `${capitalizedSection}.md`);
      fileName = `${capitalizedSection}.md`;
      
      if (!fs.existsSync(filePath)) {
        filePath = path.join(contentDirectory, `${capitalizedSection}.md`);
      }
    }
    
    if (!fs.existsSync(filePath)) {
      console.error(`Arquivo não encontrado: ${filePath}`);
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Normalizar quebras de linha para compatibilidade entre sistemas
    const normalizedContent = fileContents.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    const { data, content } = matter(normalizedContent);

    // Processar o conteúdo Markdown para HTML
    let htmlContent = '';
    try {
      // Processar markdown para HTML usando remark
      const processor = remark()
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify);
      
      const processedContent = await processor.process(content);
      htmlContent = String(processedContent);
    } catch (remarkError) {
      console.error(`[ERROR] Erro no processamento remark para ${section}:`, remarkError);
      // Fallback: usar o conteúdo markdown original com quebras de linha
      htmlContent = content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
      htmlContent = `<p>${htmlContent}</p>`;
    }

    // Processar tips do frontmatter com validação robusta
    let tips = [];
    try {
      if (data.tips) {
        if (Array.isArray(data.tips)) {
          tips = data.tips
            .filter(tip => tip && typeof tip === 'string' && tip.trim().length > 0)
            .map(tip => tip.trim());
        } else if (typeof data.tips === 'string' && data.tips.trim()) {
          tips = [data.tips.trim()];
        }
      }
    } catch (error) {
      console.error(`Erro ao processar tips para ${section}:`, error);
      tips = [];
    }
    
    // Se não há tips no frontmatter, extrair do conteúdo
    if (tips.length === 0) {
      try {
        tips = extractTipsFromContent(htmlContent);
      } catch (error) {
        console.error(`Erro ao extrair tips do conteúdo para ${section}:`, error);
        tips = [];
      }
    }
    
    // Verificar se o HTML foi processado corretamente
    if (!htmlContent || htmlContent.trim().length === 0) {
      console.error(`HTML vazio para ${section}, usando conteúdo markdown como fallback`);
      // Fallback: usar o conteúdo markdown original se o HTML estiver vazio
      const fallbackHtml = content.replace(/\n/g, '<br>');
      htmlContent = fallbackHtml;
    }

    const result = {
      title: data.title || section,
      description: data.description || '',
      level: data.level || 'Básico',
      tips: tips,
      content: htmlContent,
      metadata: {
        lastModified: data.lastModified || new Date().toISOString(),
        author: data.author,
        tags: data.tags || []
      }
    };
    
    return result;
  } catch (error) {
    console.error(`Erro ao ler conteúdo da seção ${section}:`, error);
    return null;
  }
}

export async function getAllSections(): Promise<SectionFile[]> {
  try {
    const sections: SectionFile[] = [];
    
    // Buscar arquivos em todas as pastas de categoria
    for (const [, folder] of Object.entries(categoryFolders)) {
      const categoryPath = path.join(contentDirectory, folder);
      
      try {
        const files = fs.readdirSync(categoryPath);
        
        for (const file of files) {
          if (file.endsWith('.md')) {
            const sectionName = file.replace('.md', '') as Section;
            const content = await getSectionContent(sectionName);
            
            if (content) {
              sections.push({
                section: sectionName,
                content
              });
            }
          }
        }
      } catch (error) {
        console.warn(`Erro ao ler pasta ${folder}:`, error instanceof Error ? error.message : String(error));
      }
    }
    
    // Buscar também no diretório raiz (fallback)
    try {
      const files = fs.readdirSync(contentDirectory);
      
      for (const file of files) {
        if (file.endsWith('.md')) {
          const sectionName = file.replace('.md', '') as Section;
          const content = await getSectionContent(sectionName);
          
          if (content) {
            sections.push({
              section: sectionName,
              content
            });
          }
        }
      }
    } catch (error) {
      console.warn('Erro ao ler diretório raiz:', error instanceof Error ? error.message : String(error));
    }

    return sections;
  } catch (error) {
    console.error('Erro ao ler todas as seções:', error instanceof Error ? error.message : String(error));
    return [];
  }
}

export function getSectionFileList(): string[] {
  try {
    const files: string[] = [];
    
    // Buscar arquivos em todas as pastas de categoria
    for (const [, folder] of Object.entries(categoryFolders)) {
      const categoryPath = path.join(contentDirectory, folder);
      
      try {
        const categoryFiles = fs.readdirSync(categoryPath);
        const mdFiles = categoryFiles
          .filter(file => file.endsWith('.md'))
          .map(file => file.replace('.md', ''));
        files.push(...mdFiles);
      } catch (error) {
        console.warn(`Erro ao listar pasta ${folder}:`, error instanceof Error ? error.message : String(error));
      }
    }
    
    // Buscar também no diretório raiz (fallback)
    try {
      const rootFiles = fs.readdirSync(contentDirectory);
      const mdFiles = rootFiles
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''));
      files.push(...mdFiles);
    } catch (error) {
      console.warn('Erro ao listar diretório raiz:', error instanceof Error ? error.message : String(error));
    }
    
    return [...new Set(files)]; // Remove duplicatas
  } catch (error) {
    console.error('Erro ao listar arquivos de seção:', error instanceof Error ? error.message : String(error));
    return [];
  }
}

function extractTipsFromContent(htmlContent: string): string[] {
  // Extrair dicas de listas HTML
  const tipRegex = /<li[^>]*>(.*?)<\/li>/g;
  const matches = htmlContent.match(tipRegex);
  
  if (matches) {
    return matches.map(match => 
      match.replace(/<[^>]*>/g, '').trim()
    ).filter(tip => tip.length > 0);
  }
  
  return [];
}

export function createSectionFile(section: Section, content: SectionContent): void {
  try {
    const filePath = path.join(contentDirectory, `${section}.md`);
    
    const frontmatter = `---
title: "${content.title}"
description: "${content.description}"
level: "${content.level}"
lastModified: "${content.metadata.lastModified}"
${content.metadata.author ? `author: "${content.metadata.author}"` : ''}
${content.metadata.tags ? `tags: [${content.metadata.tags.map(tag => `"${tag}"`).join(', ')}]` : ''}
tips:
${content.tips.map(tip => `  - "${tip}"`).join('\n')}
---

${content.content}
`;

    fs.writeFileSync(filePath, frontmatter, 'utf8');
  } catch (error) {
    console.error(`Erro ao criar arquivo da seção ${section}:`, error instanceof Error ? error.message : String(error));
  }
}
