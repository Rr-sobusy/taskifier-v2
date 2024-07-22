"use server";

import { actionClient } from "@/lib/safe-action";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const toRemove = z.object({
  taskId: z.number(),
});

export const removeTask = actionClient
  .schema(toRemove)
  .action(async ({ parsedInput: { taskId } }) => {
    try {
      await prisma.tasks.delete({
        where: {
          tasksId: taskId,
        },
      });
    } catch (error) {
      console.error(error);
    }

    revalidatePath("/tasks");
    redirect("/tasks");
  });
