
export const recentActivities = [
  {
    user: 'Você',
    exercise: 'Corrida Matinal',
    date: 'há 1 dia',
    details: '5 km em 30 minutos',
  },
  {
    user: 'Você',
    exercise: 'Treino de Força',
    date: 'há 3 dias',
    details: 'Supino: 3 séries de 8 reps @ 60kg',
  },
  {
    user: 'Você',
    exercise: 'Sessão de Yoga',
    date: 'há 5 dias',
    details: '45 minutos de Vinyasa Flow',
  },
];

export const userGoals = [
  {
    id: 1,
    title: 'Correr 10k',
    current: 7,
    target: 10,
    unit: 'km',
  },
  {
    id: 2,
    title: 'Perder Peso',
    start: 82, // Add a starting value for weight loss goals
    current: 78,
    target: 75,
    unit: 'kg',
  },
  {
    id: 3,
    title: 'Sessões de Treino',
    current: 12,
    target: 15,
    unit: 'sessões/mês',
  },
];

export const bmiHistory = [
  { date: 'Jan', bmi: 24.5 },
  { date: 'Fev', bmi: 24.1 },
  { date: 'Mar', bmi: 23.8 },
  { date: 'Abr', bmi: 23.2 },
  { date: 'Mai', bmi: 22.9 },
  { date: 'Jun', bmi: 22.5 },
];

export const bodyMeasurements = [
    { date: '2024-01-15', weight: '82 kg', height: '175 cm', chest: '102 cm', waist: '85 cm', hips: '98 cm' },
    { date: '2024-03-15', weight: '79 kg', height: '175 cm', chest: '103 cm', waist: '82 cm', hips: '97 cm' },
    { date: '2024-06-15', weight: '78 kg', height: '175 cm', chest: '105 cm', waist: '80 cm', hips: '96 cm' },
];

export const trainingPlans = [
  {
    slug: 'iniciante-corpo-inteiro',
    title: 'Iniciante Corpo Inteiro',
    description: 'Um plano de 3 dias por semana, perfeito para quem é novo na academia.',
    level: 'Iniciante',
    coverImageId: 'plan-cover-1',
    schedule: {
      'Dia 1: Corpo Inteiro A': [
        'Agachamento: 3 séries de 8-12 reps',
        'Flexões: 3 séries até a falha',
        'Remada com Halter: 3 séries de 8-12 reps',
        'Prancha: 3 séries, 30-60 segundos',
      ],
      'Dia 2: Corpo Inteiro B': [
        'Levantamento Terra: 3 séries de 5-8 reps',
        'Desenvolvimento com Halteres: 3 séries de 8-12 reps',
        'Puxada na Polia Alta / Barra Fixa: 3 séries de 8-12 reps',
        'Elevação de Pernas: 3 séries de 15-20 reps',
      ],
      'Dia 3: Corpo Inteiro C': [
        'Afundo: 3 séries de 10-15 reps por perna',
        'Supino com Halteres: 3 séries de 8-12 reps',
        'Face Pulls: 3 séries de 15-20 reps',
        'Rosca Bíceps: 3 séries de 10-15 reps',
      ],
    },
  },
  {
    slug: 'intermediario-ppl',
    title: 'Intermediário Push/Pull/Legs',
    description: 'Uma divisão de 6 dias para quem está pronto para levar o treino para o próximo nível.',
    level: 'Intermediário',
    coverImageId: 'plan-cover-4',
    schedule: {
        'Dia 1: Empurrar': [
            'Supino: 4 séries de 6-8 reps',
            'Desenvolvimento: 3 séries de 8-10 reps',
            'Supino Inclinado com Halteres: 3 séries de 10-12 reps',
            'Tríceps na Polia: 3 séries de 10-15 reps',
            'Elevação Lateral: 4 séries de 12-15 reps',
        ],
        'Dia 2: Puxar': [
            'Levantamento Terra: 3 séries de 5 reps',
            'Barra Fixa: 4 séries até a falha',
            'Remada Curvada: 4 séries de 8-10 reps',
            'Face Pulls: 3 séries de 15-20 reps',
            'Rosca Bíceps: 3 séries de 10-12 reps',
        ],
        'Dia 3: Pernas': [
            'Agachamento: 4 séries de 6-8 reps',
            'Levantamento Terra Romeno: 3 séries de 10-12 reps',
            'Leg Press: 3 séries de 10-15 reps',
            'Flexora: 3 séries de 12-15 reps',
            'Panturrilha: 5 séries de 15-20 reps',
        ],
        'Dia 4: Empurrar': ['...'],
        'Dia 5: Puxar': ['...'],
        'Dia 6: Pernas': ['...'],
    },
  },
  {
    slug: 'cardio-explosivo',
    title: 'Cardio Explosivo',
    description: 'Melhore sua saúde cardiovascular com este plano de alta intensidade.',
    level: 'Todos os Níveis',
    coverImageId: 'plan-cover-3',
    schedule: {
      'Segunda: HIIT': ['20 minutos de 30s de sprint, 30s de descanso na esteira'],
      'Quarta: Ritmo Constante': ['45 minutos de ciclismo de intensidade moderada'],
      'Sexta: Treino Cruzado': ['30 minutos de remo ou elíptico'],
    }
  }
];

