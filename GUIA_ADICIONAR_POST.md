# 📝 Guia: Como Adicionar um Novo Post

Este guia mostra os passos necessários para adicionar um novo post ao projeto.

---

## ✅ Passo 1: Criar o Arquivo Markdown

Crie o arquivo `.md` na pasta correspondente ao nível:

- **Básico:** `content/sections/basico/nome-do-post.md`
- **Intermediário:** `content/sections/intermediario/nome-do-post.md`
- **Avançado:** `content/sections/avancado/nome-do-post.md`
- **Táticas:** `content/sections/taticas/nome-do-post.md`

**Formato do arquivo:**
```markdown
---
title: "Título do Post"
description: "Descrição curta (máximo 10 palavras)"
level: "Básico" | "Intermediário" | "Avançado" | "Táticas"
lastModified: "2025-01-27T00:00:00.000Z"
author: "Fabrício Ziliotti"
tags: ["tag1", "tag2", "básico"]
tips:
  - "Dica 1"
  - "Dica 2"
---

Conteúdo do post aqui...
```

---

## ✅ Passo 2: Adicionar ao `sections.ts`

Edite `src/lib/sections.ts`:

### 2.1. Adicione o ID no `SECTION_IDS`:
```typescript
// Na seção correspondente (Básico, Intermediário, Avançado ou Táticas)
"nome-do-post": "id-em-ingles",
```

### 2.2. Adicione na lista de seções:
```typescript
// BÁSICO
export const BASIC_SECTIONS = [
  // ... outros posts
  "nome-do-post",
] as const;

// Ou INTERMEDIATE_SECTIONS, ADVANCED_SECTIONS, TACTICS_SECTIONS
```

### 2.3. Adicione no `SECTION_LEVELS`:
```typescript
export const SECTION_LEVELS: Record<Section, SectionLevel> = {
  // ... outros posts
  "nome-do-post": "Básico", // ou "Intermediário", "Avançado", "Táticas"
};
```

---

## ✅ Passo 3: Adicionar ao `contentRegistry.ts`

Edite `src/lib/contentRegistry.ts` e adicione na seção correspondente:

```typescript
"nome-do-post": {
  id: "id-em-ingles",
  name: "Nome Completo do Post",
  displayName: "Nome Curto",
  description: "Descrição curta (máximo 10 palavras)",
  level: "Básico", // ou "Intermediário", "Avançado", "Táticas"
  fileName: "nome-do-post.md",
  color: "bg-gradient-to-br from-green-500 to-emerald-600", // Ajuste a cor conforme o nível
  englishName: "English Name",
  englishDescription: "English description",
  category: "basico" // ou "intermediario", "avancado", "taticas"
},
```

**Cores por nível:**
- **Básico:** `from-green-500 to-emerald-600`
- **Intermediário:** `from-amber-500 to-orange-600`
- **Avançado:** `from-red-600 to-red-700`
- **Táticas:** `from-violet-400 to-purple-600`

---

## ✅ Passo 4: Adicionar ao `displayNames.ts`

Edite `src/lib/displayNames.ts` e adicione:

```typescript
export const DISPLAY_NAMES: Record<string, string> = {
  // ... outros posts
  "nome-do-post": "Nome Formatado do Post",
};
```

**Nota:** Se não adicionar aqui, a função `getDisplayName` converterá automaticamente (hífens viram espaços e capitaliza), mas é melhor adicionar manualmente para controle.

---

## ✅ Passo 5: Adicionar Ícone nas Páginas

### 5.1. Página Principal (`src/app/page.tsx`)

Adicione no `sectionColors` na seção correspondente:

```typescript
const sectionColors: Record<string, string> = {
  // Básico - VERDE
  // ... outros posts
  "nome-do-post": "bg-gradient-to-br from-green-400 to-emerald-500",
  
  // Ou Intermediário, Avançado, Táticas
};
```

### 5.2. Página de Categoria

Adicione no arquivo correspondente:
- `src/app/categoria/basico/page.tsx`
- `src/app/categoria/intermediario/page.tsx`
- `src/app/categoria/avancado/page.tsx`
- `src/app/categoria/taticas/page.tsx`

```typescript
const sectionColors: Record<string, string> = {
  // ... outros posts
  "nome-do-post": "bg-gradient-to-br from-green-400 to-emerald-500",
};
```

---

## ✅ Passo 6: Verificar

1. Execute o projeto: `npm run dev`
2. Verifique se o post aparece na lista
3. Clique no post e verifique se abre corretamente
4. Verifique se o título está formatado (sem hífens)
5. Verifique se o ícone aparece

---

## 📋 Checklist Rápido

- [ ] Arquivo `.md` criado na pasta correta
- [ ] Adicionado em `SECTION_IDS` no `sections.ts`
- [ ] Adicionado na lista de seções (`BASIC_SECTIONS`, etc.)
- [ ] Adicionado em `SECTION_LEVELS`
- [ ] Adicionado em `CONTENT_REGISTRY` no `contentRegistry.ts`
- [ ] Adicionado em `DISPLAY_NAMES` no `displayNames.ts`
- [ ] Adicionado ícone em `page.tsx` (página principal)
- [ ] Adicionado ícone na página de categoria correspondente
- [ ] Testado e funcionando

---

## 💡 Dicas

- Use nomes de arquivo em minúsculas com hífens: `nome-do-post.md`
- Mantenha descrições curtas (máximo 10 palavras)
- Use cores consistentes com o nível do post
- Teste sempre após adicionar um novo post

---

## 🎯 Exemplo Completo

**Post:** "Análise de Pontos" (Intermediário)

1. **Arquivo:** `content/sections/intermediario/analise-de-pontos.md`
2. **sections.ts:**
   - `"analise-de-pontos": "point-analysis"` em `SECTION_IDS`
   - `"analise-de-pontos"` em `INTERMEDIATE_SECTIONS`
   - `"analise-de-pontos": "Intermediário"` em `SECTION_LEVELS`
3. **contentRegistry.ts:** Adicionar objeto completo com todas as propriedades
4. **displayNames.ts:** `"analise-de-pontos": "Análise de Pontos"`
5. **page.tsx:** `"analise-de-pontos": "bg-gradient-to-br from-amber-400 to-orange-500"`
6. **categoria/intermediario/page.tsx:** Mesma cor do ícone

---

**Pronto!** Seu novo post está adicionado e deve aparecer no sistema. 🎉

