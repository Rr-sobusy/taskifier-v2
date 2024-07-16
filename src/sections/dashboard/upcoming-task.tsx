import React from "react";
import {
  CardHeader,
  CardContent,
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Calendar, MoveRight } from "lucide-react";
import { FlexBox } from "@/components/common/flex-box";
import { SampleType } from "@/interfaces/get-sample-type";
import { Progress } from "@/components/ui/progress";
import { format, differenceInDays } from "date-fns";
import { Icons } from "@/constants/icons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type UpcomingTaskProps = {
  tasks: SampleType;
};

const UpcomingTask = ({ tasks }: UpcomingTaskProps) => {
  return (
    <Card className="row-span-1">
      <CardHeader>
        <CardTitle className="text-foreground/80 flex items-center gap-2 font-bold tracking-tight">
          <span className="px-3 py-3 rounded-full bg-accent/40 shadow-md">
            <Calendar size={17} />
          </span>
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {tasks.map((task) => {
          return (
            <FlexBox
              key={task.tasksId}
              justifyContent="between"
              alignItems="center"
              className="relative gap-1"
            >
              <div className="py-2 px-2 rounded-full flex justify-center items-center bg-accent/70 text-[.825rem] font-regular">
                {format(task.completionDate, "MMM dd")}
              </div>
              <p className="text-[.825rem] text-start w-full text-foreground/85 font-semibold tracking-tighter overflow-x-hidden text-ellipsis">
                {task.taskTitle}
              </p>
              <div className=" bg-accent/90 flex gap-1 px-2 py-2 items-center  rounded-md">
                <p className="text-[.75rem]">
                  {differenceInDays( task.completionDate, new Date()) + 1}
                </p>
                <Calendar className="text-foreground/80" size={18} />
              </div>
            </FlexBox>
          );
        })}
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
        <Separator />
        <Link href="/tasks?taskId=15">
          <p className="text-[.825rem] flex gap-1 items-center font-medium ml-1">
            View all
            <span className="text-foreground/75">
              <MoveRight size={17} />
            </span>
          </p>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default UpcomingTask;
