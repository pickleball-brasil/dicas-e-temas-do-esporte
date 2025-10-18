# 🚀 Quick Start - Deploy GitHub Pages

## ⚡ Deploy em 3 Passos

### 1️⃣ Inicializar Git

```bash
git init
git add .
git commit -m "Initial commit: Pickle Favorites PWA"
```

### 2️⃣ Conectar com GitHub

```bash
git remote add origin https://github.com/pickleball-brasil/dicas-e-temas-do-esporte.git
git branch -M main
git push -u origin main
```

### 3️⃣ Configurar GitHub Pages

1. Acesse: https://github.com/pickleball-brasil/dicas-e-temas-do-esporte/settings/pages
2. Em **Source**, selecione: **GitHub Actions**
3. Pronto! ✅

## 🌐 Seu Site

Após alguns minutos, acesse:

**https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/**

## 📝 Editar Conteúdo

### Adicionar/Remover Links

Edite: `src/lib/mockData.ts`

```typescript
"Dink": [
  "https://www.youtube.com/watch?v=...",
  "https://www.youtube.com/watch?v=...",
],
```

### Adicionar/Editar Dicas

Edite: `src/lib/sectionTips.ts`

```typescript
"Dink": [
  "Joelhos flexionados, corpo baixo",
  "Mire para os pés do adversário",
],
```

### Editar Descrições

Edite: `src/lib/sectionDescriptions.ts`

```typescript
"Dink": "O dink é um golpe suave...",
```

## 🔄 Atualizar o Site

```bash
git add .
git commit -m "Atualizei os links"
git push origin main
```

Deploy automático! 🎉

## 🆘 Problemas?

Veja os logs em:
https://github.com/pickleball-brasil/dicas-e-temas-do-esporte/actions

## 📚 Documentação Completa

- `DEPLOY.md` - Guia detalhado de deploy
- `GITHUB_PAGES_CHANGES.md` - O que foi alterado e por quê
- `README.md` - Documentação completa do projeto

---

**Pronto para começar? Execute os 3 passos acima!** 🚀

