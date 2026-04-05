---
name: criar-post
description: 'Cria um novo post no projeto pickleball a partir de conteúdo markdown. Use quando quiser adicionar um novo artigo/post, criar conteúdo novo, publicar um post, adicionar seção nova. Recebe o conteúdo markdown do post, cria o arquivo, registra em todos os arquivos necessários, commita e faz push automaticamente.'
argument-hint: 'Cole aqui o conteúdo markdown do post (incluindo frontmatter)'
---

# Criar Post — Pickleball Dicas e Temas

## Quando Usar
- Usuário fornece conteúdo markdown de um post novo
- Usuário quer adicionar/publicar um novo artigo
- Usuário quer criar uma nova seção de conteúdo

## Informações do Projeto

**Stack:** Next.js 15, TypeScript, Tailwind CSS  
**Conteúdo:** `content/sections/<nivel>/<slug>.md`  
**Níveis válidos:** `basico`, `intermediario`, `avancado`, `taticas`

### Cores por Nível (sectionColors)
- **Básico:** `bg-gradient-to-br from-sky-500 to-blue-600`
- **Intermediário:** `bg-gradient-to-br from-amber-500 to-orange-600`
- **Avançado:** `bg-gradient-to-br from-red-600 to-red-700`
- **Táticas:** `bg-gradient-to-br from-violet-400 to-purple-600`

### Formato do Frontmatter Obrigatório
```markdown
---
title: "Título do Post"
description: "Descrição curta"
level: "Básico" | "Intermediário" | "Avançado" | "Táticas"
lastModified: "2026-01-01T00:00:00.000Z"
author: "Fabrício Ziliotti"
tags: ["tag1", "tag2"]
tips:
  - "Dica 1"
  - "Dica 2"
---
```

## Procedimento Completo

### Passo 1 — Extrair metadados do markdown
Leia o frontmatter do conteúdo fornecido e extraia:
- `title` → nome completo do post
- `level` → nível (Básico/Intermediário/Avançado/Táticas)
- Derive o **slug** (nome do arquivo) do título: minúsculas, acentos removidos, espaços → hífens
  - Exemplo: "Sistema de Semáforo" → `sistema-de-semaforo`
- Derive o **englishId** do slug em inglês
  - Exemplo: `sistema-de-semaforo` → `traffic-light-system`
- Determine a **pasta** pelo nível:
  - Básico → `content/sections/basico/`
  - Intermediário → `content/sections/intermediario/`
  - Avançado → `content/sections/avancado/`
  - Táticas → `content/sections/taticas/`
- Determine a **category** pelo nível:
  - Básico → `basico` | Intermediário → `intermediario` | Avançado → `avancado` | Táticas → `taticas`
- Determine o **displayName** (nome curto para UI, máximo ~3 palavras)

### Passo 2 — Criar o arquivo markdown
Crie o arquivo em `content/sections/<nivel>/<slug>.md` com o conteúdo fornecido pelo usuário.

### Passo 3 — Atualizar `src/lib/sections.ts`
Edite o arquivo e faça **3 adições**:

**3a. Em `SECTION_IDS`** — adicionar na seção correta (Básico/Intermediário/Avançado/Táticas):
```typescript
"<slug>": "<english-id>",
```

**3b. Na lista de seções** (`BASIC_SECTIONS` | `INTERMEDIATE_SECTIONS` | `ADVANCED_SECTIONS` | `TACTICS_SECTIONS`):
```typescript
"<slug>",
```

**3c. Em `SECTION_LEVELS`**:
```typescript
"<slug>": "Básico", // ou Intermediário, Avançado, Táticas
```

### Passo 4 — Atualizar `src/lib/contentRegistry.ts`
Adicione na seção correspondente do objeto `CONTENT_REGISTRY`:
```typescript
"<slug>": {
  id: "<english-id>",
  name: "<Nome Completo>",
  displayName: "<Nome Curto>",
  description: "<descrição do frontmatter>",
  level: "<Nível>",
  fileName: "<slug>.md",
  color: "bg-gradient-to-br from-<cor>-500 to-<cor>-600", // use cor do nível
  englishName: "<English Name>",
  englishDescription: "<English description>",
  category: "<nivel-sem-acento>"
},
```

### Passo 5 — Atualizar `src/lib/displayNames.ts`
Adicione no objeto `DISPLAY_NAMES`:
```typescript
"<slug>": "<Nome de Exibição Formatado>",
```

### Passo 6 — Atualizar `src/app/page.tsx`
No objeto `sectionColors`, adicione na seção correta (procure pelo comentário do nível):
```typescript
"<slug>": "bg-gradient-to-br from-<cor>-<tom> to-<cor>-<tom>",
```

### Passo 7 — Atualizar página de categoria
Edite o arquivo da categoria correspondente:
- Básico → `src/app/categoria/basico/page.tsx`
- Intermediário → `src/app/categoria/intermediario/page.tsx`
- Avançado → `src/app/categoria/avancado/page.tsx`
- Táticas → `src/app/categoria/taticas/page.tsx`

No objeto `sectionColors`, adicione:
```typescript
"<slug>": "bg-gradient-to-br from-<cor>-<tom> to-<cor>-<tom>",
```

### Passo 8 — Validar
Execute `get_errors` nos arquivos editados para garantir zero erros de TypeScript.

### Passo 9 — Commit e Push
Execute via terminal **na pasta do projeto** (`/Users/macbookairm4/workspace/dicas-e-temas-do-esporte`):

```bash
export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh"
git add content/sections/<nivel>/<slug>.md src/lib/sections.ts src/lib/contentRegistry.ts src/lib/displayNames.ts src/app/page.tsx src/app/categoria/<nivel>/page.tsx
git commit -m "post: adicionar <título do post>"
git push origin main
```

## Checklist de Conclusão
- [ ] Arquivo `.md` criado na pasta correta
- [ ] `SECTION_IDS` atualizado em `sections.ts`
- [ ] Lista de seções atualizada em `sections.ts`
- [ ] `SECTION_LEVELS` atualizado em `sections.ts`
- [ ] `CONTENT_REGISTRY` atualizado em `contentRegistry.ts`
- [ ] `DISPLAY_NAMES` atualizado em `displayNames.ts`
- [ ] `sectionColors` atualizado em `page.tsx`
- [ ] `sectionColors` atualizado na página de categoria
- [ ] Zero erros de TypeScript
- [ ] Commit e push realizados

## Notas Importantes
- O terminal precisa carregar o nvm antes de usar npm/git: `export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh"`
- Sempre use caminhos absolutos: `/Users/macbookairm4/workspace/dicas-e-temas-do-esporte/`
- Ao fazer `replace_string_in_file`, inclua 3-5 linhas de contexto antes e depois
- Use `multi_replace_string_in_file` para edições independentes em paralelo
