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
    // Tentar primeiro com o nome original (minúsculas)
    let filePath = path.join(contentDirectory, `${section}.md`);
    let fileName = `${section}.md`;
    
    // Se não existir e estivermos no CI, tentar com primeira letra maiúscula
    if (!fs.existsSync(filePath) && process.env.CI) {
      const capitalizedSection = section.charAt(0).toUpperCase() + section.slice(1);
      filePath = path.join(contentDirectory, `${capitalizedSection}.md`);
      fileName = `${capitalizedSection}.md`;
    }
    
    // Log específico para páginas problemáticas
    if (section === 'saque' || section === 'regras') {
      console.log(`[DEBUG] === PROCESSANDO ${section.toUpperCase()} ===`);
      console.log(`[DEBUG] Caminho: ${filePath}`);
      console.log(`[DEBUG] Existe: ${fs.existsSync(filePath)}`);
      console.log(`[DEBUG] process.cwd(): ${process.cwd()}`);
      console.log(`[DEBUG] contentDirectory: ${contentDirectory}`);
    }
    
    if (process.env.CI) {
      console.log(`[CI DEBUG] Tentando carregar: ${section} (${fileName})`);
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
    
    // Normalizar quebras de linha para compatibilidade entre sistemas
    const normalizedContent = fileContents.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    const { data, content } = matter(normalizedContent);
    
    // Log específico para páginas problemáticas
    if (section === 'saque' || section === 'regras') {
      console.log(`[DEBUG] Frontmatter para ${section}:`, data);
      console.log(`[DEBUG] Content length para ${section}: ${content.length}`);
      console.log(`[DEBUG] Content preview para ${section}: ${content.substring(0, 100)}...`);
    }
    
    if (process.env.CI) {
      console.log(`[CI DEBUG] Arquivo lido: ${fileContents.length} chars`);
      console.log(`[CI DEBUG] Frontmatter: ${JSON.stringify(data, null, 2)}`);
      console.log(`[CI DEBUG] Tips type: ${typeof data.tips}`);
      console.log(`[CI DEBUG] Tips is array: ${Array.isArray(data.tips)}`);
      if (Array.isArray(data.tips)) {
        console.log(`[CI DEBUG] Tips length: ${data.tips.length}`);
        console.log(`[CI DEBUG] Tips valid: ${data.tips.filter(tip => tip && tip.trim()).length}`);
      }
    }

    // Processar o conteúdo Markdown para HTML
    if (process.env.CI) {
      console.log(`[CI DEBUG] Iniciando processamento remark para ${section}`);
      console.log(`[CI DEBUG] Content preview: ${content.substring(0, 100)}...`);
    }
    
    let htmlContent = '';
    try {
      // Processar markdown para HTML usando remark
      const processor = remark()
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify);
      
      const processedContent = await processor.process(content);
      htmlContent = String(processedContent);
      
      // Log específico para páginas problemáticas
      if (section === 'saque' || section === 'regras') {
        console.log(`[DEBUG] Remark processado para ${section}: ${htmlContent.length} chars`);
        console.log(`[DEBUG] HTML preview para ${section}: ${htmlContent.substring(0, 100)}...`);
      }
    } catch (remarkError) {
      console.error(`[ERROR] Erro no processamento remark para ${section}:`, remarkError);
      if (section === 'saque' || section === 'regras') {
        console.log(`[DEBUG] Usando fallback para ${section}`);
        console.log(`[DEBUG] Erro específico para ${section}:`, remarkError instanceof Error ? remarkError.message : String(remarkError));
      }
      // Fallback: usar o conteúdo markdown original com quebras de linha
      htmlContent = content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
      htmlContent = `<p>${htmlContent}</p>`;
    }
    
    if (process.env.CI) {
      console.log(`[CI DEBUG] Remark processado para ${section}: ${htmlContent.length} chars`);
      console.log(`[CI DEBUG] HTML preview: ${htmlContent.substring(0, 100)}...`);
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
      
      // Log específico para páginas problemáticas
      if (section === 'saque' || section === 'regras') {
        console.log(`[DEBUG] Tips processados para ${section}: ${tips.length} items`);
        console.log(`[DEBUG] Tips preview para ${section}:`, tips.slice(0, 3));
      }
    } catch (error) {
      console.error(`[CI DEBUG] Erro ao processar tips para ${section}:`, error);
      if (section === 'saque' || section === 'regras') {
        console.log(`[DEBUG] Erro ao processar tips para ${section}:`, error instanceof Error ? error.message : String(error));
      }
      tips = [];
    }
    
    // Se não há tips no frontmatter, extrair do conteúdo
    if (tips.length === 0) {
      try {
        tips = extractTipsFromContent(htmlContent);
      } catch (error) {
        console.error(`[CI DEBUG] Erro ao extrair tips do conteúdo para ${section}:`, error);
        tips = [];
      }
    }

    // Verificar se o HTML foi processado corretamente
    if (!htmlContent || htmlContent.trim().length === 0) {
      console.error(`[CI DEBUG] HTML vazio para ${section}, usando conteúdo markdown como fallback`);
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
    
    // Log específico para páginas problemáticas
    if (section === 'saque' || section === 'regras') {
      console.log(`[DEBUG] === RESULTADO PARA ${section.toUpperCase()} ===`);
      console.log(`[DEBUG] HTML length: ${htmlContent.length}`);
      console.log(`[DEBUG] Tips count: ${tips.length}`);
      console.log(`[DEBUG] Result valid: ${!!result.content && result.content.length > 0}`);
      console.log(`[DEBUG] Title: ${result.title}`);
      console.log(`[DEBUG] Description: ${result.description}`);
      console.log(`[DEBUG] Level: ${result.level}`);
    }
    
    if (process.env.CI) {
      console.log(`[CI DEBUG] Seção ${section} processada com sucesso`);
      console.log(`[CI DEBUG] HTML length: ${htmlContent.length}`);
      console.log(`[CI DEBUG] Tips count: ${tips.length}`);
      console.log(`[CI DEBUG] Result valid: ${!!result.content && result.content.length > 0}`);
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
    console.error('Erro ao ler todas as seções:', error instanceof Error ? error.message : String(error));
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
