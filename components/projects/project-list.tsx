"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Project } from "@/lib/types/time-tracker"
import { ProjectActions } from "./project-actions"
import { EditProjectDialog } from "./edit-project-dialog"
import { DeleteProjectDialog } from "./delete-project-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Archive, BarChart, CheckCircle2, Clock, Folder, LineChart, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { mockTasks } from "@/lib/mock-data/time-tracker"
import Cookies from "js-cookie";



// Add this interface for stats
interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  monthlyGrowth: number;
  InProgressProjects: number;
  archivedProjects: number;

  
}

interface ProjectListProps {
  key?: number; // Trigger refresh when key changes

}

export function ProjectList({ key }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [stats, setStats] = useState<ProjectStats | null>(null);



  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:3000/projects", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchStats();
    fetchMonthly();


  }, [key]); // Fetch projects when key changes

  
  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:3000/projects/stats", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };
  const fetchMonthly = async () => {
    try {
      const response = await fetch("http://localhost:3000/projects/monthly", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };






  

  return (
    <div className="space-y-8">
      {/* Project Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <h3 className="text-2xl font-bold">{stats?.totalProjects || 0}</h3>
              </div>
              <Folder className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <h3 className="text-2xl font-bold">{stats?.activeProjects || 0}</h3>
              </div>
              <Clock className="h-8 w-8 text-blue-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-bold">{stats?.completedProjects || 0}</h3>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Growth</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{stats?.monthlyGrowth ? `${stats.monthlyGrowth.toFixed(0)}%` : "0%"}
                  </h3>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <LineChart className="h-8 w-8 text-purple-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">In Progress</span>
                  <span className="font-medium">{stats?.InProgressProjects || 0}</span>
                </div>
                <Progress value={stats?.activeProjects ? 
                    (stats.InProgressProjects / stats.activeProjects) * 100 : 0
                  }  className="bg-blue-100 dark:bg-blue-900">
                  <div className="bg-blue-500" style={{ width: stats?.InProgressProjects && stats?.activeProjects > 0 ? `${(stats.InProgressProjects / stats.activeProjects) * 100}%`:'0%' }} />
                </Progress>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium">{stats?.completedProjects || 0}</span>
                </div>
                <Progress value={stats?.totalProjects ? 
                    (stats.completedProjects / stats.totalProjects) * 100 : 0
                  }  className="bg-green-100 dark:bg-green-900">
                  <div className="bg-green-500" style={{ width:stats?.completedProjects && stats?.totalProjects > 0  ? `${(stats.completedProjects / stats.totalProjects) * 100}%` :'0%' }} />
                </Progress>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Archived</span>
                  <span className="font-medium">{stats?.archivedProjects || 0}</span>
                </div>
                <Progress 
                  value={stats?.totalProjects ? 
                    (stats.archivedProjects / stats.totalProjects) * 100 : 0
                  }  
                  className="bg-gray-100 dark:bg-gray-900"
                >
                  <div 
                    className="bg-gray-500" 
                    style={{ 
                      width: stats?.totalProjects && stats.totalProjects > 0
                        ? `${(stats.archivedProjects / stats.totalProjects) * 100}%`
                        : '0%'
                    }} 
                  />
                </Progress>
              </div>
            </div>

            {/* Project List */}
            <div className="grid gap-4 md:grid-cols-3">
            {Array.isArray(projects) && projects.map((project) => {
    const projectTasks = mockTasks.filter(t => t.projectId === project.id)
    const completedTasks = projectTasks.filter(t => t.status === 'completed').length
    const progress = projectTasks.length > 0 
      ? (completedTasks / projectTasks.length) * 100 
      : 0


                return (
                  <Link 
                    key={project.id} 
                    href={`/time-tracker/projects/${project.id}`}
                    className="block"
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ 
                              backgroundColor: `${project.color}15`,
                              color: project.color 
                            }}
                          >
                            <BarChart className="h-5 w-5" />
                          </div>
                          
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{project.name}</h3>
                            <Badge 
                              variant={project.isArchived ? "secondary" : "default"}
                              className="gap-1"
                            >
                              {project.isArchived ? (
                                <>
                                  <Archive className="h-3 w-3" />
                                  Archived
                                </>
                              ) : (
                                <>
                                  <Clock className="h-3 w-3" />
                                  Active
                                </>
                              )}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span>{progress.toFixed(0)}%</span>
                            </div>
                            <Progress value={progress} className="h-2">
                              <div 
                                className="h-full transition-all duration-300"
                                style={{ 
                                  width: `${progress}%`,
                                  backgroundColor: project.color
                                }}
                              />
                            </Progress>
                          </div>

                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{projectTasks.length} tasks</span>
                            <span>{completedTasks} completed</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <EditProjectDialog
        project={selectedProject}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={(data) => {
          if (selectedProject) {
           
          }
        }}
      />

      <DeleteProjectDialog
        project={selectedProject}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={(project) => {
          
          setShowDeleteDialog(false)
        }}
      />
    </div>
  )
}




