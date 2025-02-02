// Challenge structure
export const Challenge = {
  id: '',
  title: '',
  description: '',
  type: 'revenue', // 'revenue', 'productivity', 'growth', or 'savings'
  category: 'daily', // 'daily', 'weekly', or 'monthly'
  reward: {
    type: 'badge', // 'badge', 'achievement', or 'points'
    value: ''
  },
  participants: 0,
  target: 0,
  startDate: '',
  endDate: '',
  milestones: [
    {
      target: 0,
      description: ''
    }
  ]
};

// Author structure
export const Author = {
  id: '',
  name: '',
  avatar: ''
};

// Thought structure
export const Thought = {
  id: '',
  content: '',
  author: Author,
  upvotes: 0,
  comments: 0,
  createdAt: ''
};

// TrendingTopic structure
export const TrendingTopic = {
  id: '',
  name: '',
  posts: 0,
  growth: 0
};
