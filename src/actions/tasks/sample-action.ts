"use server"; // don't forget to add this!

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { taskSchema } from "@/interfaces/add-task-schema";

// This schema is used to validate input from client.
const schema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(2).max(100),
});

export const sampleAction = actionClient
  .schema(taskSchema)
  .action(async ({ parsedInput: Schema }) => {
    console.log(Schema);
  });