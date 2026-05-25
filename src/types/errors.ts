export class TaskError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);

    this.name = "TaskError";

    this.status = status;
  }
}
