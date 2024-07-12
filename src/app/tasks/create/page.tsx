import React from 'react'
import AuthProvider from '@/provider/AuthProviders'
import DashboardLayout from '@/components/layout/dashboard/layout'
import { FlexBox } from '@/components/common/flex-box'
import CreateTask from '@/sections/tasks/create-task'

import { auth } from '@/auth'


type Props = {}

const page = async (props: Props) => {
    const user = await auth();

    return (
        <AuthProvider>
            <DashboardLayout>
                <FlexBox className="gap-5">
                    <h1 className="scroll-m-20 text-foreground/90 font-extrabold tracking-tight text-2xl lg:text-2xl">
                        Create new task
                    </h1>
                </FlexBox>
                <CreateTask userEmail={user?.user?.email as string} userId={user?.user?.id as string} />
            </DashboardLayout>
        </AuthProvider>
    )
}

export default page