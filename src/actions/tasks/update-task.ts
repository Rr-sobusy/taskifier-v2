"use server";

import { actionClient } from "../../lib/safe-action";
import { z } from "zod";


const toUpdate = z.object({
    taskId: z.number(),
    progress: z.number()
})


export const updateTask = actionClient.schema(toUpdate).action(async ({parsedInput: {taskId, progress}}) => {

});
