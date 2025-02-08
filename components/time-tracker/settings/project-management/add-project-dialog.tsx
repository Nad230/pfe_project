"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TaskForm } from "./task-form"
import Cookies from "js-cookie"

interface AddTaskDialogProps {
  projectId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onTaskCreated: (task: any) => void // Callback to update the UI after task creation
}

export function AddTaskDialog({ projectId, open, onOpenChange, onTaskCreated }: AddTaskDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true)
      setError(null)

      const token = Cookies.get("token")
      if (!token) throw new Error("No authentication token found.")

      const response = await fetch("http://localhost:3000/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ ...data, projectId }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to create task: ${errorText}`)
      }

      const result = await response.json()
      onTaskCreated(result) // Update parent component
      onOpenChange(false) // Close the dialog

    } catch (error: any) {
      setError(error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <TaskForm onSubmit={handleSubmit} loading={loading} error={error} />
      </DialogContent>
    </Dialog>
  )
}
