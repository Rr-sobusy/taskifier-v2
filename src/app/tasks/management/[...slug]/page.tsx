import React from 'react'
import DashboardLayout from '@/components/layout/dashboard/layout'
import AuthProvider from '@/provider/AuthProviders'

import prisma from '@/lib/prisma'
import { FlexBox } from '@/components/common/flex-box'
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
        <FlexBox>
          <h1 className="scroll-m-20 text-foreground/85 font-extrabold tracking-tight text-2xl lg:text-2xl">
            Manage task
          </h1>
          {JSON.stringify(task?.subTasks)}
        </FlexBox>
      </DashboardLayout>
    </AuthProvider>
  )
}

export default page