"use server";

import { actionClient } from "../../lib/safe-action";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const toUpdate = z.object({
  taskId: z.number(),
  progress: z.number(),
});

export const updateTask = actionClient
  .schema(toUpdate)
  .action(async ({ parsedInput: { taskId, progress } }) => {
    try {
      const updatedTask = await prisma.tasks.update({
        data: {
          progress: progress,
        },
        where: {
          tasksId: taskId,
        },
      });
    } catch (err) {
      console.error(err);
    }
    revalidatePath("/tasks");
    redirect("/tasks")
  });
