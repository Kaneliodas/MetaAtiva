export const recentActivities = [
  {
    user: 'You',
    exercise: 'Morning Run',
    date: '1 day ago',
    details: '5 km in 30 minutes',
  },
  {
    user: 'You',
    exercise: 'Strength Training',
    date: '3 days ago',
    details: 'Bench Press: 3 sets of 8 reps @ 60kg',
  },
  {
    user: 'You',
    exercise: 'Yoga Session',
    date: '5 days ago',
    details: '45 minutes of Vinyasa Flow',
  },
];

export const userGoals = [
  {
    id: 1,
    title: 'Run 10k',
    current: 7,
    target: 10,
    unit: 'km',
  },
  {
    id: 2,
    title: 'Lose Weight',
    current: 78,
    target: 75,
    unit: 'kg',
  },
  {
    id: 3,
    title: 'Workout Sessions',
    current: 12,
    target: 15,
    unit: 'sessions/month',
  },
];

export const bmiHistory = [
  { date: 'Jan', bmi: 24.5 },
  { date: 'Feb', bmi: 24.1 },
  { date: 'Mar', bmi: 23.8 },
  { date: 'Apr', bmi: 23.2 },
  { date: 'May', bmi: 22.9 },
  { date: 'Jun', bmi: 22.5 },
];

export const bodyMeasurements = [
    { date: '2024-01-15', chest: '102 cm', waist: '85 cm', hips: '98 cm' },
    { date: '2024-03-15', chest: '103 cm', waist: '82 cm', hips: '97 cm' },
    { date: '2024-06-15', chest: '105 cm', waist: '80 cm', hips: '96 cm' },
];

export const trainingPlans = [
  {
    slug: 'beginner-full-body',
    title: 'Beginner Full Body',
    description: 'A 3-day per week plan perfect for those new to the gym.',
    level: 'Beginner',
    coverImageId: 'plan-cover-1',
    schedule: {
      'Day 1: Full Body A': [
        'Squats: 3 sets of 8-12 reps',
        'Push-ups: 3 sets to failure',
        'Dumbbell Rows: 3 sets of 8-12 reps',
        'Plank: 3 sets, 30-60 seconds',
      ],
      'Day 2: Full Body B': [
        'Deadlifts: 3 sets of 5-8 reps',
        'Overhead Press: 3 sets of 8-12 reps',
        'Pull-ups / Lat Pulldowns: 3 sets of 8-12 reps',
        'Leg Raises: 3 sets of 15-20 reps',
      ],
      'Day 3: Full Body C': [
        'Lunges: 3 sets of 10-15 reps per leg',
        'Dumbbell Bench Press: 3 sets of 8-12 reps',
        'Face Pulls: 3 sets of 15-20 reps',
        'Bicep Curls: 3 sets of 10-15 reps',
      ],
    },
  },
  {
    slug: 'intermediate-ppl',
    title: 'Intermediate Push/Pull/Legs',
    description: 'A 6-day split for those ready to take their training to the next level.',
    level: 'Intermediate',
    coverImageId: 'plan-cover-2',
    schedule: {
        'Day 1: Push': [
            'Bench Press: 4 sets of 6-8 reps',
            'Overhead Press: 3 sets of 8-10 reps',
            'Incline Dumbbell Press: 3 sets of 10-12 reps',
            'Tricep Pushdowns: 3 sets of 10-15 reps',
            'Lateral Raises: 4 sets of 12-15 reps',
        ],
        'Day 2: Pull': [
            'Deadlifts: 3 sets of 5 reps',
            'Pull-ups: 4 sets to failure',
            'Barbell Rows: 4 sets of 8-10 reps',
            'Face Pulls: 3 sets of 15-20 reps',
            'Bicep Curls: 3 sets of 10-12 reps',
        ],
        'Day 3: Legs': [
            'Squats: 4 sets of 6-8 reps',
            'Romanian Deadlifts: 3 sets of 10-12 reps',
            'Leg Press: 3 sets of 10-15 reps',
            'Leg Curls: 3 sets of 12-15 reps',
            'Calf Raises: 5 sets of 15-20 reps',
        ],
        'Day 4: Push': ['...'],
        'Day 5: Pull': ['...'],
        'Day 6: Legs': ['...'],
    },
  },
  {
    slug: 'cardio-blast',
    title: 'Cardio Blast',
    description: 'Improve your cardiovascular health with this high-intensity plan.',
    level: 'All Levels',
    coverImageId: 'plan-cover-3',
    schedule: {
      'Monday: HIIT': ['20 minutes of 30s sprint, 30s rest on a treadmill'],
      'Wednesday: Steady-State': ['45 minutes of moderate-intensity cycling'],
      'Friday: Cross-Training': ['30 minutes of rowing or elliptical'],
    }
  }
];

export const socialFeed = [
    {
        id: 1,
        user: { name: 'Alex T.', avatarId: 'user-avatar-1' },
        time: '2 hours ago',
        text: 'Just crushed my 5k personal best! Feeling amazing. The new training plan is really paying off. #running #fitness #goals',
        image: { id: 'social-post-1' },
        likes: 42,
        comments: 5
    },
    {
        id: 2,
        user: { name: 'Maria G.', avatarId: 'user-avatar-2' },
        time: '1 day ago',
        text: 'Morning yoga session to start the day right. Found my zen. 🙏',
        image: { id: 'social-post-2' },
        likes: 128,
        comments: 12
    },
    {
        id: 3,
        user: { name: 'You', avatarId: 'user-avatar-3' },
        time: '3 days ago',
        text: 'Hit a new PR on bench press today! Slowly but surely getting stronger.',
        image: null,
        likes: 15,
        comments: 2
    },
];

export const exerciseLog = [
    { id: 1, date: '2024-07-22', exercise: 'Bench Press', details: '3 sets, 8 reps, 60kg', effort: '😐' },
    { id: 2, date: '2024-07-22', exercise: 'Squats', details: '4 sets, 10 reps, 80kg', effort: '😫' },
    { id: 3, date: '2024-07-20', exercise: 'Morning Run', details: '5 km, 30 mins', effort: '🙂' },
    { id: 4, date: '2024-07-19', exercise: 'Pull-ups', details: '3 sets, to failure', effort: '😕' },
];
