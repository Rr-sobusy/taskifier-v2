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

type Props = {
  task: SampleType[0];
};

const ManageTask = ({ task }: Props) => {
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
        on-going
        <span className="h-3 w-3 absolute -top-[7px] right-1 rounded-full bg-green-500"></span>
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
        <FlexBox className="gap-2">
          {task.tags.map((tag) => (
            <Badge className="bg-green-600 text-background">
              {tag.taskTitle}
            </Badge>
          ))}
        </FlexBox>
      </FlexBox>
      <Separator />
      <FlexBox>
        rex
      </FlexBox>
      <Button className="mt-3 text-start" variant="outline">New Subtasks</Button>
      <h5 className="my-1 flex items-center gap-2 text-sm tracking-tight text-foreground/85 font-semibold">
        Subtasks <span className="py-1 px-2 rounded-md bg-accent">{task.subTasks.length}</span>
      </h5>
      <FlexBox flexDirection="col" className="gap-3">
        {task.subTasks.map((subtask) => (
          <FlexBox
            alignItems="center"
            className="flex gap-2 text-foreground/80 text-sm tracking-tight font-medium"
          >
            <Checkbox />
            <p>{subtask.subTaskTitle}</p>
          </FlexBox>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default ManageTask;
