import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, StopCircle, Plus } from "lucide-react"
import { formatDuration } from "@/lib/utils/time"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Cookies from "js-cookie"

export function TimeTrackerTimer() {
  const [isRunning, setIsRunning] = useState(false)
  const [duration, setDuration] = useState(0)
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [selectedTask, setSelectedTask] = useState<string>("")
  const [description, setDescription] = useState("")
  const [taskSearch, setTaskSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [timeEntryId, setTimeEntryId] = useState<string | null>(null) // Stores created time entry ID
  

  interface Project {
    id: string;
    name: string;
  }

  const [projects, setProjects] = useState<Project[]>([])

  interface Task {
    id: string;
    projectId: string;
    title: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/projects", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }

        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    if (selectedProject) {
      const fetchTasks = async () => {
        try {
          const response = await fetch(`http://localhost:3000/tasks/project/${selectedProject}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            credentials: "include",
          })

          if (!response.ok) {
            throw new Error("Failed to fetch tasks")
          }

          const data = await response.json()
          setTasks(data)
        } catch (error) {
          console.error("Error fetching tasks:", error)
          setTasks([])
        }
      }

      fetchTasks()
    } else {
      setTasks([])
    }
  }, [selectedProject])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning])

  const handleStart = async () => {
    if (!selectedProject || !selectedTask) return

    try {
      const response = await fetch("http://localhost:3000/time-entry/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({
          projectId: selectedProject,
          taskId: selectedTask,
          description: description.trim() || "No description",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create time entry")
      }

      const data = await response.json()
      setTimeEntryId(data.id) // Store created time entry ID
      setIsRunning(true)
      console.log("Time entry started:", data)
    } catch (error) {
      console.error("Error starting time entry:", error)
    }
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleStop = async () => {
    if (!timeEntryId) return;
  
    try {
      const response = await fetch(`http://localhost:3000/time-entry/${timeEntryId}/stop`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to stop time entry");
      }
  
      setIsRunning(false);
      setDuration(0);
      setDescription("");
      setTimeEntryId(null);
    } catch (error) {
      console.error("Error stopping time entry:", error);
    }
  };

  useEffect(() => {
    setSelectedTask("")
    setTaskSearch("")
  }, [selectedProject])

  const filteredTasks = taskSearch
    ? tasks.filter((task) => task.title.toLowerCase().includes(taskSearch.toLowerCase()))
    : tasks.slice(0, 3)

  const handleCreateTask = () => {
    if (!selectedProject || !taskSearch.trim()) return

    const newTask = {
      id: crypto.randomUUID(),
      projectId: selectedProject,
      title: taskSearch,
      status: "not_started",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, newTask])
    setSelectedTask(newTask.id)
    setOpen(false)
    setTaskSearch("")
  }

  const selectedTaskName = selectedTask 
    ? tasks.find((t) => t.id === selectedTask)?.title 
    : "Select task..."

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-[2fr,2fr,3fr,auto]">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger>
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} disabled={!selectedProject} className="justify-between">
                {selectedTaskName}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
              <Command>
                <CommandInput placeholder="Search or create task..." value={taskSearch} onValueChange={setTaskSearch} />
                
                {filteredTasks.length === 0 && taskSearch && (
                  <CommandEmpty className="py-2">
                    <Button variant="ghost" className="w-full justify-start" onClick={handleCreateTask}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create "{taskSearch}"
                    </Button>
                  </CommandEmpty>
                )}

                <CommandGroup>
                  <CommandList>
                    {filteredTasks.map((task) => (
                      <CommandItem key={task.id} value={String(task.id)} onSelect={() => {
                        setSelectedTask(task.id);
                        setOpen(false);
                      }}>
                        {task.title}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Input placeholder="What are you working on?" value={description} onChange={(e) => setDescription(e.target.value)} />

          <div className="flex items-center gap-2">
            <div className="w-24 text-xl font-mono">{formatDuration(duration)}</div>

            {!isRunning ? (
              <Button onClick={handleStart} disabled={!selectedProject || !selectedTask} size="icon">
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button onClick={handlePause} size="icon" variant="outline">
                  <Pause className="h-4 w-4" />
                </Button>
                <Button onClick={handleStop} size="icon" variant="destructive">
                  <StopCircle className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
