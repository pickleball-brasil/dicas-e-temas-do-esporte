export interface RecommendedVideo {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: 'técnica' | 'estratégia' | 'drills' | 'partidas' | 'dicas' | 'outros';
  duration?: string;
  channel?: string;
}

export const RECOMMENDED_VIDEOS: RecommendedVideo[] = [
  // Vídeos do canal Mari Humberg Pickleball
  {
    id: '1',
    title: 'Dicas pra Competir Melhor',
    description: 'Dicas valiosas para melhorar seu desempenho em competições de pickleball.',
    youtubeId: 'tEl6XuvAaOw',
    category: 'dicas',
    duration: '10:49',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '2',
    title: 'Execução de Lobs',
    description: 'Aprenda a técnica correta para executar lobs efetivos no pickleball.',
    youtubeId: 'BLh2qvTB6k4',
    category: 'técnica',
    duration: '13:53',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '3',
    title: 'Técnica e Execução do Smash',
    description: 'Domine a técnica e execução do smash, um dos golpes mais poderosos do pickleball.',
    youtubeId: '8ug8QQguJ7s',
    category: 'técnica',
    duration: '7:28',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '4',
    title: 'Dinks!!!',
    description: 'Guia completo sobre dinks, fundamentais para o jogo de rede no pickleball.',
    youtubeId: '4l_KnjzRZzY',
    category: 'técnica',
    duration: '17:18',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '5',
    title: 'Execução do Ataque no Ar',
    description: 'Aprenda a técnica de ataque no ar para dominar o jogo ofensivo.',
    youtubeId: 'RMJl4GlrOcU',
    category: 'técnica',
    duration: '9:55',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '6',
    title: 'Execução do Ataque Depois do Pingo',
    description: 'Técnica de ataque após o pingo, essencial para o jogo estratégico.',
    youtubeId: 'BJwU_Jvn3cs',
    category: 'técnica',
    duration: '9:41',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '7',
    title: 'Como Lidar com "Bangers"',
    description: 'Estratégias para lidar com jogadores que usam golpes rápidos e agressivos.',
    youtubeId: 'pobPllGV7AA',
    category: 'estratégia',
    duration: '10:54',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '8',
    title: 'Execução da Quarta Bola',
    description: 'Aprenda a técnica correta para executar a quarta bola no pickleball.',
    youtubeId: 'k5yHumxzW2g',
    category: 'técnica',
    duration: '9:29',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '9',
    title: 'Técnica de Tipos Diferentes de Devolução de Saque',
    description: 'Explore os diferentes tipos de devolução de saque e quando usar cada um.',
    youtubeId: '6t6XygLJehU',
    category: 'técnica',
    duration: '7:24',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '10',
    title: 'Técnica de Tipos Diferentes de Saque',
    description: 'Aprenda os diferentes tipos de saque e suas aplicações no jogo.',
    youtubeId: 'xdsNQnJis3g',
    category: 'técnica',
    duration: '6:52',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '11',
    title: 'Terceiras Bolas: Drops e Drives',
    description: 'Entenda a diferença entre drops e drives na terceira bola e quando usar cada um.',
    youtubeId: 'XhFPpmUGxmY',
    category: 'técnica',
    duration: '4:58',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '12',
    title: '4 Estratégias Básicas de Duplas',
    description: 'Conheça as quatro estratégias fundamentais para jogar duplas no pickleball.',
    youtubeId: '8zaSqxdMKO8',
    category: 'estratégia',
    duration: '4:45',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '13',
    title: 'Demonstração dos Erros Comuns',
    description: 'Demonstração visual dos erros mais comuns cometidos por jogadores.',
    youtubeId: 'hFWfr4xVx-0',
    category: 'dicas',
    duration: '2:25',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '14',
    title: 'Erros Comuns no Pickleball',
    description: 'Aprenda a identificar e evitar os erros mais comuns no pickleball.',
    youtubeId: 'HReg-4BlkRI',
    category: 'dicas',
    duration: '4:00',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '15',
    title: 'Explicação do Placar com Vantagem e Rally Scoring no Pickleball',
    description: 'Entenda como funciona o sistema de pontuação com vantagem e rally scoring.',
    youtubeId: 'AorVXv8RGcA',
    category: 'dicas',
    duration: '10:05',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '16',
    title: 'Zona de Transição - Contra Ataques e Resets',
    description: 'Estratégias para a zona de transição, incluindo contra-ataques e resets.',
    youtubeId: 'NlcOwJJ70cw',
    category: 'estratégia',
    duration: '12:36',
    channel: 'Mari Humberg Pickleball'
  },
  {
    id: '17',
    title: '3 Regras Básicas do Pickleball',
    description: 'Conheça as três regras fundamentais que todo jogador de pickleball deve saber.',
    youtubeId: 'RvE4Wh6Ffik',
    category: 'dicas',
    duration: '1:48',
    channel: 'Mari Humberg Pickleball'
  },
  
  // Vídeos sobre Regras do Pickleball em Português Brasileiro
  {
    id: '20',
    title: 'Aprenda Pickleball Rápido: Regras e Dicas para Começar',
    description: 'Guia rápido e completo sobre as regras básicas do pickleball para iniciantes.',
    youtubeId: 'iMBQN3bbBLk',
    category: 'dicas',
    duration: '4:50',
    channel: 'Pickleball Brasil'
  },
  {
    id: '23',
    title: 'Regras Básicas do Pickleball - Pontuação no Pickleball',
    description: 'Entenda as regras básicas e o sistema de pontuação do pickleball.',
    youtubeId: 'dBHMbwr8CUI',
    category: 'dicas',
    duration: '7:35',
    channel: 'Pickleball BH- Brasil 🇧🇷'
  },
];

