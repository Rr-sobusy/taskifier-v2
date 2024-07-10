"use client";

import React from "react";
import clsx from "clsx";
import type { TaskProps } from "@/interfaces/get-sample-type";
import { FlexBox } from "@/components/common/flex-box";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/constants/icons";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  CalendarClock,
  CalendarCheck2,
  Trash2,
  Pencil,
  FilePlus2,
  Undo,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { format, formatISO } from "date-fns";
import { updateTask } from "@/actions/tasks/update-task";
import { v4 as uuidv4 } from "uuid";
import { useAction } from "next-safe-action/hooks";
import { SubTaskProps } from "./create-task";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import Link from "next/link";

type Props = {
  task: TaskProps;
};

const ManageTask = ({ task }: Props) => {
  const [sliderState, setSliderState] = React.useState<number>(task.progress);

  const [addedSubTasks, setAddedSubTask] = React.useState<SubTaskProps[]>([]);

  const { execute, isExecuting, result } = useAction(
    updateTask.bind(
      null,
      addedSubTasks.map((ctx) => ctx.subTaskName)
    )
  );

  const RenderIcon = () => {
    const iconIndex = Icons.findIndex((ctx) => ctx.iconName === task.icon);
    const Icon = Icons[iconIndex].icon;
    return <Icon />;
  };

  const iconColor = clsx({
    "bg-[#5C6C7A]": task.progress === 0,
    "bg-[#039856]": task.progress > 0 && task.progress < 100,
    "bg-[#1570EE]": task.progress === 100,
  });

  const updateHandler = () => {
    execute({ progress: sliderState, taskId: task.tasksId });

    const { serverError } = result;
    if (!serverError) {
    }
  };

  const addNewSubTaskHandler = () => {
    setAddedSubTask((state) => [...state, { id: uuidv4(), subTaskName: "" }]);
  };

  const addedSubTasksChangeHandler = (id: string, inputValue: string) => {
    const origArr = [...addedSubTasks];
    const arrIndex = origArr.findIndex((v) => v.id === id);
    origArr[arrIndex] = {
      ...origArr[arrIndex],
      subTaskName: inputValue,
    };
    setAddedSubTask(origArr);
  };

  const deleteAddedSubTaskHandler = (id: string) => {
    setAddedSubTask((state) => state.filter((ctx) => ctx.id !== id));
  };

  const isSame = Object.is(task.progress, sliderState);

  return (
    <>
      <FlexBox
        className="md:min-w-[36rem] pb-5 gap-1 min-w-[90%] relative"
        flexDirection="col"
      >
        <Badge variant="outline" className="absolute right-3">
          completed
          <span className="h-3 w-3 absolute -top-[6px] right-[4px] rounded-full bg-green-500"></span>
        </Badge>
        <FlexBox className="gap-2">
          <div
            className={`h-14 w-14 flex justify-center text-background/90 items-center rounded-md ${iconColor}`}
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
        <FlexBox
          className="mt-1"
          flexDirection="mdRow"
          justifyContent="between"
        >
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
          <Progress className="bg-accent h-[5.40px]" value={task.progress} />
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
                  <CalendarCheck2 size={14} />
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
        <Button
          onClick={addNewSubTaskHandler}
          className="text-start flex gap-2"
          variant="outline"
        >
          <span>
            <FilePlus2 size={14} />
          </span>
          New Subtask
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
              <Checkbox defaultChecked={subtask.isCompleted} />
              <p>{subtask.subTaskTitle}</p>
            </FlexBox>
          ))}
          {addedSubTasks.map((addedSubTask, index) => (
            <FlexBox key={index} className="gap-2">
              <Input
                value={addedSubTask.subTaskName}
                onChange={(e) =>
                  addedSubTasksChangeHandler(addedSubTask.id, e.target.value)
                }
                type="text"
                className=""
              />
              <Button
                onClick={() => deleteAddedSubTaskHandler(addedSubTask.id)}
                className=""
                variant="outline"
              >
                <Trash2 size={17} />
              </Button>
            </FlexBox>
          ))}
        </FlexBox>
        <p className="text-[.850rem] -mb-4 mt-2 font-medium text-foreground/75 tracking-tight">
          Slide to update progress <span>({`${sliderState}%`})</span>
        </p>
        <Slider
          value={[sliderState]}
          onValueChange={(value) => {
            if (Number(value.toString()) > sliderState)
              setSliderState(Number(value));
          }}
          className="bg-accent mt-5"
        />
        <FlexBox className="gap-2 mt-5" flexDirection="mdRow">
          <Button
            onClick={updateHandler}
            disabled={isSame || isExecuting}
            className="flex-1 flex gap-2"
          >
            <span>
              <Pencil size={13} />
            </span>
            {isExecuting ? "Updating" : "Update"}
          </Button>
          <Button className="w-full md:w-1/3" variant="outline">
            <Link className="flex gap-2 items-center" href="/tasks">
              <span>
                <Undo size={14} />
              </span>
              Back to tasks
            </Link>
          </Button>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default ManageTask;
