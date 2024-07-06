import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from 'react';

type Props = {
    children: ReactNode;
}

const AuthProvider = async ({ children }: Props) => {
    try {
        const user = await auth();
        if (!user) {
            redirect("/auth/login");
            return null; // Prevent rendering children while redirecting
        }
    } catch (error) {
        console.error("Failed to authenticate user", error);
        redirect("/welcome");
        return null; // Prevent rendering children while redirecting
    }
    
    return (
        <>
            {children}
        </>
    );
}

export default AuthProvider;