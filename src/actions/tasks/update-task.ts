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
  .bindArgsSchemas<
    [
      addedSubTasks: z.ZodArray<z.ZodString>,
      modifiedSubTasks: z.ZodArray<z.ZodNumber>
    ]
  >([z.array(z.string()), z.array(z.number())])
  .action(
    async ({
      parsedInput: { taskId, progress },
      bindArgsParsedInputs: [addedSubTasks, modifiedSubTasks],
    }) => {
      try {
        /**
         * * Update the progress depends on what the slider value on manage-task component
         */
        await prisma.tasks.update({
          where: {
            tasksId: taskId,
          },
          data: {
            progress: progress,
            updatedAt: new Date(),
          },
        });

        /**
         * * add new subTask if binded array is not null
         */
        if (addedSubTasks.length) {
          await prisma.subTasks.createMany({
            data: addedSubTasks.map((ctx) => ({
              taskId: taskId,
              subTaskTitle: ctx,
            })),
          });
        }

        /**
         * * alter the isCompleted value in db when state changes in the frontend
         */
        if (modifiedSubTasks.length) {
          const currentItem = await prisma.subTasks.findMany({
            where: {
              id: {
                in: [...modifiedSubTasks],
              },
            },
          });

          /**
           * * Loop the updates for each array
           */
          currentItem.forEach(async (value) => {
            await prisma.subTasks.update({
              where: {
                id: value.id,
              },
              data: {
                isCompleted: !value.isCompleted,
                updatedAt: new Date(),
              },
            });
          });
        }
      } catch (err) {
        return console.error({ message: "Error occured in server. " + err });
      }
      revalidatePath("/tasks");
      redirect("/tasks");
    }
  );
