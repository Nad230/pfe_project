"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddHabitDialog } from "./add-habit-dialog"
import { useState } from "react"

export function HabitsHeader() {
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Habits Tracker</h1>
      <Button onClick={() => setShowAddDialog(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Habit
      </Button>
      <AddHabitDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}