import React from "react";
import DashboardLayout from "@/components/layout/dashboard/layout";
import AuthProvider from "@/provider/AuthProviders";
import { FlexBox } from "@/components/common/flex-box";
import ManageTask from "@/sections/tasks/manage-task";
import { selectSingleTask } from "@/actions/tasks/fetch-tasks";
const page = async ({ params }: { params: { slug: string[] } }) => {
  const task = await selectSingleTask(Number(params.slug[1]));

  return (
    <AuthProvider>
      <DashboardLayout>
        <FlexBox flexDirection="col">
          <h1 className="scroll-m-20 text-foreground/85 font-extrabold tracking-tight text-2xl lg:text-2xl">
            Manage task
          </h1>
        </FlexBox>
        <FlexBox className="mt-9" justifyContent="center">
          <ManageTask task={task} />
        </FlexBox>
      </DashboardLayout>
    </AuthProvider>
  );
};

export default page;
