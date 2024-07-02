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
    icCompleted?: boolean,
    subTasks?: SubTasks,
    tags: {
        id: number
        taskTitle: string,
        taskId:number
    }[]
    iconBgColor : string
    icon: LucideIcon | string
}