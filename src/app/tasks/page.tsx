import React from "react";
import DashboardLayout from "@/components/layout/dashboard/layout";
import TaskCard from "@/sections/tasks/task-card";
import AuthProvider from "@/provider/AuthProviders";
import Link from "next/link";
import {  Plus } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { fetchTasks } from "@/actions/tasks/fetch-tasks";
import FilterTasks from "@/sections/tasks/filter-tasks";
import TaskLists from "@/sections/tasks/task-list";
type Props = {};

const page = async (props: Props) => {
  const user = await auth();

  const tasks = await fetchTasks(user?.user?.email as string);

  return (
    <AuthProvider>
      <DashboardLayout>
        <Toaster />
        <div className="flex justify-between">
          <div className="flex gap-8">
            <h1 className="scroll-m-20 text-foreground/85 font-extrabold tracking-tight text-2xl lg:text-2xl">
              Task Lists
            </h1>
            <FilterTasks taskTypes={["starting","on-going","completed","failed"]} />
          </div>
          <Link href={`/tasks/create`}>
            <Button
              size="sm"
              className="rounded-3xl flex gap-1 h-8 px-4 text-[.75rem]"
            >
              <span>
                <Plus size={20} />
              </span>
              <span className="hidden md:block rounded-full">Add New</span>
            </Button>
          </Link>
        </div>
       <TaskLists tasks={tasks} />
      </DashboardLayout>
    </AuthProvider>
  );
};

export default page;
