import { auth } from "@/auth"
import { NextResponse, NextRequest } from "next/server";
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session = await auth();
    if (!session)
      return NextResponse.redirect(new URL('/auth/login', request.url));
    return NextResponse.next();
  }

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/*).*)"],
  }