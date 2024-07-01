
import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/app/layout";
import { auth } from "@/auth";

import { TaskSchema, taskSchema } from "@/interfaces/add-task-schema";

export const addNewTask = actionClient.schema(taskSchema).action(async ({ parsedInput: Schema }) => {

    try {
        const user = await auth();

        if (!user || !user.user?.id) {
            throw new Error('Unauthorized: User authentication failed.');
        }

      const res =   await prisma.tasks.create({
            data: {
                completionDate: new Date(Schema.completionDate),
                iconBgColor: Schema.bgColor,
                taskDescription: Schema.taskDescription,
                taskTitle: Schema.taskTitle,
                icon: Schema.icon,
                userId: user.user?.id
            }
        })
        console.log(res)
    }
    catch (error) {
        console.log({ message: error })
    }
})