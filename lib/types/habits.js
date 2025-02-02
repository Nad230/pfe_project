// Habit Type options
const HabitType = {
  GOOD: 'good',
  BAD: 'bad'
};

// Habit structure
export const Habit = {
  id: '',
  name: '',
  type: HabitType.GOOD, // Or HabitType.BAD
  description: '', // optional
  target: 0, // Weekly target for good habits, limit for bad habits
  createdAt: '',
  updatedAt: ''
};

// Habit Entry structure
export const HabitEntry = {
  id: '',
  habitId: '',
  date: '',
  isPositive: false,
  createdAt: ''
};

// Weekly Progress structure
export const WeeklyProgress = {
  habitId: '',
  positive: 0,
  negative: 0,
  total: 0,
  targetProgress: 0 // Percentage towards target/limit
};

// Habits Report structure
export const HabitsReport = {
  weeklyProgress: {}, // Object with habitId as keys, and WeeklyProgress as values
  goodHabitsAverage: 0,
  badHabitsAverage: 0,
  streaks: {} // Object with habitId as keys, and streak count as values
};
