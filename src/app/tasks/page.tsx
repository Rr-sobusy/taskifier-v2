import React from 'react'
import DashboardLayout from '@/components/layout/dashboard/layout'
import TaskCard from '@/sections/tasks/task-card'
import AuthProvider from '@/provider/AuthProviders'
import Link from 'next/link'
import { ListFilter, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { fetchTasks } from '@/actions/tasks/fetch-tasks'

type Props = {}


const page = async (props: Props) => {

  const user = await auth()
  const test = await fetchTasks(user?.user?.email ? user.user.email : "");

  return (
    <AuthProvider>
      <DashboardLayout>
        <div className="flex justify-between">
          <div className="flex gap-8">
            <h1 className="scroll-m-20 text-foreground/90 font-extrabold tracking-tight text-2xl lg:text-2xl">
              Task Lists
            </h1>
            <Button size="sm" className="rounded-3xl flex gap-2 border-primary h-8 text-primary hover:text-primary px-4 text-[.75rem]" variant="outline"><span><ListFilter size={20} /></span><span className="md:block md:rounded-full hidden">Filters</span></Button>
          </div>
          <Link href="/tasks/create">
            <Button size="sm" className="rounded-3xl flex gap-1 h-8 px-4 text-[.75rem]"><span><Plus size={20} /></span><span className="hidden md:block rounded-full">Add New</span></Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-7 ">
          {
            test.map((todo) => (
              <Link href={`tasks/management/${user?.user?.name}/${todo.tasksId}`}>
                <TaskCard
                  subTasks={todo.subTasks}
                  key={todo.tasksId}
                  taskTitle={todo.taskTitle}
                  taskDescription={todo.taskDescription}
                  completionDate={todo.completionDate}
                  createdAt={todo.createdAt}
                  tags={todo.tags}
                  icon={todo.icon}
                  iconBgColor={todo.iconBgColor}
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