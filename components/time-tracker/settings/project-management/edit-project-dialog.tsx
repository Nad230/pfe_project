"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog"
import { ProjectForm } from "./project-form"

export function EditProjectDialog({ project, open, onOpenChange, onSubmit }) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <ProjectForm
          defaultValues={project}
          onSubmit={(data) => {
            onSubmit(data)
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
