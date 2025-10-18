# 📝 Mudanças para GitHub Pages

Este documento explica as alterações feitas no projeto para permitir o deploy no GitHub Pages.

## 🔄 Alterações Realizadas

### 1. **Configuração do Next.js** (`next.config.ts`)

```typescript
{
  output: "export",                          // Gera site estático
  basePath: "/dicas-e-temas-do-esporte",   // Subpath do repositório
  images: { unoptimized: true }             // Imagens não otimizadas
}
```

**Por quê?**
- GitHub Pages só suporta sites estáticos (HTML/CSS/JS)
- Não suporta servidor Node.js ou API routes
- O `basePath` é necessário porque o site não está na raiz do domínio

### 2. **Arquivos Desabilitados**

Os seguintes arquivos/pastas foram movidos para fora de `src/app/`:

#### `src/api.disabled/` (antes: `src/app/api/`)
- **Conteúdo**: Rotas de API (NextAuth, links CRUD)
- **Por quê desabilitar**: API routes requerem servidor Node.js
- **Impacto**: Sem autenticação, sem edição de links via interface

#### `src/admin.disabled/` (antes: `src/app/admin/`)
- **Conteúdo**: Painel administrativo
- **Por quê desabilitar**: Depende de autenticação e API routes
- **Impacto**: Sem painel admin (editar links direto no código)

#### `src/middleware.ts.disabled` (antes: `src/middleware.ts`)
- **Conteúdo**: Middleware de autenticação
- **Por quê desabilitar**: Middleware requer servidor Node.js
- **Impacto**: Sem proteção de rotas

### 3. **Workflow do GitHub Actions** (`.github/workflows/deploy.yml`)

Criado workflow que:
1. Instala dependências
2. Faz build do projeto
3. Cria arquivo `.nojekyll`
4. Faz deploy para GitHub Pages

### 4. **Scripts de Deploy**

Criados scripts para facilitar o deploy:
- `deploy.sh` (Linux/Mac)
- `deploy.ps1` (Windows PowerShell)

## 🎯 O Que Funciona

✅ **Interface completa** - Todas as seções e modais
✅ **PWA** - Instalável como app
✅ **Dados estáticos** - Mock data em `src/lib/mockData.ts`
✅ **Responsivo** - Funciona em mobile e desktop
✅ **Animações** - Todas as transições e efeitos
✅ **Service Worker** - Cache offline

## ❌ O Que NÃO Funciona

❌ **Autenticação** - NextAuth requer servidor
❌ **Painel Admin** - Interface de edição desabilitada
❌ **API Routes** - CRUD de links via API
❌ **Firebase** - Já estava comentado
❌ **Middleware** - Proteção de rotas

## 📝 Como Editar Conteúdo

### Editar Links de Vídeos

Arquivo: `src/lib/mockData.ts`

```typescript
export const mockSectionLinks: Record<Section, string[]> = {
  "Dink": [
    "https://www.youtube.com/watch?v=...",
    "https://www.youtube.com/watch?v=...",
  ],
  // ... outras seções
};
```

### Editar Descrições

Arquivo: `src/lib/sectionDescriptions.ts`

```typescript
export const sectionDescriptions: Record<Section, string> = {
  "Dink": "Sua descrição aqui...",
  // ... outras seções
};
```

### Editar Dicas

Arquivo: `src/lib/sectionTips.ts`

```typescript
export const sectionTips: Record<Section, string[]> = {
  "Dink": [
    "Dica 1...",
    "Dica 2...",
  ],
  // ... outras seções
};
```

## 🔄 Como Fazer Deploy

### Método 1: Script Automático (Windows)

```powershell
.\deploy.ps1
```

### Método 2: Manual

```bash
git add .
git commit -m "Suas alterações"
git push origin main
```

O GitHub Actions fará o deploy automaticamente!

## 🔙 Como Reverter para Versão com Servidor

Se no futuro você quiser hospedar em plataforma com servidor Node.js (Vercel, Netlify, etc.):

1. **Restaurar arquivos:**
```bash
# Mover de volta
mv src/api.disabled src/app/api
mv src/admin.disabled src/app/admin
mv src/middleware.ts.disabled src/middleware.ts
```

2. **Atualizar `next.config.ts`:**
```typescript
const nextConfig: NextConfig = {
  // Remover: output: "export"
  // Remover: basePath
  images: {
    // Remover: unoptimized: true
  },
};
```

3. **Configurar variáveis de ambiente:**
```bash
# Criar .env.local com:
NEXTAUTH_URL=https://seu-dominio.com
NEXTAUTH_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
# ... Firebase configs
```

4. **Deploy em plataforma com Node.js:**
- Vercel (recomendado para Next.js)
- Netlify
- Railway
- Render

## 📚 Recursos

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages](https://docs.github.com/en/pages)
- [GitHub Actions](https://docs.github.com/en/actions)

## ⚠️ Limitações do GitHub Pages

- ❌ Sem servidor Node.js
- ❌ Sem API routes
- ❌ Sem SSR (Server-Side Rendering)
- ❌ Sem ISR (Incremental Static Regeneration)
- ❌ Sem autenticação server-side
- ❌ Sem variáveis de ambiente secretas
- ✅ Apenas arquivos estáticos (HTML/CSS/JS)

## 🎉 Resultado

Site 100% funcional hospedado gratuitamente no GitHub Pages:

🌐 **https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/**

---

**Nota**: Este é um trade-off aceitável para um projeto de conteúdo educacional onde os links podem ser editados diretamente no código. Para um sistema com múltiplos editores ou atualizações frequentes, considere usar uma plataforma com servidor.

