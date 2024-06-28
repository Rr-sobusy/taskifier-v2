"use server";

import { actionClient } from "@/lib/safe-action";
import { taskSchema } from "@/interfaces/add-task-schema";
import {z} from 'zod'

const schema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(2).max(100),
  });




export const sampleAction = actionClient
  .schema(taskSchema)
  .action(async () => {
    console.log("rex randyyyyzzrex");
  });
