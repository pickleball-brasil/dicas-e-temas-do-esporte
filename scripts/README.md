# Scripts de População de Dados

## populate-links.json

Este arquivo contém links de exemplo para cada seção do projeto. Os links apontam para canais populares de pickleball no YouTube:

### Canais Recomendados:

- **Pickleball Kitchen** (@PickleballKitchen) - Um dos maiores canais de pickleball com tutoriais detalhados
- **Selkirk TV** (@SelkirkTV) - Canal oficial da Selkirk com conteúdo profissional
- **Better Pickleball** (@BetterPickleball) - Foco em melhorar técnicas específicas
- **USA Pickleball** - Site oficial com regras e recursos

## Como Usar

### Opção 1: Adicionar Manualmente via Admin

1. Faça login no painel Admin com sua conta Google
2. Para cada seção, clique em "Adicionar link"
3. Cole os URLs do arquivo `populate-links.json`
4. Clique em "Salvar"

### Opção 2: Importar via Firebase Console

1. Acesse o Firebase Console do seu projeto
2. Vá em Firestore Database
3. Crie uma collection chamada `sectionLinks`
4. Para cada seção, crie um documento com:
   - ID do documento: nome da seção (ex: "Dink")
   - Campo `section`: nome da seção
   - Campo `urls`: array com os links

### Opção 3: Script de Importação (Futuro)

Você pode criar um script Node.js para importar automaticamente:

\`\`\`javascript
const admin = require('firebase-admin');
const links = require('./populate-links.json');

// Inicializar Firebase Admin
// ... código de inicialização

async function populateLinks() {
  const db = admin.firestore();
  
  for (const [section, urls] of Object.entries(links)) {
    await db.collection('sectionLinks').doc(section).set({
      section,
      urls
    });
    console.log(`✓ ${section} populado`);
  }
}

populateLinks();
\`\`\`

## Personalizando os Links

Você pode substituir os links por vídeos específicos que preferir. Recomendações:

1. Busque no YouTube por: "pickleball [nome da técnica] tutorial"
2. Prefira vídeos de canais reconhecidos
3. Verifique se o vídeo tem boa qualidade e legendas (se necessário)
4. Adicione vídeos em português quando disponíveis

## Links Úteis

- [Pickleball Kitchen](https://www.youtube.com/@PickleballKitchen)
- [Selkirk TV](https://www.youtube.com/@SelkirkTV)
- [USA Pickleball Rules](https://usapickleball.org/what-is-pickleball/official-rules/)
- [PPA Tour](https://www.youtube.com/@PPATour)
- [Major League Pickleball](https://www.youtube.com/@MajorLeaguePickleball)

