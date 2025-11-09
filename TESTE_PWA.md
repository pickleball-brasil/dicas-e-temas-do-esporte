# 🧪 Como Testar o PWA Localmente

## ⚠️ Importante

O PWA precisa de HTTPS (ou localhost) e um build de produção para funcionar corretamente. O modo de desenvolvimento do Next.js não suporta todos os recursos do PWA.

## 📋 Opções para Testar

### Opção 1: Build e Servir Localmente (Recomendado)

1. **Faça o build do projeto:**
   ```bash
   npm run build
   ```

2. **Instale um servidor HTTP simples:**
   ```bash
   # Opção A: Usando npx serve (não precisa instalar)
   npx serve out -p 3000
   
   # Opção B: Usando Python (se tiver instalado)
   cd out
   python -m http.server 3000
   
   # Opção C: Usando Node.js http-server
   npx http-server out -p 3000
   ```

3. **Acesse:**
   ```
   http://localhost:3000/dicas-e-temas-do-esporte/
   ```

4. **Teste a instalação:**
   - No Chrome/Edge: Procure o ícone de instalação na barra de endereços
   - O prompt de instalação deve aparecer automaticamente após alguns segundos
   - Ou clique no botão "Instalar" no prompt customizado

### Opção 2: Usar HTTPS Local (Mais Realista)

Para testar como se fosse produção:

1. **Instale mkcert:**
   ```bash
   # Windows (com Chocolatey)
   choco install mkcert
   
   # Ou baixe de: https://github.com/FiloSottile/mkcert/releases
   ```

2. **Crie certificado local:**
   ```bash
   mkcert -install
   mkcert localhost 127.0.0.1
   ```

3. **Use um servidor HTTPS:**
   ```bash
   # Com serve e certificado
   npx serve out -p 3000 --ssl-cert localhost.pem --ssl-key localhost-key.pem
   ```

4. **Acesse:**
   ```
   https://localhost:3000/dicas-e-temas-do-esporte/
   ```

### Opção 3: Testar no Mobile (Mais Realista)

1. **Descubra seu IP local:**
   ```bash
   # Windows
   ipconfig
   
   # Linux/Mac
   ifconfig
   ```

2. **Inicie o servidor acessível na rede:**
   ```bash
   npx serve out -p 3000 --listen 0.0.0.0
   ```

3. **No seu celular (mesma rede Wi-Fi):**
   - Acesse: `http://SEU_IP:3000/dicas-e-temas-do-esporte/`
   - Teste a instalação no navegador mobile

## 🔍 Verificações

### 1. Verificar Service Worker
- Abra DevTools (F12)
- Vá em **Application** > **Service Workers**
- Deve mostrar o service worker registrado

### 2. Verificar Manifest
- DevTools > **Application** > **Manifest**
- Deve mostrar as informações do PWA

### 3. Verificar Console
- DevTools > **Console**
- Deve aparecer: "Service Worker registrado com sucesso"
- Deve aparecer: "beforeinstallprompt event recebido!" (quando disponível)

### 4. Testar Instalação
- **Chrome/Edge Desktop:**
  - Ícone de instalação na barra de endereços
  - Ou prompt customizado no canto inferior direito
  
- **Mobile (Android Chrome):**
  - Menu > "Adicionar à tela inicial"
  - Ou prompt automático

- **iOS Safari:**
  - Compartilhar > "Adicionar à Tela de Início"
  - O prompt customizado mostra instruções

## 🐛 Troubleshooting

### Service Worker não registra
- Limpe o cache: DevTools > Application > Clear storage
- Desregistre service workers antigos
- Recarregue a página

### Prompt não aparece
- Verifique se já está instalado (não aparece se já instalado)
- Limpe o localStorage: `localStorage.removeItem('pwa-install-dismissed')`
- Verifique o console para erros

### Erro 404 no Service Worker
- Certifique-se de fazer `npm run build` antes
- Verifique se o arquivo `out/sw.js` existe

## 📝 Notas

- O PWA funciona melhor após build de produção
- Em desenvolvimento (`npm run dev`), alguns recursos podem não funcionar
- O prompt de instalação só aparece em navegadores compatíveis (Chrome, Edge, Safari iOS)

