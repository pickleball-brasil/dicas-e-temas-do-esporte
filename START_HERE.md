# 👋 Bem-vindo ao Pickle Favorites!

## 🎉 Seu projeto está pronto para deploy no GitHub Pages!

### 🚀 Comece Aqui

Você tem **3 opções** para começar:

#### 1️⃣ Deploy Rápido (Recomendado)
```bash
# Leia este arquivo primeiro:
QUICK_START.md
```
**Para quem quer**: Deploy em 5 minutos

---

#### 2️⃣ Deploy Detalhado
```bash
# Leia estes arquivos na ordem:
1. DEPLOY.md              # Guia completo
2. DEPLOY_CHECKLIST.md    # Checklist passo a passo
```
**Para quem quer**: Entender cada etapa

---

#### 3️⃣ Entender as Mudanças
```bash
# Leia estes arquivos:
1. GITHUB_PAGES_CHANGES.md  # O que foi alterado
2. SETUP_SUMMARY.md         # Resumo visual
```
**Para quem quer**: Saber o que aconteceu

---

## 📚 Documentação Completa

| Arquivo | Descrição | Quando Usar |
|---------|-----------|-------------|
| **QUICK_START.md** | Deploy em 3 passos | Primeiro deploy |
| **DEPLOY.md** | Guia completo de deploy | Referência detalhada |
| **DEPLOY_CHECKLIST.md** | Checklist passo a passo | Durante o deploy |
| **GITHUB_PAGES_CHANGES.md** | Mudanças técnicas | Entender alterações |
| **SETUP_SUMMARY.md** | Resumo visual | Visão geral |
| **COMMANDS.md** | Comandos rápidos | Referência diária |
| **README.md** | Documentação do projeto | Informações gerais |

---

## ⚡ Deploy em 3 Comandos

Se você já sabe o que está fazendo:

```bash
git init && git add . && git commit -m "Initial commit"
git remote add origin https://github.com/pickleball-brasil/dicas-e-temas-do-esporte.git
git branch -M main && git push -u origin main
```

Depois: **Settings > Pages > Source: GitHub Actions**

---

## 🎯 O Que Você Pode Fazer

### ✅ Funciona no GitHub Pages

- ✅ **51 Seções** de pickleball
- ✅ **Modais** com descrições e dicas
- ✅ **Design moderno** e responsivo
- ✅ **PWA** instalável
- ✅ **Animações** suaves
- ✅ **4 Níveis**: Básico, Intermediário, Avançado, Táticas

### 📝 Como Editar Conteúdo

```typescript
// Adicionar/editar links
src/lib/mockData.ts

// Adicionar/editar dicas
src/lib/sectionTips.ts

// Editar descrições
src/lib/sectionDescriptions.ts
```

---

## 🌐 URLs Importantes

| Recurso | URL |
|---------|-----|
| **Seu Site** | https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/ |
| **Repositório** | https://github.com/pickleball-brasil/dicas-e-temas-do-esporte |
| **Ver Deploys** | https://github.com/pickleball-brasil/dicas-e-temas-do-esporte/actions |
| **Configurar** | https://github.com/pickleball-brasil/dicas-e-temas-do-esporte/settings/pages |

---

## 🛠️ Scripts Úteis

### Windows (PowerShell)

```powershell
# Deploy automático
.\deploy.ps1

# Desenvolvimento
npm run dev

# Build local
npm run build
```

### Linux/Mac (Bash)

```bash
# Deploy automático
./deploy.sh

# Desenvolvimento
npm run dev

# Build local
npm run build
```

---

## 🎓 Primeiro Deploy - Passo a Passo

### 1. Verificar Pré-requisitos

```bash
node --version    # Deve ser 18+
git --version     # Deve estar instalado
npm --version     # Deve estar instalado
```

### 2. Testar Localmente

```bash
npm install
npm run dev
# Abrir http://localhost:3000
```

### 3. Testar Build

```bash
npm run build
# Deve completar sem erros
```

### 4. Fazer Deploy

Siga o **QUICK_START.md** ou **DEPLOY.md**

---

## 🆘 Precisa de Ajuda?

### Problema com Build?

```bash
# Limpar e tentar novamente
rm -rf .next out node_modules
npm install
npm run build
```

### Problema com Git?

```bash
# Ver status
git status

# Ver diferenças
git diff

# Ver remote
git remote -v
```

### Problema com Deploy?

1. Verificar logs: https://github.com/pickleball-brasil/dicas-e-temas-do-esporte/actions
2. Confirmar que GitHub Pages está ativo
3. Aguardar 5-10 minutos (primeira vez)
4. Limpar cache do navegador (Ctrl+Shift+R)

---

## 📊 Estrutura do Projeto

```
📦 pickle-favorites/
├── 📁 src/
│   ├── 📁 app/              # Páginas Next.js
│   ├── 📁 components/       # Componentes React
│   └── 📁 lib/
│       ├── 📝 mockData.ts         # ← Editar links aqui
│       ├── 📝 sectionTips.ts      # ← Editar dicas aqui
│       └── 📝 sectionDescriptions.ts
├── 📁 .github/workflows/    # Deploy automático
├── 📄 QUICK_START.md        # ← Comece aqui!
├── 📄 DEPLOY.md
├── 📄 COMMANDS.md
└── 📄 README.md
```

---

## 🎯 Próximos Passos

1. [ ] Ler **QUICK_START.md**
2. [ ] Fazer primeiro deploy
3. [ ] Verificar se site está no ar
4. [ ] Testar todas as funcionalidades
5. [ ] Compartilhar com a comunidade! 🎉

---

## 💡 Dicas Importantes

- ⚡ **Deploy é automático** - apenas faça push para `main`
- 📝 **Edite os arquivos** em `src/lib/` para alterar conteúdo
- 🧪 **Sempre teste localmente** antes de fazer push
- 📊 **Acompanhe deploys** na aba Actions do GitHub
- 🔄 **Primeiro deploy** pode levar até 10 minutos

---

## 🎉 Pronto para Começar?

### Opção 1: Rápido
```bash
# Abrir guia rápido
code QUICK_START.md
```

### Opção 2: Detalhado
```bash
# Abrir guia completo
code DEPLOY.md
```

### Opção 3: Explorar
```bash
# Ver todos os guias
ls *.md
```

---

## 🌟 Recursos Adicionais

- 📖 [Next.js Docs](https://nextjs.org/docs)
- 🚀 [GitHub Pages Docs](https://docs.github.com/en/pages)
- ⚙️ [GitHub Actions Docs](https://docs.github.com/en/actions)

---

## 📞 Suporte

- **Problemas técnicos**: Verifique `GITHUB_PAGES_CHANGES.md`
- **Comandos**: Veja `COMMANDS.md`
- **Deploy**: Siga `DEPLOY.md`

---

# 🚀 Vamos começar!

**Próximo arquivo**: `QUICK_START.md`

**Boa sorte com seu projeto! 🏓**

---

<div align="center">

**Desenvolvido com ❤️ para a comunidade de Pickleball Brasil**

🌐 **[Ver Site](https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/)**

</div>

