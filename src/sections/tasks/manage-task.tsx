"use client";

import React from "react";
import clsx from "clsx";
import type { SampleType } from "@/interfaces/get-sample-type";
import { FlexBox } from "@/components/common/flex-box";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/constants/icons";
import { Slider } from "@/components/ui/slider";
import { SliderThumb } from "@radix-ui/react-slider";
import { Button } from "@/components/ui/button";

import { CalendarClock, CalendarCheck2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

type Props = {
  task: SampleType[0];
};

const ManageTask = ({ task }: Props) => {
  const [sliderState, setSliderState] = React.useState<number>(task.progress);

  const RenderIcon = () => {
    const iconIndex = Icons.findIndex((ctx) => ctx.iconName === task.icon);
    const Icon = Icons[iconIndex].icon;
    return <Icon />;
  };

  return (
    <FlexBox
      className="md:min-w-[36rem] gap-1 min-w-[90%] relative"
      flexDirection="col"
    >
      <Badge variant="outline" className="absolute right-3">
        completed
        <span className="h-3 w-3 absolute -top-[6px] right-[4px] rounded-full bg-green-500"></span>
      </Badge>
      <FlexBox className="gap-2">
        <div
          className={`h-14 w-14 flex justify-center text-background/90 items-center rounded-md ${clsx(
            {
              // the bgColor depends on what status of current tasks is.
              "bg-[#7F55DA]": task.progress === 0,
              "bg-[#039856]": task.progress > 0 && task.progress < 100,
              "bg-[#1570EE]": task.progress === 100,
            }
          )}`}
        >
          {RenderIcon()}
        </div>
        <FlexBox flexDirection="col">
          <h2 className="text-base text-foreground/85 font-extrabold tracking-tight">
            {task.taskTitle}
          </h2>
          <p className="text-sm font-medium text-foreground/75">
            {task.taskDescription}
          </p>
        </FlexBox>
      </FlexBox>
      <FlexBox className="mt-1" flexDirection="mdRow" justifyContent="between">
        <FlexBox className="gap-1">
          {task.tags.map((tag, index) => (
            <Badge key={index} className="bg-green-600 text-background">
              {tag.taskTitle}
            </Badge>
          ))}
        </FlexBox>
      </FlexBox>
      <Separator className="mt-2" />
      <FlexBox flexDirection="col" className="gap-2">
        <FlexBox justifyContent="between">
          <p className="flex items-center gap-2 text-sm tracking-tight text-foreground/85 font-semibold">
            Task progress
          </p>
          <p className="flex items-center gap-2 text-sm tracking-tight text-foreground/85 font-semibold">
            {task.progress}%
          </p>
        </FlexBox>
        <Progress className="bg-accent h-2" value={task.progress} />
        <FlexBox justifyContent="between">
          <FlexBox className="gap-1" alignItems="center">
            <p className="text-[.825rem] flex gap-1 items-center font-medium text-foreground/65">
              <span>
                <CalendarClock size={14} />
              </span>
              Added:
            </p>
            <p className="text-[.850rem] font-medium text-foreground/85 tracking-tight">
              {format(task.createdAt, "dd MMM yyyy")}
            </p>
          </FlexBox>
          <FlexBox className="gap-1" alignItems="center">
            <p className="text-[.825rem] flex gap-1 items-center font-medium text-foreground/65">
              <span>
                <CalendarClock size={14} />
              </span>
              Deadline:
            </p>
            <p className="text-[.850rem] font-medium text-foreground/85 tracking-tight">
              {format(task.completionDate, "dd MMM yyyy")}
            </p>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <Separator className="my-3" />
      <Button className="text-start" variant="outline">
        New Subtasks
      </Button>
      <h5 className="my-1 flex items-center gap-2 text-sm tracking-tight text-foreground/85 font-semibold">
        Subtasks
        <span className="py-1 px-2 rounded-md bg-accent">
          {task.subTasks.length}
        </span>
      </h5>
      <FlexBox flexDirection="col" className="gap-3">
        {task.subTasks.map((subtask, index) => (
          <FlexBox
            key={index}
            alignItems="center"
            className="flex gap-2 text-foreground/80 text-sm tracking-tight font-medium"
          >
            <Checkbox />
            <p>{subtask.subTaskTitle}</p>
          </FlexBox>
        ))}
      </FlexBox>
      <p className="text-[.850rem] -mb-4 mt-2 font-medium text-foreground/75 tracking-tight">
        Slide to update progress <span>({`${sliderState}%`})</span>
      </p>
      <Slider
        onValueChange={(value) => setSliderState(Number(value))}
        className="bg-accent mt-5"
      />
      <Button className="mt-5">Update</Button>
    </FlexBox>
  );
};

export default ManageTask;
