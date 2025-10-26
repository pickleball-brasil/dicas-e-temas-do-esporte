# 🎯 Sistema Centralizado de Conteúdo - Pickleball Study Guide

Este documento explica o novo sistema centralizado para gerenciar conteúdo do projeto, que simplifica drasticamente a criação de novos posts.

## 🚀 Problema Resolvido

**ANTES:** Para adicionar um novo post, era necessário atualizar manualmente **8+ arquivos**:
- `src/lib/sections.ts`
- `src/lib/sectionDescriptions.ts`
- `src/lib/displayNames.ts`
- `src/contexts/LanguageContext.tsx`
- `src/app/page.tsx` (cores)
- `content/indice.json`
- `content/indice.csv`
- `content/INDICE_COMPLETO.md`

**AGORA:** Para adicionar um novo post, você precisa atualizar apenas **1 arquivo**:
- `src/lib/contentRegistry.ts`

## 🏗️ Arquitetura do Sistema

### 1. **Registro Centralizado** (`src/lib/contentRegistry.ts`)
```typescript
export const CONTENT_REGISTRY: Record<string, SectionConfig> = {
  "construcao-de-pontos": {
    id: "point-construction",
    name: "Construção de Pontos",
    displayName: "Construção de Pontos",
    description: "Sistemas táticos para construir pontos e controlar o jogo",
    level: "Avançado",
    fileName: "construcao-de-pontos.md",
    color: "bg-gradient-to-br from-red-600 to-red-700",
    englishName: "Point Construction",
    englishDescription: "Tactical systems to build points and control the game",
    category: "avancado"
  }
  // ... outras seções
};
```

### 2. **Scripts Automatizados**
- **`scripts/generate-files.mjs`**: Gera todos os arquivos necessários
- **`scripts/add-post.mjs`**: Interface simplificada para adicionar novos posts

## 🎯 Como Usar

### **Método 1: Script Interativo (Recomendado)**

```bash
node scripts/add-post.mjs
```

O script irá:
1. ✅ Coletar informações do post (nome, descrição, nível)
2. ✅ Gerar configurações automaticamente (ID, cor, traduções)
3. ✅ Atualizar o registro centralizado
4. ✅ Executar o script de geração
5. ✅ Atualizar todos os arquivos necessários

### **Método 2: Manual**

1. **Adicionar ao registro centralizado:**
```typescript
// Em src/lib/contentRegistry.ts
"meu-novo-post": {
  id: "my-new-post",
  name: "Meu Novo Post",
  displayName: "Meu Novo Post",
  description: "Descrição do meu novo post",
  level: "Intermediário",
  fileName: "meu-novo-post.md",
  color: "bg-gradient-to-br from-amber-500 to-orange-600",
  englishName: "My New Post",
  englishDescription: "Description of my new post",
  category: "intermediario"
}
```

2. **Executar script de geração:**
```bash
node scripts/generate-files.mjs
```

3. **Criar arquivo de conteúdo:**
```bash
# Criar arquivo em content/sections/intermediario/meu-novo-post.md
```

## 📁 Estrutura de Arquivos

```
src/lib/
├── contentRegistry.ts          # 🎯 REGISTRO CENTRALIZADO
├── sections.ts                 # 🔄 Gerado automaticamente
├── sectionDescriptions.ts      # 🔄 Gerado automaticamente
├── displayNames.ts            # 🔄 Gerado automaticamente
└── sectionColors.ts           # 🔄 Gerado automaticamente

scripts/
├── generate-files.mjs         # 🔄 Gera todos os arquivos
└── add-post.mjs              # 🎯 Interface para adicionar posts

content/
├── indice.json               # 🔄 Gerado automaticamente
├── indice.csv                # 🔄 Gerado automaticamente
└── INDICE_COMPLETO.md        # 🔄 Gerado automaticamente
```

## 🎨 Configurações Automáticas

### **Cores por Nível**
- **Básico**: `bg-gradient-to-br from-green-500 to-emerald-600`
- **Intermediário**: `bg-gradient-to-br from-amber-500 to-orange-600`
- **Avançado**: `bg-gradient-to-br from-red-500 to-rose-600`
- **Táticas**: `bg-gradient-to-br from-violet-400 to-purple-600`

### **Categorias**
- **Básico** → `basico`
- **Intermediário** → `intermediario`
- **Avançado** → `avancado`
- **Táticas** → `taticas`

