# Guia Completo: Como Incluir Vídeos nas Páginas Markdown

## 🎥 **Suporte a Vídeos**

O sistema suporta vídeos do **YouTube**, **Vimeo** e outros players via iframe.

## 📋 **Templates Prontos**

### **1. YouTube**

#### Template Básico
```html
<div class="youtube-video">
<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Título do Vídeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
```

#### Exemplo Prático
```html
<div class="youtube-video">
<iframe src="https://www.youtube.com/embed/ELHqH8C5pA8" title="Regras Básicas do Pickleball" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
```

### **2. Vimeo**

#### Template Básico
```html
<div class="vimeo-video">
<iframe src="https://player.vimeo.com/video/VIDEO_ID" title="Título do Vídeo" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>
```

#### Exemplo Prático
```html
<div class="vimeo-video">
<iframe src="https://player.vimeo.com/video/123456789" title="Técnicas Avançadas de Pickleball" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>
```

### **3. Outros Players (Genérico)**

```html
<div class="video-container">
<iframe src="URL_DO_VIDEO" title="Título do Vídeo" frameborder="0" allowfullscreen></iframe>
</div>
```

## 🔧 **Como Obter o ID do Vídeo**

### **YouTube**
1. **URL normal**: `https://www.youtube.com/watch?v=ELHqH8C5pA8`
2. **ID do vídeo**: `ELHqH8C5pA8`
3. **URL de embed**: `https://www.youtube.com/embed/ELHqH8C5pA8`

### **Vimeo**
1. **URL normal**: `https://vimeo.com/123456789`
2. **ID do vídeo**: `123456789`
3. **URL de embed**: `https://player.vimeo.com/video/123456789`

## 📝 **Exemplo Completo em Markdown**

```markdown
# Minha Seção de Estudo

Conteúdo da seção aqui...

## Vídeos Educativos

### Regras Básicas
<div class="youtube-video">
<iframe src="https://www.youtube.com/embed/ELHqH8C5pA8" title="Regras Básicas do Pickleball" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### Técnicas Avançadas
<div class="vimeo-video">
<iframe src="https://player.vimeo.com/video/123456789" title="Técnicas Avançadas" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
</div>

## Próximos Passos

- Assista aos vídeos acima
- Pratique as técnicas mostradas
- Continue estudando outras seções
```

## 🎨 **Características dos Vídeos**

### **Design Responsivo**
- **Aspect ratio**: 16:9 automático
- **Responsivo**: Adapta-se a qualquer tamanho de tela
- **Bordas arredondadas**: Visual moderno
- **Sombra sutil**: Profundidade visual

### **Funcionalidades**
- **Fullscreen**: Suporte completo a tela cheia
- **Controles nativos**: Play, pause, volume, etc.
- **Acessibilidade**: Títulos descritivos
- **Performance**: Carregamento otimizado

## 🚀 **Dicas de Uso**

### **1. Títulos Descritivos**
Sempre inclua um `title` descritivo no iframe:
```html
title="Regras Básicas do Pickleball"
```

### **2. Organização**
Agrupe vídeos por categoria:
```markdown
## Vídeos para Iniciantes
## Vídeos Intermediários
## Vídeos Avançados
```

### **3. Contexto**
Sempre explique o que o vídeo mostra:
```markdown
### Técnica de Saque
Este vídeo demonstra a técnica correta de saque:

<div class="youtube-video">
<!-- iframe aqui -->
</div>
```

### **4. Múltiplos Vídeos**
Para vários vídeos, use seções separadas:
```markdown
### Vídeo 1: Fundamentos
<div class="youtube-video">
<!-- iframe 1 -->
</div>

### Vídeo 2: Prática
<div class="youtube-video">
<!-- iframe 2 -->
</div>
```

## 🔧 **Personalização CSS**

### **Alterar Tamanho**
```css
.markdown-content .youtube-video {
  padding-bottom: 75%; /* 4:3 aspect ratio */
  /* ou */
  padding-bottom: 56.25%; /* 16:9 aspect ratio (padrão) */
}
```

### **Alterar Espaçamento**
```css
.markdown-content .youtube-video {
  margin: 2rem 0; /* Mais espaço */
  /* ou */
  margin: 0.5rem 0; /* Menos espaço */
}
```

### **Alterar Bordas**
```css
.markdown-content .youtube-video {
  border-radius: 1rem; /* Bordas mais arredondadas */
  /* ou */
  border-radius: 0; /* Sem bordas */
}
```

## ✅ **Checklist de Implementação**

- [ ] Escolher a plataforma (YouTube/Vimeo/Outro)
- [ ] Obter o ID do vídeo
- [ ] Copiar o template apropriado
- [ ] Substituir `VIDEO_ID` pelo ID real
- [ ] Adicionar título descritivo
- [ ] Testar em diferentes tamanhos de tela
- [ ] Verificar se o vídeo carrega corretamente

## 🎯 **Exemplo Prático**

Veja a página de **Regras** (`content/sections/Regras.md`) para um exemplo completo com vídeo do YouTube integrado.

---

**Pronto!** Agora você pode incluir vídeos de qualquer plataforma nas suas páginas Markdown com design profissional e responsivo! 🎉
