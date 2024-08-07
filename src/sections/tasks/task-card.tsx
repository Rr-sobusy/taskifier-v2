import React from "react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  CardHeader,
  CardContent,
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlexBox } from "@/components/common/flex-box";
import { Icons } from "@/constants/icons";
import { CalendarCheck2, CalendarClock, Loader } from "lucide-react";
import clsx from "clsx";
import { format, isAfter, differenceInDays } from "date-fns";
import type { BulkTasksProps } from "@/interfaces/fetched-task-types";

const toggleAlertDays = 3;

const TaskCard = (Schema: BulkTasksProps[0]) => {
  const iconColor = clsx({
    "bg-[#F52C2C]":
      isAfter(new Date(), Schema.completionDate) && Schema.progress !== 100,
    "bg-[#5C6C7A]": Schema.progress === 0,
    "bg-[#039856]": Schema.progress > 0 && Schema.progress < 100,
    "bg-[#1570EE]": Schema.progress === 100,
  });

  const renderIcon = () => {
    const iconIndex = Icons.findIndex((ctx) => ctx.iconName === Schema.icon);
    const Icon = Icons[iconIndex].icon;
    return <Icon />;
  };

  return (
    <Card className="relative cursor-pointer overflow-x-hidden">
      <CardHeader className="flex flex-row items-center gap-2 pt-6 pb-3">
        <div
          className={`h-14 w-14 flex text-background justify-center items-center shadow-sm rounded-lg ${iconColor}`}
        >
          {renderIcon()}
        </div>

        <FlexBox flexDirection="col">
          <CardTitle className="text-[.925rem] text-foreground/85 tracking-normal font-extrabold leading-tight">
            {Schema.taskTitle}
          </CardTitle>
          <CardDescription className="text-[.850rem] text-foreground/75 font-medium tracking-tight leading-none">
            {Schema.taskDescription}
          </CardDescription>
        </FlexBox>
      </CardHeader>

      <FlexBox className="px-6 flex" justifyContent="between">
        <div className="flex items-center gap-1">
          <CalendarCheck2 className="text-foreground/80" size={14} />
          <p className="text-[.75rem] text-foreground/80">Added:</p>
          <p className="text-[.75rem] font-semibold text-foreground/85">
            {format(Schema.createdAt, "dd MMM yyyy")}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <CalendarClock className="text-foreground/80" size={14} />
          <p className="text-[.75rem] text-foreground/80">Deadline:</p>
          <p className="text-[.75rem] font-semibold text-foreground/85">
            {format(Schema.completionDate, "dd MMM yyyy")}
          </p>
        </div>
      </FlexBox>

      <div className="px-6 mt-2">
        <div className="flex item-center gap-1">
          {Schema.tags.map((tag, index) => (
            <Badge
              key={index}
              className="rounded-sm bg-accent bg-green-600  text-background"
              variant="outline"
            >
              {tag.taskTitle}
            </Badge>
          ))}
        </div>
      </div>
      <CardContent className="flex flex-col gap-1">
        <Separator className="my-2" />
        <p className="text-[.75rem] text-foreground/85">Progress:</p>
        <FlexBox alignItems="center" className="gap-4">
          <Progress
            className="h-[4px] bg-accent basis-[90%]"
            value={Schema.progress}
          />
          <p className="text-[.75rem] font-semibold">{Schema.progress + "%"}</p>
        </FlexBox>
        <p className="text-[.75rem] text-foreground/70 font-medium">
          {Schema.subTasks.length
            ? `${
                Schema.subTasks.filter((subTask) => subTask.isCompleted).length
              } of ${Schema.subTasks.length} subtask completed`
            : "0 subtask"}
        </p>
        <FlexBox
          className=""
          justifyContent="between"
          flexDirection="row"
          alignItems="center"
        >
          <FlexBox alignItems="center" className="gap-2">
            <p className="text-[.75rem] text-foreground/80">Last updated: </p>
            <p className="text-[.75rem] font-semibold text-foreground/85">
              {Schema.updatedAt
                ? format(Schema.updatedAt, "dd MMM yyyy")
                : "Date not available"}
            </p>
          </FlexBox>

          {
            /**
             * Render if less than 3 days before completionDate and progress is below 100
             */
            differenceInDays(Schema.completionDate, new Date()) <=
              toggleAlertDays &&
              Schema.progress < 100 &&
              !isAfter(new Date(), Schema.completionDate) && (
                <p className="text-[.75rem] text-red-500">
                  {differenceInDays(Schema.completionDate, new Date()) +
                    1 +
                    " " +
                    "days remaining.Hurry up!"}
                </p>
              )
          }
        </FlexBox>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
