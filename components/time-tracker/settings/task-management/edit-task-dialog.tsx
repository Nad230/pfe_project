"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog"
import { TaskForm } from "./task-form"

export function EditTaskDialog({
  task,
  open,
  onOpenChange,
  onSubmit,
}) {
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
            onSubmit({
              ...data,
              updatedAt: new Date().toISOString(),
            })
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
