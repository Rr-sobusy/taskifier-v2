"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
});

export const greetUser = actionClient
  .schema(schema)
  .action(async ({ parsedInput : { name}}) => {
    console.log(name)
  });