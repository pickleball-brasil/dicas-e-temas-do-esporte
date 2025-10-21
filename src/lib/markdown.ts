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
  level: 'Básico' | 'Intermediário' | 'Avançado' | 'Táticas';
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

// Debug para ambiente CI
if (process.env.CI) {
  console.log(`[CI DEBUG] process.cwd(): ${process.cwd()}`);
  console.log(`[CI DEBUG] contentDirectory: ${contentDirectory}`);
  console.log(`[CI DEBUG] NODE_ENV: ${process.env.NODE_ENV}`);
}

export async function getSectionContent(section: Section): Promise<SectionContent | null> {
  try {
    const filePath = path.join(contentDirectory, `${section}.md`);
    
    if (process.env.CI) {
      console.log(`[CI DEBUG] Tentando carregar: ${section}`);
      console.log(`[CI DEBUG] Caminho: ${filePath}`);
      console.log(`[CI DEBUG] Existe: ${fs.existsSync(filePath)}`);
    }
    
    if (!fs.existsSync(filePath)) {
      console.error(`Arquivo não encontrado: ${filePath}`);
      if (process.env.CI) {
        // Listar arquivos disponíveis no CI para debug
        try {
          const files = fs.readdirSync(contentDirectory);
          console.log(`[CI DEBUG] Arquivos disponíveis: ${files.join(', ')}`);
        } catch (e) {
          console.log(`[CI DEBUG] Erro ao listar diretório: ${e instanceof Error ? e.message : String(e)}`);
        }
      }
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    if (process.env.CI) {
      console.log(`[CI DEBUG] Arquivo lido: ${fileContents.length} chars`);
      console.log(`[CI DEBUG] Frontmatter: ${JSON.stringify(data, null, 2)}`);
    }

    // Processar o conteúdo Markdown para HTML
    const processedContent = await remark()
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(content);
    
    const htmlContent = processedContent.toString();

    // Processar tips do frontmatter
    let tips = [];
    if (data.tips) {
      if (Array.isArray(data.tips)) {
        tips = data.tips.filter(tip => tip && tip.trim().length > 0);
      } else if (typeof data.tips === 'string' && data.tips.trim()) {
        tips = [data.tips.trim()];
      }
    }
    
    // Se não há tips no frontmatter, extrair do conteúdo
    if (tips.length === 0) {
      tips = extractTipsFromContent(htmlContent);
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
    
    if (process.env.CI) {
      console.log(`[CI DEBUG] Seção ${section} processada com sucesso`);
      console.log(`[CI DEBUG] HTML length: ${htmlContent.length}`);
      console.log(`[CI DEBUG] Tips count: ${tips.length}`);
    }
    
    return result;
  } catch (error) {
    console.error(`Erro ao ler conteúdo da seção ${section}:`, error);
    if (process.env.CI) {
      console.log(`[CI DEBUG] Stack trace:`, error instanceof Error ? error.stack : String(error));
    }
    return null;
  }
}

export async function getAllSections(): Promise<SectionFile[]> {
  try {
    const files = fs.readdirSync(contentDirectory);
    const sections: SectionFile[] = [];

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

    return sections;
  } catch (error) {
    console.error('Erro ao ler todas as seções:', error);
    return [];
  }
}

export function getSectionFileList(): string[] {
  try {
    const files = fs.readdirSync(contentDirectory);
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
  } catch (error) {
    console.error('Erro ao listar arquivos de seção:', error);
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
    console.error(`Erro ao criar arquivo da seção ${section}:`, error);
  }
}
