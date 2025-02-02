// Formation Types
const FormationType = {
  COURSE: 'course',
  WEBINAR: 'webinar',
  TUTORIAL: 'tutorial'
};

// Formation Levels
const FormationLevel = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
};

// Formation Categories
const FormationCategory = {
  FINANCIAL: 'financial',
  MARKETING: 'marketing',
  PRODUCTIVITY: 'productivity',
  BUSINESS: 'business',
  TECH: 'tech',
  LEGAL: 'legal'
};

// Formation structure
export const Formation = {
  id: '',
  type: FormationType.COURSE, // or WEBINAR / TUTORIAL
  title: '',
  description: '',
  category: FormationCategory.FINANCIAL, // Use the appropriate category
  level: FormationLevel.BEGINNER, // or INTERMEDIATE / ADVANCED
  duration: 0, // in minutes
  modules: [
    {
      id: '',
      title: '',
      duration: 0, // in minutes
      lessons: [
        {
          id: '',
          title: '',
          duration: 0, // in minutes
          completed: false // optional
        }
      ]
    }
  ],
  price: 0,
  rating: 0, // out of 5
  reviews: 0,
  students: 0,
  instructor: {
    id: '',
    name: '',
    avatar: '',
    title: '',
    bio: ''
  },
  preview: '', // optional
  skills: [], // array of skills
  requirements: [], // optional
  createdAt: '',
  updatedAt: ''
};

// Formation Progress structure
export const FormationProgress = {
  formationId: '',
  userId: '',
  progress: 0, // 0-100
  completedLessons: [], // array of lesson IDs
  lastAccessed: '',
  notes: '', // optional
  startedAt: '',
  targetCompletionDate: '' // optional
};

// Formation Recommendation structure
export const FormationRecommendation = {
  formation: Formation, // Referencing the Formation object
  matchScore: 0, // 0-100
  reasons: [], // array of reasons
  skillGaps: [], // array of skill gaps
  businessImpact: [
    {
      area: '',
      potential: 'low', // low, medium, or high
      description: ''
    }
  ]
};
