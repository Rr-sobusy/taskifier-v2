import React from 'react'
import AuthProvider from '@/provider/AuthProviders'
import DashboardLayout from '@/components/layout/dashboard/layout'
import { FlexBox } from '@/components/common/flex-box'
import CreateTask from '@/sections/tasks/create-task'


type Props = {}

const page = (props: Props) => {
    const formAction = async (e: FormData) => {
        "use server"
        const name = e.get("taskTitle")
        console.log(name)
    }

    return (
        <AuthProvider>
            <DashboardLayout>
                <FlexBox className="gap-5">
                    <h1 className="scroll-m-20 text-foreground/90 font-extrabold tracking-tight text-2xl lg:text-2xl">
                        Create new task
                    </h1>
                </FlexBox>
                <CreateTask formAction={formAction} />
            </DashboardLayout>
        </AuthProvider>
    )
}

export default page