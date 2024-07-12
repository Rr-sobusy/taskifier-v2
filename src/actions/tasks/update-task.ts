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
        // await prisma.$transaction([
        //   prisma.tasks.update({
        //     where: {
        //       tasksId: taskId,
        //     },
        //     data: {
        //       progress: progress,
        //     },
        //   }),
        //   prisma.subTasks.createMany({
        //     data: addedSubTasks.map((ctx)=> ({taskId: taskId, subTaskTitle: ctx}))
        //   }),
        // ]);
        /**
         * * Update the progress depends on what the slider value on manage-task component
         */
        await prisma.tasks.update({
          where: {
            tasksId: taskId,
          },
          data: {
            progress: progress,
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
         * * modify the isCompleted to true if modifiedSubTasks array is not null
         */
        if (modifiedSubTasks.length) {
          await prisma.subTasks.updateMany({
            where: {
              id: {
                in: [...modifiedSubTasks],
              },
            },
            data: {
              isCompleted: true,
            },
          });
        }
      } catch (err) {
        console.error(err);
      }
      revalidatePath("/tasks");
      redirect("/tasks");
    }
  );
