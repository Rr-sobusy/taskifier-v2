"use server";

import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/app/layout";
import { auth } from "@/auth";
import { z } from "zod";
import { TaskSchema, taskSchema } from "@/interfaces/add-task-schema";
import { revalidatePath } from "next/cache";

export const addNewTask = actionClient
  .schema(taskSchema)
  .bindArgsSchemas<[userId: z.ZodString]>([z.string()])
  .action(async ({ parsedInput: Schema, bindArgsParsedInputs: [userId] }) => {
    try {

    //     const user = await prisma.user.findFirst({
    //         where: {
    //             email: userId
    //         }
    //     })

    //     if (!user) {
    //         return [];
    //     }

    //   const res = await prisma.tasks.create({
    //     data: {
    //       taskTitle: Schema.taskTitle,
    //       taskDescription: Schema.taskDescription,
    //       icon: Schema.icon,
    //       completionDate: new Date(Schema.completionDate),
    //       iconBgColor: Schema.bgColor,
    //       userId: user.id,
    //     },
    //   });
      console.log(userId)
    } catch (error) {
      console.log({ message: error });
    }

  });
