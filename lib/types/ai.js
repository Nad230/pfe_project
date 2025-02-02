// Extending existing AI types

// AIRecommendation structure
export const AIRecommendation = {
  id: '',
  type: 'financial', // 'financial', 'productivity', 'community', or 'wellbeing'
  title: '',
  description: '',
  impact: {
    type: 'cost', // 'cost', 'revenue', 'time', or 'wellbeing'
    value: 0,
    unit: ''
  },
  confidence: 0,
  actionable: true,
  suggestedActions: [],
  createdAt: ''
};

// AISimulation structure
export const AISimulation = {
  id: '',
  type: 'revenue', // 'revenue', 'expense', 'time', or 'habit'
  scenario: {
    current: 0,
    projected: 0,
    change: 0,
    confidence: 0
  },
  assumptions: [],
  risks: [],
  opportunities: [],
  createdAt: ''
};

// AICorrelation structure
export const AICorrelation = {
  id: '',
  type: 'mood-productivity', // 'mood-productivity', 'habit-revenue', or 'time-income'
  factor1: '',
  factor2: '',
  strength: 0, // -1 to 1
  significance: 0, // 0 to 1
  description: '',
  createdAt: ''
};

// AIMarketInsight structure
export const AIMarketInsight = {
  id: '',
  trend: '',
  relevance: 0, // 0 to 1
  marketSize: 0,
  growthRate: 0,
  competitors: 0,
  opportunities: [],
  risks: [],
  createdAt: ''
};
// AIInsight structure (example)
export const AIInsight = {
  id: '',
  type: 'market', // Example type: 'market', 'financial', etc.
  description: '',
  value: 0,
  relevance: 0, // 0 to 1
  impact: {
    cost: 0,
    revenue: 0
  },
  createdAt: ''
};
