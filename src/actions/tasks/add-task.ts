
import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/app/layout";
import { auth } from "@/auth";

import { TaskSchema, taskSchema } from "@/interfaces/add-task-schema";

export const addNewTask = actionClient.schema(taskSchema).action(async ({ parsedInput : Shema}) => {


    console.log(Shema)

    // try {
    //     const user = await auth();

    //     if (!user || !user.user?.id) {
    //         throw new Error('Unauthorized: User authentication failed.');
    //     }

    //     //   const res =   await prisma.tasks.create({
    //     //         data: {
    //     //             completionDate: new Date(completionDate),
    //     //             iconBgColor: bgColor,
    //     //             taskDescription: taskDescription,
    //     //             taskTitle: taskTitle,
    //     //             icon: icon,
    //     //             userId: user.user?.id
    //     //         }
    //     //     })
    //         console.log(parsedInput)
       
    // }
    // catch (error) {
    //     console.log({ message: error })
    // }
})