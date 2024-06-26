import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/auth"


export const GET = auth(async function GET(req) {
    if (req.auth) {
        const tasks = await prisma.tasks.findMany({
            include: {
                subTasks: true,
                tags: true
            }
        })
        return NextResponse.json({ response: tasks }, { status: 200 });
    }
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})