export type Task = {
  id: number;
  task: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_at: string;
};

export type TaskStatus = "not-started" | "in-progress" | "done";

export type TaskPriority = "high" | "medium" | "low";
