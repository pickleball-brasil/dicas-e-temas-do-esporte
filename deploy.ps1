# Script de Deploy para GitHub Pages (PowerShell)
# Este script facilita o processo de deploy

Write-Host "🚀 Iniciando deploy para GitHub Pages..." -ForegroundColor Cyan
Write-Host ""

# Verifica se há mudanças não commitadas
$status = git status -s
if ($status) {
    Write-Host "⚠️  Você tem mudanças não commitadas." -ForegroundColor Yellow
    Write-Host ""
    $response = Read-Host "Deseja commitar todas as mudanças? (s/n)"
    
    if ($response -eq "s" -or $response -eq "S") {
        Write-Host "📝 Adicionando arquivos..." -ForegroundColor Green
        git add .
        
        Write-Host ""
        $commitMessage = Read-Host "Digite a mensagem do commit"
        
        Write-Host "💾 Fazendo commit..." -ForegroundColor Green
        git commit -m $commitMessage
    }
    else {
        Write-Host "❌ Deploy cancelado. Commit suas mudanças primeiro." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "🔄 Fazendo push para GitHub..." -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "✅ Push concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 O GitHub Actions irá fazer o deploy automaticamente." -ForegroundColor Cyan
Write-Host "📊 Acompanhe em: https://github.com/pickleball-brasil/dicas-e-temas-do-esporte/actions" -ForegroundColor Blue
Write-Host ""
Write-Host "🌐 Site estará disponível em alguns minutos em:" -ForegroundColor Cyan
Write-Host "   https://pickleball-brasil.github.io/dicas-e-temas-do-esporte/" -ForegroundColor Blue
Write-Host ""

