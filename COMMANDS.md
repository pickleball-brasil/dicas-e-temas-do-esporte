# ⚡ Comandos Rápidos

Referência rápida de comandos para o projeto.

## 🚀 Deploy

### Windows (PowerShell)

```powershell
# Deploy automático (recomendado)
.\deploy.ps1

# Ou manual
git add .
git commit -m "Suas alterações"
git push origin main
```

### Linux/Mac (Bash)

```bash
# Deploy automático (recomendado)
./deploy.sh

# Ou manual
git add .
git commit -m "Suas alterações"
git push origin main
```

## 💻 Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build local (testar antes de deploy)
npm run build

# Rodar build localmente
npm start

# Linter
npm run lint
```

## 🔧 Git

### Primeiro Setup

```bash
# Inicializar
git init

# Adicionar remote
git remote add origin https://github.com/pickleball-brasil/dicas-e-temas-do-esporte.git

# Primeira vez
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

### Atualizações

```bash
# Status
git status

# Adicionar tudo
git add .

# Commit
git commit -m "Descrição das mudanças"

# Push
git push origin main

# Ver histórico
git log --oneline

# Ver branches
git branch -a
```

## 📝 Edição de Conteúdo

### Adicionar Links

```bash
# Abrir arquivo
code src/lib/mockData.ts

# Ou
notepad src/lib/mockData.ts
```

### Adicionar Dicas

```bash
# Abrir arquivo
code src/lib/sectionTips.ts

# Ou
notepad src/lib/sectionTips.ts
```

### Editar Descrições

```bash
# Abrir arquivo
code src/lib/sectionDescriptions.ts

# Ou
notepad src/lib/sectionDescriptions.ts
```

## 🧹 Limpeza

```bash
# Limpar cache Next.js
rm -rf .next
# Windows PowerShell:
Remove-Item -Path ".next" -Recurse -Force

# Limpar build
rm -rf out
# Windows PowerShell:
Remove-Item -Path "out" -Recurse -Force

# Limpar node_modules (se necessário)
rm -rf node_modules
npm install
# Windows PowerShell:
Remove-Item -Path "node_modules" -Recurse -Force
npm install
```

## 🔍 Verificação

```bash
# Ver status do Git
git status

# Ver diferenças
git diff

# Ver remote
git remote -v

# Testar build
npm run build

# Ver versão do Node
node --version

# Ver versão do npm
npm --version
```

## 📊 GitHub

### URLs Úteis

```bash
# Abrir repositório
start https://github.com/pickleball-brasil/dicas-e-temas-do-esporte

# Abrir Actions (ver deploys)
start https://github.com/pickleball-brasil/dicas-e-temas-do-esporte/actions

# Abrir Settings
start https://github.com/pickleball-brasil/dicas-e-temas-do-esporte/settings

# Abrir site
start https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/
```

### Linux/Mac

```bash
# Abrir repositório
open https://github.com/pickleball-brasil/dicas-e-temas-do-esporte

# Abrir Actions
open https://github.com/pickleball-brasil/dicas-e-temas-do-esporte/actions

# Abrir site
open https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/
```

## 🐛 Troubleshooting

```bash
# Limpar tudo e recomeçar
rm -rf .next out node_modules
npm install
npm run build

# Windows PowerShell:
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "out" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
npm install
npm run build

# Forçar push (CUIDADO!)
git push origin main --force

# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Ver logs de erro
npm run build 2>&1 | more
```

## 📦 Package Management

```bash
# Atualizar dependências
npm update

# Ver dependências desatualizadas
npm outdated

# Adicionar nova dependência
npm install nome-do-pacote

# Remover dependência
npm uninstall nome-do-pacote

# Limpar cache do npm
npm cache clean --force
```

## 🔄 Workflow Típico

### Adicionar Novo Conteúdo

```bash
# 1. Editar arquivos
code src/lib/mockData.ts

# 2. Testar localmente
npm run dev
# Abrir http://localhost:3000

# 3. Build de teste
npm run build

# 4. Commit e push
git add .
git commit -m "Adicionei novos links para Dink"
git push origin main

# 5. Verificar deploy
# Ir para: https://github.com/pickleball-brasil/dicas-e-temas-do-esporte/actions
```

### Corrigir Erro

```bash
# 1. Ver o erro
git status
npm run build

# 2. Corrigir arquivo
code src/...

# 3. Testar
npm run build

# 4. Commit
git add .
git commit -m "Corrigido erro em..."
git push origin main
```

## 🎯 Atalhos Úteis

### VS Code

```bash
# Abrir projeto
code .

# Abrir arquivo específico
code src/app/page.tsx

# Buscar em arquivos
Ctrl+Shift+F (Windows/Linux)
Cmd+Shift+F (Mac)
```

### Terminal

```bash
# Limpar terminal
clear  # Linux/Mac
cls    # Windows

# Histórico de comandos
history

# Buscar comando anterior
Ctrl+R

# Cancelar comando
Ctrl+C
```

## 📚 Documentação

```bash
# Ver todos os guias
ls *.md

# Windows:
dir *.md

# Ler guia específico
cat QUICK_START.md

# Windows:
type QUICK_START.md
```

## 🎉 Deploy Rápido (Resumo)

```bash
# Tudo em um comando (depois do primeiro setup)
git add . && git commit -m "Update" && git push origin main
```

---

**Dica**: Salve este arquivo nos favoritos para referência rápida! 📌

