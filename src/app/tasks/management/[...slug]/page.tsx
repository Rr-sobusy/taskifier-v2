import React from 'react'
import DashboardLayout from '@/components/layout/dashboard/layout'
import AuthProvider from '@/provider/AuthProviders'

import prisma from '@/lib/prisma'
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
        {JSON.stringify(task)}
      </DashboardLayout>
    </AuthProvider>
  )
}

export default page