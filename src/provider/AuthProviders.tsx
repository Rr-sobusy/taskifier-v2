import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from 'react'
import DashboardLayout from "@/components/layout/dashboard/layout";

type Props = {
    children: React.ReactNode
}

const AuthProvider = async ({ children }: Props) => {
    const user = await auth();
    if (!user) {
        redirect("/auth/login")
    }
    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider