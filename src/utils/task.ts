import type { Task, TaskPayload } from "../types/task";
import { taskPayloadSchema } from "../types/task";
import { TaskError } from "../types/errors";

/**
 * タスク追加関数
 * @param tasks
 * @param data
 * @returns
 */
export const addTask = (tasks: Task[], data: TaskPayload): Task[] => {
  // validation
  const parsed = taskPayloadSchema.safeParse(data);
  if (!parsed.success) {
    throw new TaskError(`Validation error. ${parsed.error.message}`, 400);
  }

  // id generation
  let nextId = 1;
  if (tasks.length > 0) {
    nextId = tasks[tasks.length - 1].id + 1;
  }

  return [
    ...tasks,
    {
      id: nextId,
      ...data,
    },
  ];
};

/**
 * タスク更新関数
 * @param tasks
 * @param id
 * @param data
 * @returns
 */
export const updateTask = (
  tasks: Task[],
  id: number,
  data: TaskPayload
): Task[] => {
  // validation
  const parsed = taskPayloadSchema.safeParse(data);
  if (!parsed.success) {
    throw new TaskError(`Validation error. ${parsed.error.message}`, 400);
  }

  return tasks.map((task) => {
    if (task.id === id) {
      return {
        id,
        ...data,
      };
    }
    return task;
  });
};

/**
 * タスク削除関数
 * @param tasks
 * @param id
 * @returns
 */
export const deleteTask = (tasks: Task[], id: number): Task[] => {
  if (isNaN(Number(id))) {
    throw new TaskError("Invalid Id.", 400);
  }

  if (!tasks.find((task) => task.id === id)) {
    throw new TaskError(`ID ${id} not found.`, 404);
  }

  return tasks.filter((task) => task.id !== id);
};