export const socialFeed = [
    {
        id: 1,
        user: { name: 'Alex T.', avatarId: 'user-avatar-1' },
        time: 'há 2 horas',
        text: 'Acabei de bater meu recorde pessoal nos 5k! Sensação incrível. O novo plano de treino está realmente valendo a pena. #corrida #fitness #metas',
        image: { id: 'social-post-1' },
        likes: 42,
        comments: [
            { id: 1, user: { name: 'Maria G.', avatarId: 'user-avatar-2' }, text: 'Parabéns Alex! Continue assim!' },
            { id: 2, user: { name: 'Você', avatarId: 'user-avatar-3' }, text: 'Incrível! 💪' },
        ],
    },
    {
        id: 2,
        user: { name: 'Maria G.', avatarId: 'user-avatar-2' },
        time: 'há 1 dia',
        text: 'Sessão de yoga matinal para começar o dia bem. Encontrei meu zen. 🙏',
        image: { id: 'social-post-2' },
        likes: 128,
        comments: [
            { id: 1, user: { name: 'Alex T.', avatarId: 'user-avatar-1' }, text: 'Que foto linda!' },
        ],
    },
    {
        id: 3,
        user: { name: 'Você', avatarId: 'user-avatar-3' },
        time: 'há 3 dias',
        text: 'Novo recorde no supino hoje! Lenta e constantemente ficando mais forte.',
        image: null,
        likes: 15,
        comments: [],
    },
    {
        id: 4,
        user: { name: 'Carlos S.', avatarId: 'user-avatar-4' },
        time: 'há 4 dias',
        text: 'Preparei esta receita de Salada de Quinoa. Ficou fantástica!',
        image: { id: 'social-post-3' },
        likes: 76,
        comments: [],
    },
    {
        id: 5,
        user: { name: 'Juliana P.', avatarId: 'user-avatar-5' },
        time: 'há 5 dias',
        text: 'Primeiro dia do plano "Iniciante Corpo Inteiro". Desafiodor, mas me sentindo ótima!',
        image: null,
        likes: 31,
        comments: [],
    }
];

export const exerciseLog = [
    { id: 1, date: '2024-07-22', exercise: 'Supino', details: '3 séries, 8 reps, 60kg', effort: 6 },
    { id: 2, date: '2024-07-22', exercise: 'Agachamento', details: '4 séries, 10 reps, 80kg', effort: 9 },
    { id: 3, date: '2024-07-20', exercise: 'Corrida Matinal', details: '5 km, 30 mins', effort: 4 },
    { id: 4, date: '2024-07-19', exercise: 'Barra Fixa', details: '3 séries, até a falha', effort: 8 },
];

export const recipes = [
  {
    slug: 'salada-de-quinoa-com-frango-grelhado',
    title: 'Salada de Quinoa com Frango Grelhado',
    description: 'Uma salada rica em proteínas e nutrientes, perfeita para um almoço leve e satisfatório.',
    prepTime: '15 min',
    cookTime: '20 min',
    servings: '2',
    difficulty: 'Fácil',
    tags: ['Almoço', 'Rica em proteínas', 'Emagrecimento'],
    coverImageId: 'recipe-cover-1',
    nutrition: {
        calories: '450 kcal',
        protein: '40g',
        carbs: '30g',
        fat: '18g',
    },
    ingredients: [
      '1 xícara de quinoa cozida',
      '200g de peito de frango grelhado e desfiado',
      '1/2 pepino em cubos',
      '1/2 pimentão vermelho em cubos',
      '1/4 de xícara de cebola roxa picada',
      '1/4 de xícara de salsinha fresca picada',
      'Suco de 1 limão',
      '2 colheres de sopa de azeite de oliva extra virgem',
      'Sal e pimenta a gosto',
    ],
    instructions: [
      'Em uma tigela grande, combine a quinoa cozida, o frango desfiado, o pepino, o pimentão, a cebola roxa e a salsinha.',
      'Em uma tigela pequena, misture o suco de limão, o azeite, o sal e a pimenta para fazer o molho.',
      'Despeje o molho sobre a salada e misture bem.',
      'Sirva imediatamente ou leve à geladeira por até 2 dias.',
    ],
  },
  {
    slug: 'smoothie-verde-energetico',
    title: 'Smoothie Verde Energético',
    description: 'Comece seu dia com energia total com este smoothie verde delicioso e nutritivo.',
    prepTime: '5 min',
    cookTime: '0 min',
    servings: '1',
    difficulty: 'Fácil',
    tags: ['Café da manhã', 'Lanche', 'Vegana'],
    coverImageId: 'recipe-cover-2',
    nutrition: {
        calories: '250 kcal',
        protein: '15g',
        carbs: '35g',
        fat: '8g',
    },
    ingredients: [
      '1 xícara de espinafre fresco',
      '1/2 banana congelada',
      '1/2 maçã verde, sem sementes',
      '1/4 de xícara de iogurte grego natural (ou de coco para vegano)',
      '1/2 xícara de água ou leite de amêndoas',
      '1 colher de sopa de sementes de chia',
    ],
    instructions: [
      'Coloque todos os ingredientes no liquidificador.',
      'Bata em alta velocidade até ficar homogêneo e cremoso.',
      'Despeje em um copo e sirva imediatamente.',
    ],
  },
  {
    slug: 'panquecas-de-aveia-e-banana',
    title: 'Panquecas de Aveia e Banana',
    description: 'Uma opção de café da manhã saudável, sem glúten e sem açúcar refinado.',
    prepTime: '5 min',
    cookTime: '10 min',
    servings: '1',
    difficulty: 'Médio',
    tags: ['Café da manhã', 'Manutenção'],
    coverImageId: 'recipe-cover-3',
    nutrition: {
        calories: '350 kcal',
        protein: '18g',
        carbs: '50g',
        fat: '10g',
    },
    ingredients: [
        '1 banana madura amassada',
        '2 ovos',
        '1/2 xícara de aveia em flocos',
        '1/2 colher de chá de canela em pó',
        '1/2 colher de chá de fermento em pó',
        'Óleo de coco ou manteiga para untar',
    ],
    instructions: [
        'Em uma tigela, misture a banana amassada e os ovos.',
        'Adicione a aveia, a canela e o fermento e misture até incorporar.',
        'Aqueça uma frigideira em fogo médio e unte com óleo de coco ou manteiga.',
        'Despeje pequenas porções da massa na frigideira para formar as panquecas.',
        'Cozinhe por 2-3 minutos de cada lado, ou até dourar.',
        'Sirva com suas frutas favoritas, mel ou iogurte.',
    ]
  }
];

