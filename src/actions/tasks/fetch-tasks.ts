import { prisma } from "@/app/layout";

export async function fetchTasks(email: string) {

    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (!user) {
        return [];
    }
    const tasks = await prisma.tasks.findMany({
        include: {
            tags: true,
            subTasks: true
        }, where: {
            userId: user.id
        }
    })
    return tasks;
}   