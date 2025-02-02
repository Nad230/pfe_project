const TaskStatus = {
  NOT_STARTED: "not_started",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  PAUSED: "paused"
};

const Project = {
  id: "",
  name: "",
  description: "",
  color: "",
  isArchived: false,
  createdAt: "",
  updatedAt: ""
};

const Task = {
  id: "",
  projectId: "",
  name: "",
  description: "",
  status: TaskStatus.NOT_STARTED,
  estimatedHours: 0,
  createdAt: "",
  updatedAt: ""
};

const TimeEntry = {
  id: "",
  taskId: "",
  projectId: "",
  startTime: "",
  endTime: "",
  duration: 0, // in seconds
  notes: "",
  createdAt: "",
  updatedAt: ""
};

const TimeReport = {
  totalDuration: 0,
  projectBreakdown: {},
  dailyBreakdown: {},
  entries: []
};

export { TaskStatus, Project, Task, TimeEntry, TimeReport };
