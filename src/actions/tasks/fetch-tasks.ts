
import prisma from "@/lib/prisma";

export async function fetchTasks(userEmail: string) {
  //TODO - add paginagtion in queries
  const tasks = await prisma.tasks.findMany({
    include: {
      tags: true,
      subTasks: true,
    },
    where: {
      userEmail: userEmail,
    },
    orderBy : {
      tasksId : "desc"
    }
  });
  return tasks;
}

export async function selectSingleTask(taskId: number) {
  const task = await prisma.tasks.findFirstOrThrow({
    where: {
      tasksId: taskId,
    },
    include: {
      subTasks: true,
      tags: true,
    },
  });

  return task
}


