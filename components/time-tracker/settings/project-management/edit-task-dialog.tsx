"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog"
import { TaskForm } from "./task-form"

export function EditTaskDialog({ task, open, onOpenChange }) {
  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TaskForm
          defaultValues={task}
          onSubmit={(data) => {
            // TODO: Implement task update
            console.log("Updating task:", { ...data, id: task.id })
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
