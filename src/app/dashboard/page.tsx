import React from "react";
import DashboardLayout from "@/components/layout/dashboard/layout";
import AuthProvider from "@/provider/AuthProviders";
import StatsCard from "@/sections/dashboard/stats-card";
import { auth } from "@/auth";
import { FlexBox } from "@/components/common/flex-box";
import UpcomingTask from "@/sections/dashboard/upcoming-task";
import TaskChart from "@/sections/dashboard/task-chart";
import { LayoutDashboard, ListChecks, LayoutList, ShieldX } from "lucide-react";
import { fetchTasks } from "@/actions/tasks/fetch-tasks";


//* utils for filtering task types
import { filterTask } from "@/lib/utils";

type Props = {};

const page = async (props: Props) => {
  const user = await auth();

  const tasks = await fetchTasks(user?.user?.email as string);
  


  return (
    <AuthProvider>
      <DashboardLayout>
        <h1 className="scroll-m-20 ml-1 text-foreground/85 font-extrabold tracking-tight text-2xl lg:text-2xl">
          Hi, {user?.user?.name}
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <StatsCard
            title="Tasks"
            description="Total tasks listed"
            icon={LayoutDashboard}
            value={tasks.length}
          />
          <StatsCard
            title="Completed Tasks"
            description="Total tasks accomplished on time"
            icon={ListChecks}
            value={filterTask({ tasks: tasks, taskType: "completed" }).length}
          />
          <StatsCard
            title="Pending Tasks"
            description="Total tasks that need to accomplish"
            icon={LayoutList}
            value={filterTask({ tasks: tasks, taskType: "on-going" }).length}
          />
          <StatsCard
            title="Failed Tasks"
            description="Total tasks that not finished on time"
            icon={ShieldX}
            value={filterTask({ tasks: tasks, taskType: "failed" }).length}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 pb-4">
          <div className="col-span-2 row-span-2">
            <TaskChart />
          </div>
          <UpcomingTask tasks={filterTask({tasks: tasks, taskType:"on-going"})}  />
        </div>
      </DashboardLayout>
    </AuthProvider>
  );
};

export default page;
