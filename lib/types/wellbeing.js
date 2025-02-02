const MoodLevel = {
  EXCELLENT: "excellent",
  GOOD: "good",
  NEUTRAL: "neutral",
  LOW: "low",
  POOR: "poor"
};

const EnergyLevel = {
  HIGH: "high",
  MODERATE: "moderate",
  LOW: "low"
};

const StressLevel = {
  NONE: "none",
  MILD: "mild",
  MODERATE: "moderate",
  HIGH: "high",
  SEVERE: "severe"
};

const WellbeingCheck = {
  id: "",
  date: "",
  mood: MoodLevel.NEUTRAL,
  energy: EnergyLevel.MODERATE,
  stress: StressLevel.NONE,
  notes: "",
  tags: [],
  correlations: {
    productivity: 0, // -1 to 1
    revenue: 0, // -1 to 1
    workHours: 0
  }
};

const WellbeingInsight = {
  id: "",
  type: "productivity", // 'productivity' | 'work-life-balance' | 'stress-management'
  title: "",
  description: "",
  recommendation: "",
  impact: "positive", // 'positive' | 'negative'
  correlationStrength: 0 // 0 to 1
};

const WellbeingStats = {
  averageMood: 3, // 1-5
  averageEnergy: 2, // 1-3
  averageStress: 3, // 1-5
  topProductiveMoods: [],
  stressFactors: [],
  wellbeingTrend: "stable" // 'improving' | 'stable' | 'declining'
};

export { MoodLevel, EnergyLevel, StressLevel, WellbeingCheck, WellbeingInsight, WellbeingStats };
