import { type LucideIcon } from "lucide-react"

type Tags = "development" | "planning" | "testing" | "production" | "out-sourcing"

type SubTasks = {
    subTasksTitle: string,
    isCompleted: boolean,
    createdAt: Date,
    completionDate: Date
}

export type TaskCardType = {
    taskTitle: string,
    taskDescription: string,
    createdAt: Date,
    completionDate: Date,
    progress: number,
    subTasks?: SubTasks,
    tags: {
        id: number
        subTaskTitle: string,
        taskId:number,
        createdAt:Date,
        updatedAt?:Date | null,
        isCompleted?: boolean
    }[]
    icon: LucideIcon | string
}