"use server"

import { signIn } from "@/auth";


export async function authSignIn(){
        await signIn("google", {
            redirectTo : "/dashboard"
        })
}