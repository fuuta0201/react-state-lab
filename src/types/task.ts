import { z } from "zod";

const taskStatusSchema = z.enum(["not-started", "in-progress", "done"]);

const taskPrioritySchema = z.enum(["high", "medium", "low"]);

export const taskSchema = z.object({
  id: z.number(),
  task: z.string(),
  description: z.string(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  due_at: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
