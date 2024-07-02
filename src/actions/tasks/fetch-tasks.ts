import { prisma } from "@/app/layout";

export async function fetchTasks(userId: string) {

    //TODO - add paginagtion in queries
    
    const tasks = await prisma.tasks.findMany({
        include: {
            tags: true,
            subTasks: true
        }, where: {
            userId: userId
        }
    })
    return tasks;
    
}   