# 📚 Sistema de Conteúdo Markdown - Pickleball Study Guide

Este diretório contém todo o conteúdo educacional do sistema de estudo do pickleball, organizado em arquivos Markdown para facilitar a manutenção e atualização.

## 📁 Estrutura de Diretórios

```
content/
├── sections/           # Arquivos Markdown das seções de estudo (71 arquivos)
├── README.md          # Este arquivo
├── INDICE_COMPLETO.md # Índice completo de todos os tópicos
├── LISTA_RAPIDA.md    # Lista rápida para consulta
├── indice.json        # Índice em formato JSON
└── indice.csv         # Índice em formato CSV
```

## 🎯 Como Usar

### Para Desenvolvedores
1. **Adicionar nova seção**: Crie um arquivo `.md` em `sections/`
2. **Editar conteúdo**: Modifique os arquivos existentes
3. **Atualizar índice**: Execute o script de geração de índice

### Para Usuários
1. **Navegar**: Use o índice completo para encontrar tópicos
2. **Estudar**: Acesse as seções através da interface web
3. **Praticar**: Siga as dicas e exercícios de cada seção

## 📋 Formato dos Arquivos

Cada arquivo Markdown segue a estrutura:

```markdown
---
title: "Nome da Seção"
description: "Descrição breve"
level: "Básico|Intermediário|Avançado|Táticas"
lastModified: "2025-01-19T18:30:00.000Z"
author: "Fabrício Ziliotti"
tags: ["tag1", "tag2", "tag3"]
tips:
  - "Dica 1"
  - "Dica 2"
  - "Dica 3"
---

# Título da Seção

Conteúdo principal...

## Vídeos Educativos

<div class="youtube-video">
<iframe src="https://www.youtube.com/embed/VIDEO_ID" ...></iframe>
</div>

## Links Úteis

<a href="URL" class="external-link">Link</a>
```

## 🔧 Scripts Disponíveis

### Gerar Índice Completo
```bash
node scripts/generate-index.js
```

### Migrar Conteúdo Existente
```bash
node scripts/migrate-to-markdown.js
```

### Criar Todos os Arquivos Markdown
```bash
node scripts/create-all-markdown.js
```

## 📊 Estatísticas

- **Total de seções**: 71
- **Básico**: 17 seções (25%)
- **Intermediário**: 18 seções (26%)
- **Avançado**: 18 seções (26%)
- **Táticas**: 18 seções (26%)

## 🎨 Recursos Suportados

### Markdown
- ✅ Títulos (H1-H6)
- ✅ Listas ordenadas e não ordenadas
- ✅ Texto em negrito e itálico
- ✅ Links externos
- ✅ Código inline e blocos
- ✅ Citações

### HTML Embebido
- ✅ Vídeos do YouTube
- ✅ Vídeos do Vimeo
- ✅ Links externos estilizados
- ✅ Containers de vídeo responsivos

### Estilos CSS
- ✅ Classes customizadas para Markdown
- ✅ Vídeos responsivos
- ✅ Links externos estilizados
- ✅ Formatação de listas

## 📚 Índices Disponíveis

### 1. INDICE_COMPLETO.md
- Índice detalhado com descrições
- Organizado por níveis de dificuldade
- Inclui estatísticas e guias de uso
- Links diretos para cada arquivo

### 2. LISTA_RAPIDA.md
- Lista compacta de todos os tópicos
- Ideal para consulta rápida
- Organizada por cores e níveis

### 3. indice.json
- Formato JSON estruturado
- Ideal para integração com APIs
- Inclui metadados completos

### 4. indice.csv
- Formato CSV para planilhas
- Fácil importação em Excel/Google Sheets
- Colunas: Nível, Cor, Tópico, Arquivo, Descrição

## 🚀 Próximos Passos

1. **Adicionar mais conteúdo** para seções existentes
2. **Criar exercícios interativos** 
3. **Implementar sistema de progresso**
4. **Adicionar quizzes** por seção
5. **Integrar com sistema de usuários**

## 📝 Notas de Desenvolvimento

- Os arquivos são processados pelo `remark` e `rehype`
- HTML embebido é permitido para vídeos e links
- Estilos são aplicados via classes CSS customizadas
- O sistema suporta frontmatter YAML para metadados
- Todos os 71 tópicos estão implementados e funcionais

---

*Última atualização: Janeiro 2025*  
*Sistema completo com 71 tópicos organizados em 4 níveis*