import React from 'react'
import DashboardLayout from '@/components/layout/dashboard/layout'
import AuthProvider from '@/provider/AuthProviders'

import prisma from '@/lib/prisma'
import { FlexBox } from '@/components/common/flex-box'
import ManageTask from '@/sections/tasks/manage-task'
const page = async ({ params }: { params: { slug: string[] } }) => {


  const task = await prisma.tasks.findFirst({
    where: {
      tasksId: Number(params.slug[1])
    }, include: {
      subTasks: true,
      tags: true
    }
  })

  return (
    <AuthProvider>
      <DashboardLayout>
        <FlexBox flexDirection="col">
          <h1 className="scroll-m-20 text-foreground/85 font-extrabold tracking-tight text-2xl lg:text-2xl">
            Manage task
          </h1>
        </FlexBox>
        <FlexBox justifyContent="center">
          <ManageTask task={task} />
        </FlexBox>
      </DashboardLayout>
    </AuthProvider>
  )
}

export default page