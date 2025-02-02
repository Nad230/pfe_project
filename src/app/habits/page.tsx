"use client"

import { HabitsHeader } from "../../../components/habits/habits-header"
import { HabitsProgress } from "../../../components/habits/habits-progress"
import { HabitsList } from "../../../components/habits/habits-list"
import { mockHabits, mockHabitsReport } from "../../../lib/mock-data/habits"

export default function HabitsPage() {
  return (
    <div className="space-y-8">
      <HabitsHeader />
      <HabitsProgress report={mockHabitsReport} />
      <HabitsList habits={mockHabits} report={mockHabitsReport} />
    </div>
  )
}