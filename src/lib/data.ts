
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
    { date: '2024-01-15', chest: '102 cm', waist: '85 cm', hips: '98 cm' },
    { date: '2024-03-15', chest: '103 cm', waist: '82 cm', hips: '97 cm' },
    { date: '2024-06-15', chest: '105 cm', waist: '80 cm', hips: '96 cm' },
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
    coverImageId: 'plan-cover-2',
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
        comments: 5
    },
    {
        id: 2,
        user: { name: 'Maria G.', avatarId: 'user-avatar-2' },
        time: 'há 1 dia',
        text: 'Sessão de yoga matinal para começar o dia bem. Encontrei meu zen. 🙏',
        image: { id: 'social-post-2' },
        likes: 128,
        comments: 12
    },
    {
        id: 3,
        user: { name: 'Você', avatarId: 'user-avatar-3' },
        time: 'há 3 dias',
        text: 'Novo recorde no supino hoje! Lenta e constantemente ficando mais forte.',
        image: null,
        likes: 15,
        comments: 2
    },
];

export const exerciseLog = [
    { id: 1, date: '2024-07-22', exercise: 'Supino', details: '3 séries, 8 reps, 60kg', effort: 6 },
    { id: 2, date: '2024-07-22', exercise: 'Agachamento', details: '4 séries, 10 reps, 80kg', effort: 9 },
    { id: 3, date: '2024-07-20', exercise: 'Corrida Matinal', details: '5 km, 30 mins', effort: 4 },
    { id: 4, date: '2024-07-19', exercise: 'Barra Fixa', details: '3 séries, até a falha', effort: 8 },
];
