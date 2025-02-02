// Revenue Scenario structure
export const RevenueScenario = {
  id: '',
  name: '',
  changes: {
    rates: 0, // optional, percentage change
    expenses: 0, // optional, percentage change
    clients: 0, // optional, percentage change
    hours: 0 // optional, percentage change
  },
  impact: {
    revenue: 0,
    expenses: 0,
    netIncome: 0,
    timeRequired: 0
  },
  createdAt: ''
};

// Simulation Result structure
export const SimulationResult = {
  currentState: {
    monthlyRevenue: 0,
    monthlyExpenses: 0,
    netIncome: 0,
    workHours: 0
  },
  projectedState: {
    monthlyRevenue: 0,
    monthlyExpenses: 0,
    netIncome: 0,
    workHours: 0
  },
  percentageChange: {
    revenue: 0,
    expenses: 0,
    netIncome: 0,
    workHours: 0
  }
};
