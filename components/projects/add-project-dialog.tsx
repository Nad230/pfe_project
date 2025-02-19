
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import  ProjectForm  from "./project-form";
import Cookies from "js-cookie";

interface AddProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refreshProjects: () => void; // Fetch updated projects from the parent
}

export function AddProjectDialog({ open, onOpenChange, refreshProjects }: AddProjectDialogProps) {
  const handleSubmit = async (data: any) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No authentication token found.");
  
      const projectResponse = await fetch("http://localhost:3000/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          type: data.type,
          visibility: data.visibility,
          status: data.status,
          vision: data.vision,
          impact: data.impact,
          revenueModel: data.revenueModel,
          BudgetRange: data.budgetRange, // Adjusted field name to match DTO
          TimeLine: data.timeline,
          fundingSource: data.fundingSource,
          teamId: data.teamId,
          teamMembers: data.teamMembers,
          location: data.location,
          media: data.media,
          collaborations: data.collaborations,
          projectMilestones: data.projectMilestones,
          aiInsights: data.aiInsights,
          planType: data.planType,
          tags:data.tags,
          aiUnlocked: data.aiUnlocked,
        }),
      });
  
      if (!projectResponse.ok) {
        const errorText = await projectResponse.text();
        throw new Error(`Failed to add project: ${errorText}`);
      }
  
      const projectData = await projectResponse.json();
      const projectId = projectData.id;
  
      // Then create team if members are selected
      if (data.teamMembers && data.teamMembers.length > 0) {
        await fetch("http://localhost:3000/team/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: data.teamName,
            description: data.teamDescription,
            projectId: projectId,
            TeamMembers: data.teamMembers
          }),
        });
      }
  
      onOpenChange(false);
      refreshProjects();
    } catch (error: any) {
      console.error("Error adding project:", error.message || "Something went wrong");
    }
  };
  
  const fetchAiResponse = async (userInput: string) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No authentication token found.");
  
      const response = await fetch("http://localhost:3000/ai/assist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ prompt: userInput }), // Assuming your AI expects a "prompt"
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AI request failed: ${errorText}`);
      }
  
      const data = await response.json();
      return data; // AI response
    } catch (error: any) {
      console.error("Error fetching AI response:", error.message || "Something went wrong");
      return null;
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <ProjectForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}