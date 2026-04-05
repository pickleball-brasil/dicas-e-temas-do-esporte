# Pickleball — Dicas e Temas do Esporte

Site PWA de conteúdo sobre pickleball, deployado no GitHub Pages via Next.js static export.

## Build & Dev

```bash
# Requer nvm carregado primeiro:
export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh"

npm run dev        # Dev server (Turbopack) → localhost:3000
npm run build      # Build estático para GitHub Pages
npm run lint       # ESLint
npm run test:pwa   # Build + serve para testar PWA
```

> **Gotcha crítico:** O terminal do VS Code pode não ter `node`/`npm` no PATH. Sempre carregue o nvm antes de rodar comandos npm ou git.

Deploy é automático via GitHub Actions ao fazer `git push origin main`. Ver [DEPLOY.md](../DEPLOY.md).

## Arquitetura

- **`content/sections/{basico,intermediario,avancado,taticas}/`** — Posts em Markdown (fonte de verdade)
- **`src/lib/contentRegistry.ts`** — Registro centralizado de todas as seções (configs, metadados, cores)
- **`src/lib/sections.ts`** — `SECTION_IDS`, arrays por nível, `SECTION_LEVELS`
- **`src/lib/displayNames.ts`** — Nomes de exibição por slug
- **`src/app/`** — Next.js App Router (static export)
- **`src/api.disabled/` e `src/admin.disabled/`** — Desabilitados; não mover de volta (quebra o build)
- **`messages/{pt,en}.json`** — i18n com next-intl

## Sistema de Conteúdo

Adicionar um post **exige atualizar 5 arquivos**. Use a skill `/criar-post` para automatizar.

Manual: ver [GUIA_ADICIONAR_POST.md](../GUIA_ADICIONAR_POST.md).

### Frontmatter obrigatório

```yaml
---
title: "Título"
description: "Descrição curta"
level: "Básico" | "Intermediário" | "Avançado" | "Táticas"
lastModified: "2026-01-01T00:00:00.000Z"
author: "Fabrício Ziliotti"
tags: ["tag1"]
tips:
  - "Dica curta"
---
```

### Cores por nível (Tailwind)

| Nível | Gradiente |
|-------|-----------|
| Básico | `from-sky-500 to-blue-600` |
| Intermediário | `from-amber-500 to-orange-600` |
| Avançado | `from-red-600 to-red-700` |
| Táticas | `from-violet-400 to-purple-600` |

A mesma cor deve ser adicionada em **3 lugares**: `contentRegistry.ts`, `src/app/page.tsx` e `src/app/categoria/<nivel>/page.tsx`.

## Convenções

- Slugs de arquivo: `kebab-case` sem acentos — ex: `terceira-bola.md`, `atp-around-the-post.md`
- IDs internos em inglês — ex: `"terceira-bola": "third-shot"`
- `category` no registry usa strings sem acento: `basico`, `intermediario`, `avancado`, `taticas`
- API routes e middlewares **não funcionam** em static export — manter em `*.disabled/`
- HTML inline em markdown é permitido via `rehype-raw` — não inserir conteúdo não confiável

## Stack

Next.js 15.5 · React 19 · TypeScript 5 · Tailwind CSS 4 · next-pwa 5 · next-intl 4 · gray-matter · remark/rehype · Firebase 12 (desabilitado em prod)
