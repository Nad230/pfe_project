"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog"
import { TaskForm } from "./task-form"

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function AddTaskDialog({ open, onOpenChange, onSubmit }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <TaskForm
          defaultValues={{}}  // You can replace this with any default values you want to pass
          onSubmit={(data) => {
            onSubmit({
              ...data,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}