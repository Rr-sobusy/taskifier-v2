import { z } from "zod";

export const taskSchema = z.object({
  taskTitle: z.string({ message: "Task title must not be empty." }),
  taskDescription: z.string({message : "Task description must not be empty."})
});
