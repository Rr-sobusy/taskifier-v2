import { Prisma } from "@prisma/client";
import { fetchTasks } from "@/actions/tasks/fetch-tasks";

export type SampleType = Prisma.PromiseReturnType<typeof fetchTasks>