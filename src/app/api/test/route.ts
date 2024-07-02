// import { auth, signIn } from "@/auth"
// import { NextResponse } from "next/server"
// import prisma from "@/lib/prisma";


// export const GET = auth(async function GET(req) {
//     if (req.auth) {
    
//         return NextResponse.json({ response: req.auth }, { status: 200 });
//     }
//     return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
// })


// export async function POST(){

// }
import prisma from "@/lib/prisma";
export async function GET() {
         const res =   await prisma.$connect();
         return Response.json(res)
  }