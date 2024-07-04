"use server";

import { actionClient } from "@/lib/safe-action";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { taskSchema } from "@/interfaces/add-task-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export const addNewTask = actionClient
  .schema(taskSchema)
  .bindArgsSchemas<[userId: z.ZodString, subTasks: z.ZodArray<z.ZodString>]>([z.string(), z.array(z.string())])
  .action(async ({ parsedInput: Schema, bindArgsParsedInputs: [userId, subTasks] }) => {
    try {
      const res = await prisma.tasks.create({
        data: {
          taskTitle: Schema.taskTitle,
          taskDescription: Schema.taskDescription,
          icon: Schema.icon,
          completionDate: new Date(Schema.completionDate),
          progress: 0,
          userId: userId,
          tags: {
            create: Schema.tags.map((tag) => ({ taskTitle: tag }))
          },
          subTasks: {
            create: subTasks.map((task) => ({ subTaskTitle: task }))
          }
        },
      });

    } catch (error) {
      console.log(error);
    }
    revalidatePath("/tasks")
    redirect("/tasks")
  });