### **IDs Únicos**
- Gerados automaticamente a partir do nome
- Formato: `nome-do-post` (minúsculas, hífens)
- Exemplo: "Construção de Pontos" → `construcao-de-pontos`

## 🔧 Funções Utilitárias

### **Consultar Seções**
```typescript
import { CONTENT_REGISTRY, getSectionsByLevel, getContentStatistics } from '@/lib/contentRegistry';

// Todas as seções
const allSections = Object.keys(CONTENT_REGISTRY);

// Seções por nível
const basicSections = getSectionsByLevel('Básico');

// Estatísticas
const stats = getContentStatistics();
console.log(`Total: ${stats.total} seções`);
```

### **Adicionar Nova Seção Programaticamente**
```typescript
import { addNewSection } from '@/lib/contentRegistry';

const newSection = addNewSection({
  name: "Meu Novo Post",
  displayName: "Meu Novo Post",
  description: "Descrição do post",
  level: "Intermediário",
  color: "bg-gradient-to-br from-amber-500 to-orange-600",
  englishName: "My New Post",
  englishDescription: "Post description",
  category: "intermediario"
});
```

## 📊 Benefícios

### **✅ Simplificação**
- **Antes**: 8+ arquivos para atualizar
- **Agora**: 1 arquivo para atualizar

### **✅ Consistência**
- Todas as configurações em um local
- Eliminação de inconsistências
- Validação automática

### **✅ Automação**
- Geração automática de arquivos
- Scripts interativos
- Traduções automáticas

### **✅ Manutenibilidade**
- Código mais limpo
- Fácil de entender
- Fácil de expandir

## 🚨 Importante

### **⚠️ Não Edite Arquivos Gerados**
Os seguintes arquivos são gerados automaticamente e **NÃO** devem ser editados manualmente:
- `src/lib/sections.ts`
- `src/lib/sectionDescriptions.ts`
- `src/lib/displayNames.ts`
- `src/lib/sectionColors.ts`
- `content/indice.json`
- `content/indice.csv`
- `content/INDICE_COMPLETO.md`

### **✅ Edite Apenas**
- `src/lib/contentRegistry.ts` (registro centralizado)
- Arquivos de conteúdo Markdown
- Scripts de geração

## 🔄 Workflow Completo

1. **Adicionar novo post:**
   ```bash
   node scripts/add-post.mjs
   ```

2. **Criar arquivo de conteúdo:**
   ```bash
   # Criar em content/sections/[categoria]/[nome].md
   ```

3. **Testar aplicação:**
   ```bash
   npm run dev
   ```

4. **Deploy:**
   ```bash
   npm run build
   ```

## 🎯 Exemplo Prático

### **Adicionando "Construção de Pontos"**

1. **Executar script:**
   ```bash
   node scripts/add-post.mjs
   ```

2. **Informações inseridas:**
   - Nome: "Construção de Pontos"
   - Descrição: "Sistemas táticos para construir pontos e controlar o jogo"
   - Nível: 3 (Avançado)

3. **Configurações geradas automaticamente:**
   - ID: `construcao-de-pontos`
   - Categoria: `avancado`
   - Cor: `bg-gradient-to-br from-red-600 to-red-700`
   - Nome em inglês: `Point Construction`

4. **Arquivos atualizados automaticamente:**
   - ✅ `src/lib/contentRegistry.ts`
   - ✅ `src/lib/sections.ts`
   - ✅ `src/lib/sectionDescriptions.ts`
   - ✅ `src/lib/displayNames.ts`
   - ✅ `content/indice.json`
   - ✅ `content/indice.csv`
   - ✅ `content/INDICE_COMPLETO.md`

5. **Criar arquivo de conteúdo:**
   ```bash
   # Criar content/sections/avancado/construcao-de-pontos.md
   ```

## 🎉 Resultado

O sistema agora é **10x mais simples** para gerenciar conteúdo, com:
- ✅ **1 arquivo** para gerenciar tudo
- ✅ **Scripts automatizados** para geração
- ✅ **Interface interativa** para adicionar posts
- ✅ **Consistência garantida** entre arquivos
- ✅ **Traduções automáticas** (básicas)
- ✅ **Validação automática** de configurações

---

*Sistema desenvolvido para simplificar o gerenciamento de conteúdo do Pickleball Study Guide* 🎯
