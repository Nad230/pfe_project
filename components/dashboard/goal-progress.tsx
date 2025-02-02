import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { formatCurrency } from "../../lib/utils"
import { ArrowDown, ArrowUp, Target } from "lucide-react"

// Define MonthlyStats as a function
export function MonthlyStats(month, totalIncome, totalExpenses, netIncome, goals, deductions, businessStats, sources, monthlyGoal) {
  this.month = month;
  this.totalIncome = totalIncome;
  this.totalExpenses = totalExpenses;
  this.netIncome = netIncome;
  this.goals = goals;
  this.deductions = deductions;
  this.businessStats = businessStats;
  this.sources = sources;
  this.monthlyGoal = monthlyGoal; // Initialize it
}

export function GoalProgress({ stats }) {
  const progress = (stats.netIncome / stats.monthlyGoal) * 100
  const isAhead = stats.netIncome > stats.monthlyGoal
  const difference = Math.abs(stats.netIncome - stats.monthlyGoal)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Monthly Goal Progress</CardTitle>
        <Target className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Current: {formatCurrency(stats.netIncome)}</span>
          <span>Goal: {formatCurrency(stats.monthlyGoal)}</span>
        </div>
        <Progress value={Math.min(progress, 100)} className="h-2" />
        <div className="flex items-center gap-2">
          {isAhead ? (
            <>
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">
                {formatCurrency(difference)} above target
              </span>
            </>
          ) : (
            <>
              <ArrowDown className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-500">
                {formatCurrency(difference)} below target
              </span>
            </>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {progress.toFixed(0)}% of monthly goal reached
        </div>
      </CardContent>
    </Card>
  )
}
