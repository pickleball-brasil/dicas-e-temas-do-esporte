# 🚀 Guia de Deploy - GitHub Pages

Este guia mostra como fazer o deploy do **Pickle Favorites** no GitHub Pages.

## ✅ Pré-requisitos

- Conta no GitHub
- Git instalado localmente
- Node.js 18+ instalado

## 📋 Passo a Passo

### 1️⃣ Preparar o Repositório Local

```bash
# Navegue até a pasta do projeto
cd pickle-favorites

# Inicialize o git (se ainda não foi feito)
git init

# Adicione todos os arquivos
git add .

# Faça o primeiro commit
git commit -m "Initial commit: Pickle Favorites PWA"
```

### 2️⃣ Conectar com o Repositório GitHub

```bash
# Adicione o remote do repositório
git remote add origin https://github.com/pickleball-brasil/dicas-e-temas-do-esporte.git

# Verifique se foi adicionado corretamente
git remote -v

# Renomeie a branch para main (se necessário)
git branch -M main

# Faça o push inicial
git push -u origin main
```

### 3️⃣ Configurar GitHub Pages

1. Acesse: https://github.com/pickleball-brasil/dicas-e-temas-do-esporte
2. Clique em **Settings** (⚙️ Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione **GitHub Actions**
5. Pronto! O deploy será automático a partir de agora

### 4️⃣ Verificar o Deploy

Após o push, o GitHub Actions irá:

1. **Detectar o push** na branch `main`
2. **Instalar dependências** (`npm ci`)
3. **Fazer build** do Next.js (`npm run build`)
4. **Criar arquivo .nojekyll** (para funcionar corretamente)
5. **Fazer deploy** para GitHub Pages

Você pode acompanhar o progresso em:
- **Actions** tab no repositório
- URL: https://github.com/pickleball-brasil/dicas-e-temas-do-esporte/actions

### 5️⃣ Acessar o Site

Após alguns minutos, o site estará disponível em:

🌐 **https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/**

## 🔄 Atualizações Futuras

Para atualizar o site, basta fazer push para a branch `main`:

```bash
# Faça suas alterações nos arquivos
# Depois:

git add .
git commit -m "Descrição das alterações"
git push origin main
```

O deploy será automático! ⚡

## 🛠️ Arquivos de Configuração

Os seguintes arquivos foram configurados para o GitHub Pages:

### `next.config.ts`
```typescript
{
  output: "export",              // Gera site estático
  basePath: "/dicas-e-temas-do-esporte",  // Subpath do GitHub Pages
  images: { unoptimized: true }  // Imagens não otimizadas (necessário para export)
}
```

### `.github/workflows/deploy.yml`
Workflow do GitHub Actions que automatiza o deploy.

### `public/.nojekyll`
Arquivo vazio que previne o Jekyll de processar os arquivos.

## ⚠️ Notas Importantes

### 1. BasePath
O projeto está configurado com `basePath: "/dicas-e-temas-do-esporte"`.

Isso significa que todos os links internos automaticamente incluem esse prefixo.

### 2. Static Export
O projeto usa `output: "export"` que gera um site 100% estático.

**Limitações:**
- ❌ Não suporta API Routes dinâmicas
- ❌ Não suporta Server-Side Rendering (SSR)
- ❌ Não suporta Incremental Static Regeneration (ISR)
- ✅ Suporta Client-Side Rendering
- ✅ Suporta Static Generation
- ✅ Suporta Client-Side Data Fetching

Como o projeto usa **mock data** estático, isso não é um problema!

### 3. Firebase
Firebase e autenticação estão comentados. Para usar no futuro, você precisará:
- Hospedar em plataforma que suporte API routes (Vercel, Netlify, etc.)
- Ou usar Firebase Hosting + Cloud Functions

### 4. PWA
O PWA funcionará normalmente no GitHub Pages! 🎉

## 🐛 Troubleshooting

### Deploy falhou?

1. Verifique a aba **Actions** no GitHub
2. Clique no workflow que falhou
3. Veja os logs de erro
4. Corrija o problema localmente
5. Faça push novamente

### Site não carrega?

1. Verifique se o deploy foi concluído (aba Actions)
2. Aguarde 5-10 minutos (pode demorar na primeira vez)
3. Limpe o cache do navegador (Ctrl+Shift+R)
4. Verifique se o GitHub Pages está ativo em Settings > Pages

### Erro 404 em rotas?

- GitHub Pages não suporta SPA routing automaticamente
- O projeto está configurado como site estático simples
- Todas as páginas são geradas no build

### Imagens não aparecem?

- Verifique se `images.unoptimized: true` está no `next.config.ts`
- Use caminhos relativos para imagens em `/public`

## 📚 Recursos Adicionais

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🎉 Pronto!

Seu site está no ar! Compartilhe o link:

🌐 **https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/**

---

**Desenvolvido com ❤️ para a comunidade de Pickleball Brasil** 🏓

