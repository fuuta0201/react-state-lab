import { describe, expect, it } from "vitest";
import type { Task, TaskPayload } from "../types/task";
import { addTask, deleteTask, updateTask } from "./task";
import { TaskError } from "../types/errors";

const tasks: Task[] = [
  {
    id: 1,
    task: "タスク管理アプリのデータモデルを作成する",
    description:
      "Task、TaskStatus、TaskPriority の型と Zod schema を定義する。",
    status: "done",
    priority: "high",
    due_at: "2026-05-26T09:00:00.000Z",
  },
  {
    id: 2,
    task: "タスク追加ロジックを実装する",
    description:
      "taskMutations.ts に addTask 関数を作成し、バリデーションも行う。",
    status: "in-progress",
    priority: "high",
    due_at: "2026-05-30T09:00:00.000Z",
  },
  {
    id: 3,
    task: "TaskForm コンポーネントを作成する",
    description:
      "タイトル、説明、ステータス、優先度、期限を入力できるフォームを作る。",
    status: "not-started",
    priority: "medium",
    due_at: "2026-05-30T09:00:00.000Z",
  },
  {
    id: 4,
    task: "Storybook を追加する",
    description:
      "主要コンポーネントの Story を作成して、表示確認できるようにする。",
    status: "not-started",
    priority: "low",
    due_at: "2026-06-02T09:00:00.000Z",
  },
];

describe("タスク追加・更新・削除関数のテスト", () => {
  describe("addTask", () => {
    it("正常にタスクを追加できる", () => {
      const payload: TaskPayload = {
        task: "new task",
        description: "new description",
        status: "not-started",
        priority: "low",
        due_at: "2026-06-02T09:00:00.000Z",
      };

      const result = addTask(tasks, payload);
      const addedTask = result[result.length - 1];
      expect(result).toHaveLength(tasks.length + 1);
      expect(addedTask.id).toBe(tasks[tasks.length - 1].id + 1);
      expect(addedTask.task).toBe("new task");
      expect(addedTask.status).toBe("not-started");
    });

    it("バリデーションエラー", () => {
      const invalidPayload = {
        task: "new task",
        description: "new description",
        status: "valid",
        priority: "low",
        due_at: "2026-06-02T09:00:00.000Z",
      } as unknown as TaskPayload;

      expect(() => addTask(tasks, invalidPayload)).toThrow(TaskError);
    });
  });

  describe("updateTask", () => {
    it("正常にタスクを編集できる", () => {
      const payload: TaskPayload = {
        task: "updated",
        description:
          "主要コンポーネントの Story を作成して、表示確認できるようにする。",
        status: "not-started",
        priority: "low",
        due_at: "2026-06-02T09:00:00.000Z",
      };

      const result = updateTask(tasks, 4, payload);
      const updated = result.find((t) => t.id === 4);

      expect(updated?.task).toBe("updated");
    });

    it("バリデーションエラー", () => {
      const invalidPayload = {
        description: "new description",
        status: "valid",
        priority: "low",
        due_at: "2026-06-02T09:00:00.000Z",
      } as unknown as TaskPayload;

      expect(() => updateTask(tasks, 4, invalidPayload)).toThrow(TaskError);
    });
  });

  describe("deleteTask", () => {
    it("正常にタスクを削除できる", () => {
      const result = deleteTask(tasks, 4);

      expect(result).toHaveLength(3);
    });

    it("存在しないidはNotFoundエラーを投げる", () => {
      try {
        deleteTask(tasks, 999);

        throw new Error("エラーが発生しませんでした");
      } catch (error) {
        expect(error).toBeInstanceOf(TaskError);

        if (error instanceof TaskError) {
          expect(error.status).toBe(404);
        }
      }
    });
  });
});
