import React from 'react'
import DashboardLayout from '@/components/layout/dashboard/layout'
import TaskCard from '@/sections/tasks/task-card'
import AuthProvider from '@/provider/AuthProviders'
import Link from 'next/link'
import { ListFilter, Plus } from 'lucide-react'
import { Toaster } from '@/components/ui/toaster'

import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { fetchTasks } from '@/actions/tasks/fetch-tasks'

type Props = {}


const page = async (props: Props) => {

  const user = await auth()


  const tasks = await fetchTasks(user?.user?.id as string);

  return (
    <AuthProvider>
      <DashboardLayout>
        <Toaster />
        <div className="flex justify-between">
          <div className="flex gap-8">
            <h1 className="scroll-m-20 text-foreground/90 font-extrabold tracking-tight text-2xl lg:text-2xl">
              Task Lists
            </h1>
            <Button size="sm" className="rounded-3xl flex gap-2 border-primary h-8 text-primary hover:text-primary px-4 text-[.75rem]" variant="outline"><span><ListFilter size={20} /></span><span className="md:block md:rounded-full hidden">Filters</span></Button>
          </div>
          <Link href={`/tasks/create`}>
            <Button size="sm" className="rounded-3xl flex gap-1 h-8 px-4 text-[.75rem]"><span><Plus size={20} /></span><span className="hidden md:block rounded-full">Add New</span></Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-7 ">
          {
            tasks.map((task) => (
              <Link key={task.tasksId} href={`tasks/management/${task.userId}/${task.tasksId}`}>
                <TaskCard
                  key={task.tasksId}
                  taskTitle={task.taskTitle}
                  taskDescription={task.taskDescription}
                  completionDate={task.completionDate}
                  progress={task.progress}
                  createdAt={task.createdAt}
                  tags={task.tags}
                  icon={task.icon}
                />
              </Link>
            ))
          }
        </div>
      </DashboardLayout>
    </AuthProvider>
  )
}

export default page