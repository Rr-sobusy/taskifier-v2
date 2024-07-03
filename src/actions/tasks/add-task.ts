"use server";

import { actionClient } from "@/lib/safe-action";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { taskSchema } from "@/interfaces/add-task-schema";
import { revalidatePath } from "next/cache";



export const addNewTask = actionClient
  .schema(taskSchema)
  .bindArgsSchemas<[userId: z.ZodString]>([z.string()])
  .action(async ({ parsedInput: Schema, bindArgsParsedInputs: [userId] }) => {
    try {
      const res = await prisma.tasks.create({
        data: {
          taskTitle: Schema.taskTitle,
          taskDescription: Schema.taskDescription,
          isCompleted: false,
          icon: Schema.icon,
          completionDate: new Date(Schema.completionDate),
          iconBgColor: Schema.bgColor,
          userId: userId,
          tags: {
            create: Schema.tags.map((tag) => ({ taskTitle: tag }))
          }
        },
      });
    } catch (error) {
      throw new Error();
    }
    revalidatePath("/tasks")
  });
