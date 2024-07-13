import React from 'react'
import DashboardLayout from '@/components/layout/dashboard/layout'
import AuthProvider from '@/provider/AuthProviders'
import { CardsStats } from '@/sections/dashboard/sample-chart'
import StatsCard from '@/sections/dashboard/stats-card'
import { auth } from '@/auth'
import { FlexBox } from '@/components/common/flex-box'
import TestComp from '@/sections/dashboard/test-com'
import { LayoutDashboard } from 'lucide-react'
import { fetchTasks } from '@/actions/tasks/fetch-tasks'

type Props = {}

const page = async (props: Props) => {
  const user = await auth();
  const tasks = await fetchTasks(user?.user?.email as string);

  const completedTask = tasks.filter((task) => task.progress === 100)

  return (
    <AuthProvider>
      <DashboardLayout>
        <h1 className="scroll-m-20 ml-1 text-foreground/85 font-extrabold tracking-tight text-2xl lg:text-2xl">
          Hi, {user?.user?.name}
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <StatsCard title='Total task listed' description='this is task description' icon={LayoutDashboard} value={tasks.length} />
          <StatsCard title='Task Completed' description='this is task description' icon={LayoutDashboard} value={completedTask.length} />
          <StatsCard title='Total task listed' description='this is task description' icon={LayoutDashboard} value={5} />
          <StatsCard title='Total task listed' description='this is task description' icon={LayoutDashboard} value={5} />
        </div>
        <FlexBox className="mt-5" display="block"> <CardsStats />
          <TestComp />
        </FlexBox>
      </DashboardLayout>
    </AuthProvider>
  )
}

export default page