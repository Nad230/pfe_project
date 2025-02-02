"use client";

import { useEffect, useState } from "react";
import { DashboardCharts } from "../../components/dashboard/charts";
import { RecentTransactions } from "../../components/dashboard/recent-transactions";
import { GoalsGrid } from "../../components/dashboard/goals/goals-grid";
import { ContributionTracker } from "../../components/dashboard/contribution-tracker";
import { InsightsSection } from "../../components/dashboard/ai-insights/insights-section";
import { AchievementsSection } from "../../components/dashboard/gamification/achievements-section";
import { LeaderboardSection } from "../../components/dashboard/gamification/leaderboard-section";
import { CustomizableWidgets } from "../../components/dashboard/widgets/customizable-widgets";
import { mockMonthlyStats, mockTransactions } from "../../lib/mock-data";

export default function Home() {
  const [currentMonthStats, setCurrentMonthStats] = useState({
    month: "",
    totalIncome: 0,
    totalExpenses: 0,
    netIncome: 0,
    goals: [],
    deductions: {
      taxes: 0,
      fees: 0,
      other: 0,
    },
    sources: {},
  });

  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    setCurrentMonthStats(mockMonthlyStats?.[0] ?? {
      month: new Date().toISOString().slice(0, 7),
      totalIncome: 0,
      totalExpenses: 0,
      netIncome: 0,
      goals: [],
      deductions: {
        taxes: 0,
        fees: 0,
        other: 0,
      },
      sources: {},
    });

    setRecentTransactions(mockTransactions.slice(0, 5));
  }, []);

  return (
    <div className="space-y-8">
      <CustomizableWidgets />
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="space-y-8">
          <GoalsGrid goals={currentMonthStats.goals} />
          <ContributionTracker />
          <DashboardCharts stats={mockMonthlyStats ?? []} />
          <RecentTransactions transactions={recentTransactions} />
        </div>
        <div className="space-y-8">
          <InsightsSection />
          <AchievementsSection />
          <LeaderboardSection />
        </div>
      </div>
    </div>
  );
}
