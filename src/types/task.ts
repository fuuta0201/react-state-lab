import { z } from "zod";

const taskStatusSchema = z.enum(["not-started", "in-progress", "done"]);

const taskPrioritySchema = z.enum(["high", "medium", "low"]);

export const taskPayloadSchema = z.object({
  task: z.string(),
  description: z.string(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  due_at: z.string(),
});

export const taskSchema = taskPayloadSchema.extend({ id: z.number() });

export type TaskPayload = z.infer<typeof taskPayloadSchema>;
export type Task = z.infer<typeof taskSchema>;
