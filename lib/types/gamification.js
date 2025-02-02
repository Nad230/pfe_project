// Achievement structure
export const Achievement = {
  id: '',
  title: '',
  description: '',
  icon: '',
  progress: 0,
  completed: false,
  reward: {
    type: 'badge', // 'badge', 'token', or 'points'
    value: 0
  },
  unlockedAt: '' // optional property
};

// Leaderboard structure
export const Leaderboard = {
  id: '',
  title: '',
  type: 'financial', // 'financial', 'productivity', or 'sustainability'
  timeframe: 'daily', // 'daily', 'weekly', or 'monthly'
  entries: [
    {
      position: 0,
      userId: '',
      name: '',
      avatar: '',
      score: 0,
      trend: 'up' // 'up', 'down', or 'stable'
    }
  ]
};

// UserProgress structure
export const UserProgress = {
  level: 0,
  experience: 0,
  nextLevelAt: 0,
  achievements: [Achievement], // Array of achievements
  tokens: 0,
  badges: [] // Array of badges
};
