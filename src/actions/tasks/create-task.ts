"use server";

import { actionClient } from "@/lib/safe-action";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { taskSchema } from "@/interfaces/add-task-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createNewTask = actionClient
  .schema(taskSchema)
  .bindArgsSchemas<
    [
      userId: z.ZodString,
      userEmail: z.ZodString,
      subTasks: z.ZodArray<z.ZodString>
    ]
  >([z.string(), z.string(), z.array(z.string())])
  .action(
    async ({
      parsedInput: taskData,
      bindArgsParsedInputs: [userId, userEmail, subTasks],
    }) => {
      try {
        await prisma.tasks.create({
          data: {
            taskTitle: taskData.taskTitle,
            taskDescription: taskData.taskDescription,
            icon: taskData.icon,
            completionDate: new Date(taskData.completionDate),
            progress: 0,
            userId: userId,
            userEmail: userEmail,
            tags: {
              create: taskData.tags.map((tag) => ({ taskTitle: tag })),
            },
            subTasks: {
              create: subTasks.map((task) => ({ subTaskTitle: task })),
            },
          },
        });
      } catch (error) {
        console.error({ message: "Error occured in server. " + error });
      }
      revalidatePath("/tasks");
      redirect("/tasks");
    }
  );
