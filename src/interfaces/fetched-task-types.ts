import { Prisma } from "@prisma/client";
import { fetchTasks, selectSingleTask } from "@/actions/tasks/fetch-tasks";

export type BulkTasksProps = Prisma.PromiseReturnType<typeof fetchTasks>
export type TaskProps = Prisma.PromiseReturnType<typeof selectSingleTask>
