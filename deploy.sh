#!/bin/bash

# Script de Deploy para GitHub Pages
# Este script facilita o processo de deploy

echo "🚀 Iniciando deploy para GitHub Pages..."
echo ""

# Verifica se há mudanças não commitadas
if [[ -n $(git status -s) ]]; then
  echo "⚠️  Você tem mudanças não commitadas."
  echo ""
  read -p "Deseja commitar todas as mudanças? (s/n) " -n 1 -r
  echo ""
  
  if [[ $REPLY =~ ^[Ss]$ ]]; then
    echo "📝 Adicionando arquivos..."
    git add .
    
    echo ""
    read -p "Digite a mensagem do commit: " commit_message
    
    echo "💾 Fazendo commit..."
    git commit -m "$commit_message"
  else
    echo "❌ Deploy cancelado. Commit suas mudanças primeiro."
    exit 1
  fi
fi

echo ""
echo "🔄 Fazendo push para GitHub..."
git push origin main

echo ""
echo "✅ Push concluído!"
echo ""
echo "🎉 O GitHub Actions irá fazer o deploy automaticamente."
echo "📊 Acompanhe em: https://github.com/pickleball-brasil/dicas-e-temas-do-esporte/actions"
echo ""
echo "🌐 Site estará disponível em alguns minutos em:"
echo "   https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/"
echo ""

