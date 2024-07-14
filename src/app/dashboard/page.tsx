import React from 'react'
import DashboardLayout from '@/components/layout/dashboard/layout'
import AuthProvider from '@/provider/AuthProviders'
import { CardsStats } from '@/sections/dashboard/sample-chart'
import StatsCard from '@/sections/dashboard/stats-card'
import { auth } from '@/auth'
import { FlexBox } from '@/components/common/flex-box'
import TestComp from '@/sections/dashboard/test-com'
import { LayoutDashboard, ListChecks, LayoutList } from 'lucide-react'
import { fetchTasks } from '@/actions/tasks/fetch-tasks'
import { isAfter } from 'date-fns'

type Props = {}

const page = async (props: Props) => {
  const user = await auth();

  const tasks = await fetchTasks(user?.user?.email as string);
  const completedTask = tasks.filter((task) => task.progress === 100)
  const pendingTask = tasks.filter((task) => !isAfter(new Date(), task.completionDate) && task.progress !== 100)
  const failedTask = tasks.filter((task) => isAfter(new Date(), task.completionDate) && task.progress === 100)

  return (
    <AuthProvider>
      <DashboardLayout>
        <h1 className="scroll-m-20 ml-1 text-foreground/85 font-extrabold tracking-tight text-2xl lg:text-2xl">
          Hi, {user?.user?.name}
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <StatsCard title='Tasks' description='Total tasks listed' icon={LayoutDashboard} value={tasks.length} />
          <StatsCard title='Completed Tasks' description='Total tasks accomplished on time' icon={ListChecks} value={completedTask.length} />
          <StatsCard title='Pending Tasks' description='Total tasks that need to accompish' icon={LayoutList} value={pendingTask.length} />
          <StatsCard title='Failed Tasks' description='Total tasks that not finished on time' icon={LayoutDashboard} value={failedTask.length} />
        </div>
        <FlexBox className="mt-5" display="block"> <CardsStats />
          <TestComp />
        </FlexBox>
      </DashboardLayout>
    </AuthProvider>
  )
}

export default page