export const trainingChallenges = {
  daily: {
    id: 101,
    title: "Desafio de Flexões",
    details: "Faça 50 flexões (pode ser dividido em séries).",
    reward: "10 pontos",
    isCompleted: false,
  },
  weekly: [
    {
      id: 201,
      title: "Consistência Semanal",
      details: "Registre pelo menos 3 treinos esta semana.",
      current: 1,
      target: 3,
      unit: "treinos",
      reward: "50 pontos",
    },
    {
      id: 202,
      title: "Mestre do Agachamento",
      details: "Agache com um total de 1000kg (séries x reps x peso).",
      current: 0,
      target: 1000,
      unit: "kg",
      reward: "75 pontos",
    },
  ],
};

export const weeklyChallengesPool = [
    {
      id: 301,
      title: "Rei da Barra Fixa",
      details: "Complete 50 repetições de barra fixa na semana.",
      current: 0,
      target: 50,
      unit: "reps",
      reward: "80 pontos",
    },
    {
      id: 302,
      title: "Maratonista de Esteira",
      details: "Corra um total de 21km na esteira esta semana.",
      current: 0,
      target: 21,
      unit: "km",
      reward: "100 pontos",
    },
    {
      id: 303,
      title: "Guerreiro do HIIT",
      details: "Faça 2 sessões de treino HIIT de 20 minutos.",
      current: 0,
      target: 2,
      unit: "sessões",
      reward: "60 pontos",
    },
];
    
export const challengeHistory: {
  id: number;
  challengeId?: number;
  date: string;
  title: string;
  status: 'Concluído' | 'Não Concluído';
  points: number;
  type: 'Diário' | 'Semanal';
}[] = [
  // Mês Atual
  { id: 1, date: '25/07/2024', title: 'Corrida de 5km', status: 'Concluído', points: 10, type: 'Diário' },
  { id: 2, date: '24/07/2024', title: 'Fazer 100 flexões', status: 'Concluído', points: 15, type: 'Diário' },
  { id: 3, date: '21/07/2024', title: 'Treinar 4x na semana', status: 'Não Concluído', points: 50, type: 'Semanal', challengeId: 901 },
  { id: 4, date: '23/07/2024', title: '30 minutos de cardio', status: 'Concluído', points: 10, type: 'Diário' },
  
  // Mês Anterior
  { id: 5, date: '15/06/2024', title: 'Yoga Matinal', status: 'Concluído', points: 10, type: 'Diário' },
  { id: 6, date: '12/06/2024', title: 'Aumentar peso no supino', status: 'Concluído', points: 20, type: 'Semanal', challengeId: 902 },
  { id: 7, date: '10/06/2024', title: 'Desafio de Prancha (3 min)', status: 'Não Concluído', points: 15, type: 'Diário' },
  
  // Mês Retrasado
  { id: 8, date: '20/05/2024', title: 'Semana sem açúcar', status: 'Concluído', points: 100, type: 'Semanal', challengeId: 903 },
  { id: 9, date: '15/05/2024', title: 'Beber 2L de água/dia', status: 'Concluído', points: 30, type: 'Diário' },
];
