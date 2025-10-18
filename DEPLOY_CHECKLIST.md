# ✅ Checklist de Deploy - GitHub Pages

Use este checklist para garantir que tudo está configurado corretamente.

## 📋 Antes do Deploy

### Configuração Local

- [ ] Node.js 18+ instalado
- [ ] Git instalado e configurado
- [ ] Projeto testado localmente (`npm run dev`)
- [ ] Build local funcionando (`npm run build`)

### Arquivos Verificados

- [ ] `next.config.ts` - configurado com `output: "export"` e `basePath`
- [ ] `.github/workflows/deploy.yml` - workflow criado
- [ ] `public/.nojekyll` - arquivo existe
- [ ] `package.json` - script de export configurado

### Pastas Desabilitadas

- [ ] `src/api.disabled/` - API routes movidas
- [ ] `src/admin.disabled/` - Admin page movida

- [ ] `src/middleware.ts.disabled` - Middleware desabilitado

## 🚀 Durante o Deploy

### Inicialização Git

- [ ] `git init` executado
- [ ] Todos os arquivos adicionados (`git add .`)
- [ ] Commit inicial criado (`git commit -m "..."`)

### Conexão com GitHub

- [ ] Remote adicionado (`git remote add origin ...`)
- [ ] Branch renomeada para `main` (`git branch -M main`)
- [ ] Push inicial realizado (`git push -u origin main`)

### Configuração GitHub Pages

- [ ] Acessou Settings > Pages no GitHub
- [ ] Source configurado para "GitHub Actions"
- [ ] Workflow executado com sucesso (verificar aba Actions)

## ✅ Após o Deploy

### Verificações

- [ ] Site acessível em: https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/
- [ ] Todas as seções carregando
- [ ] Modais abrindo corretamente
- [ ] Dicas sendo exibidas
- [ ] Links funcionando
- [ ] PWA instalável
- [ ] Responsivo em mobile

### Testes Funcionais

- [ ] Clicar em cada seção (Básico, Intermediário, Avançado, Táticas)
- [ ] Verificar se modais abrem
- [ ] Verificar se descrições aparecem
- [ ] Verificar se dicas estão corretas
- [ ] Testar em diferentes navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Testar em mobile

### Performance

- [ ] Lighthouse score > 90
- [ ] Tempo de carregamento < 3s
- [ ] Service Worker ativo
- [ ] Cache funcionando

## 🔄 Próximos Passos

### Manutenção

- [ ] Documentar processo de atualização para a equipe
- [ ] Criar guia de como adicionar novos links
- [ ] Configurar notificações de deploy (opcional)
- [ ] Adicionar Google Analytics (opcional)

### Melhorias Futuras

- [ ] Adicionar mais seções se necessário
- [ ] Expandir dicas com base em feedback
- [ ] Considerar migração para plataforma com servidor (se necessário)
- [ ] Implementar sistema de busca (opcional)

## 📊 Métricas de Sucesso

Após 1 semana:
- [ ] Site acessível 24/7
- [ ] Sem erros no console
- [ ] Feedback positivo dos usuários
- [ ] PWA sendo instalado

## 🆘 Troubleshooting

### Deploy falhou?

1. [ ] Verificar logs em Actions tab
2. [ ] Confirmar que build local funciona
3. [ ] Verificar se todas as dependências estão no package.json
4. [ ] Limpar cache e tentar novamente

### Site não carrega?

1. [ ] Aguardar 5-10 minutos (primeira vez pode demorar)
2. [ ] Verificar se GitHub Pages está ativo em Settings
3. [ ] Limpar cache do navegador (Ctrl+Shift+R)
4. [ ] Verificar se o workflow foi concluído com sucesso

### Erro 404?

1. [ ] Verificar se basePath está correto no next.config.ts
2. [ ] Confirmar que arquivo .nojekyll existe em /out
3. [ ] Verificar se o deploy foi para a branch correta

## 📝 Notas

- O primeiro deploy pode levar até 10 minutos
- Deploys subsequentes são mais rápidos (2-3 minutos)
- Mudanças no código requerem novo push para atualizar o site
- GitHub Pages tem limite de 100GB de bandwidth/mês (mais que suficiente)

## ✨ Pronto!

Quando todos os itens estiverem marcados, seu site está no ar! 🎉

---

**Data do Deploy**: _________________

**Responsável**: _________________

**URL Final**: https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/

