export const TransactionType = ['income', 'expense']
export const TransactionStatus = ['pending', 'completed', 'failed']
export const GoalType = ['netIncome', 'revenue', 'expenses', 'savings']

export function BusinessStats(income, expenses, netIncome) {
  this.income = income
  this.expenses = expenses
  this.netIncome = netIncome
}

export function Goal(id, type, target, current, period, priority, description) {
  this.id = id
  this.type = type
  this.target = target
  this.current = current
  this.period = period
  this.priority = priority
  this.description = description
}

export function MonthlyStats(month, totalIncome, totalExpenses, netIncome, goals, deductions, businessStats, sources) {
  this.month = month
  this.totalIncome = totalIncome
  this.totalExpenses = totalExpenses
  this.netIncome = netIncome
  this.goals = goals
  this.deductions = deductions
  this.businessStats = businessStats
  this.sources = sources
}

export function Transaction(id, date, description, amount, type, category, source, status, business, deductions = {}) {
  this.id = id
  this.date = date
  this.description = description
  this.amount = amount
  this.type = type
  this.category = category
  this.source = source
  this.status = status
  this.business = business
  this.deductions = deductions
}

export function TransactionFilters(type, category, source, status, business, dateRange) {
  this.type = type
  this.category = category
  this.source = source
  this.status = status
  this.business = business
  this.dateRange = dateRange
}
