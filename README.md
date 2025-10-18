# 🏓 Pickle Favorites

Uma aplicação PWA moderna para gerenciar e explorar recursos de pickleball organizados por seções de jogo.

🌐 **[Ver Demo ao Vivo](https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/)**

## ✨ Funcionalidades

- **Interface Moderna**: Design clean com Tailwind CSS, cards com glassmorphism e animações suaves
- **Modal de Seções**: Ao clicar em cada seção, abre um modal com descrição detalhada e lista de vídeos
- **Descrições Educativas**: Cada seção possui uma explicação sobre o tópico (Dink, Voleio, Smash, etc.)
- **Organização por Níveis**: Seções divididas em Básico, Intermediário e Avançado
- **Links Pré-carregados**: 24 seções com links para canais populares de pickleball
- **PWA**: Instalável como app nativo com suporte offline
- **Dados Estáticos**: Atualmente usa mock data (Firebase comentado para uso futuro)

## 🎯 Seções Disponíveis

### Golpes Fundamentais
1. **Dink** - Golpes suaves próximos à rede
2. **Voleio** - Rebatidas antes da bola tocar o chão
3. **Smash** - Golpes de ataque poderosos
4. **Saque** - Início de cada ponto
5. **Devolução** - Resposta ao saque
6. **Lob** - Bola alta sobre adversários
7. **Drop Shot** - Third shot drop suave

### Técnicas Avançadas
8. **Acelerar as bolas** - Mudança de ritmo
9. **Reset** - Técnica defensiva
10. **Bloqueio** - Defesa na rede
11. **Terceira bola** - Estratégia crucial

### Estratégia e Tática
12. **Táticas** - Estratégias de jogo
13. **Posicionamento** - Onde ficar em quadra
14. **Transição** - Movimento fundo-rede
15. **Jogo de Duplas** - Comunicação e sincronização
16. **Defesa** - Posicionamento defensivo
17. **Ataque** - Quando e como atacar

### Fundamentos
18. **Footwork** - Trabalho de pés
19. **Regras** - Regras oficiais

### Desenvolvimento
20. **Preparação Física** - Condicionamento
21. **Mental Game** - Jogo mental
22. **Erros Comuns** - O que evitar
23. **Drills e Treinos** - Exercícios estruturados
24. **Dicas** - Conselhos gerais

## 🚀 Como Usar

### Pré-requisitos

- Node.js 18+

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/pickleball-brasil/dicas-e-temas-do-esporte.git
cd dicas-e-temas-do-esporte
```

2. Instale as dependências:
```bash
npm install
```

3. Execute em desenvolvimento:
```bash
npm run dev
```

4. Acesse: `http://localhost:3000`

5. Build para produção:
```bash
npm run build
npm start
```

## 🚀 Deploy no GitHub Pages

Este projeto está configurado para deploy automático no GitHub Pages.

### Deploy Automático

Sempre que você fizer push para a branch `main`, o GitHub Actions irá:
1. Fazer build do projeto
2. Gerar os arquivos estáticos
3. Fazer deploy automático para GitHub Pages

### Configuração Inicial (Primeira Vez)

1. Vá para o repositório no GitHub
2. Clique em **Settings** > **Pages**
3. Em **Source**, selecione **GitHub Actions**
4. Faça um push para a branch `main` para iniciar o deploy

### Deploy Manual

Para fazer deploy manualmente:
```bash
npm run build
```

O site estará disponível em: `https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/`

### ⚠️ Nota sobre Firebase

**Firebase e autenticação estão comentados no código.**

O projeto atualmente usa dados estáticos (mock data) em `src/lib/mockData.ts`.

Para habilitar Firebase e autenticação no futuro:
1. Descomente o código nos arquivos marcados com `// TODO:`
2. Configure as variáveis de ambiente no `.env.local`
3. Descomente as importações do Firebase

## 📱 PWA

O app é instalável como PWA. Após acessar, você verá a opção de "Instalar" no navegador.

## 🔐 Autenticação

- A página inicial é pública
- O painel Admin requer login com Google
- Apenas usuários autenticados podem adicionar/editar/remover links

## 🛠️ Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Estilização moderna
- **NextAuth.js** - Autenticação
- **Firebase** - Database e Admin SDK
- **next-pwa** - Progressive Web App

## 📂 Estrutura

```
src/
├── app/
│   ├── admin/          # Painel administrativo
│   ├── api/            # API routes (auth, links)
│   ├── layout.tsx      # Layout global
│   └── page.tsx        # Página inicial com modais
├── components/
│   ├── Modal.tsx       # Componente de modal
│   └── SectionModal.tsx # Modal com conteúdo da seção
└── lib/
    ├── firebase.ts           # Firebase client
    ├── firebaseAdmin.ts      # Firebase admin
    ├── sections.ts           # Constantes de seções
    └── sectionDescriptions.ts # Descrições educativas
```

## 🎨 Design

- Fundo sólido clean (`#f8fafc`)
- Cards com backdrop-blur e hover effects
- Botões com gradientes e animações
- Ícones coloridos por seção
- Modal responsivo com scroll

## 📚 Editando os Links

### Método Atual (Mock Data)

Os links estão em `src/lib/mockData.ts`. Para editá-los:

1. Abra o arquivo `src/lib/mockData.ts`
2. Encontre a seção que deseja editar
3. Modifique o array de URLs
4. Salve o arquivo
5. A página será atualizada automaticamente (hot reload)

Exemplo:
```typescript
"Dink": [
  "https://www.youtube.com/@PickleballKitchen",
  "https://www.youtube.com/@SelkirkTV",
  "https://seu-link-aqui.com"
],
```

### Canais Recomendados:
- **Pickleball Kitchen** - Tutoriais detalhados
- **Selkirk TV** - Conteúdo profissional  
- **Better Pickleball** - Técnicas específicas
- **USA Pickleball** - Regras oficiais
- **PPA Tour** - Torneios profissionais

### Futuro: Firebase (Comentado)

Quando habilitar Firebase, você poderá gerenciar links via:
- Admin Panel (`/admin`) com autenticação
- Firebase Console diretamente
- API REST

Veja `scripts/README.md` para mais detalhes sobre integração Firebase.

## 📝 Licença

MIT

## 👨‍💻 Desenvolvido com

Next.js • React • TypeScript • Tailwind CSS • Firebase
