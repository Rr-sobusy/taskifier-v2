import React from "react";
import {
  CardHeader,
  CardContent,
  Card,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FlexBox } from "@/components/common/flex-box";
import { SampleType } from "@/interfaces/get-sample-type";
import { Progress } from "@/components/ui/progress";
import { format, differenceInDays } from "date-fns";

type UpcomingTaskProps = {
    tasks: SampleType
}

const UpcomingTask = ({tasks}: UpcomingTaskProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground/80 font-bold tracking-tight">
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {tasks.map((task) => (
          <FlexBox
            flexDirection="col"
            className="rounded-lg py-6 px-4 bg-accent/65"
          >
            <FlexBox className="" alignItems="center">
              <p className="font-extrabold text-[.90rem] text-foreground/75 tracking-tight leading-none basis-3/4 text-ellipsis overflow-hidden">
                {task.taskTitle}
              </p>
              <p className="basis-1/4 text-[.750rem] font-semibold text-foreground/50 text-end">
                {format(task.completionDate, "EEE, MMM dd")}
              </p>
            </FlexBox>
            <p className="text-sm text-foreground/50 font-medium tracking-tighter">
              {task.taskDescription}
            </p>
            <FlexBox className="mt-2" justifyContent="between">
              <p className="text-[.750rem] text-foreground/50 font-semibold tracking-tight text-end">
                {`${task.progress} of 100%`}
              </p>
              <p className="text-[.750rem] text-foreground/50 font-semibold tracking-tight text-end">
                {differenceInDays(task.completionDate, new Date()) +
                  " " +
                  "day left"}
              </p>
            </FlexBox>
            <Progress className="h-[6px]" value={task.progress} />
          </FlexBox>
        ))}
      </CardContent>
      <CardFooter>rex</CardFooter>
    </Card>
  );
};

export default UpcomingTask;
