"use client";

import React, { useState } from "react";
import { FlexBox } from "@/components/common/flex-box";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, FolderPlus } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createNewTask } from "@/actions/tasks/create-task";
import { useAction } from "next-safe-action/hooks";
import { Trash2, Plus, Undo } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";
import { Icons } from "@/constants/icons";
import { v4 as uuidv4 } from "uuid";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskSchema } from "@/interfaces/add-task-schema";
import { useToast } from "@/components/ui/use-toast";
import { tags } from "@/constants/tags";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type CreateTaskProps = {
  userId: string;
  userEmail: string;
};

export type SubTaskProps = {
  id: string;
  subTaskName: string;
};

const CreateTask = ({ userId, userEmail }: CreateTaskProps) => {
  const [subTasks, setSubTasks] = React.useState<SubTaskProps[]>([]);

  const { toast } = useToast();

  const { execute, isExecuting, result } = useAction(
    createNewTask.bind(
      null,
      userId,
      userEmail,
      subTasks.map((task) => task.subTaskName)
    )
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    getValues,
    setValue,
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      subTask: [],
    },
  });

  const subTasksNew = watch("subTask");

  /**
   * * From line 77 - 98. Perform dynamic changing of value by not implementing
   * * react-hook-form library to save time and prevent bugs.
   */
  // const addSubTaskField = () => {
  //   const newSubTasks: SubTaskProps = {
  //     id: uuidv4(),
  //     subTaskName: "",
  //   };
  //   setSubTasks((prev) => [...prev, newSubTasks]);
  // };
  const addSubTaskField = React.useCallback(() => {
    const subTaskValue = getValues("subTask");

    setValue("subTask", [
      ...subTaskValue,
      {
        id: uuidv4(),
        subTaskName: "",
      },
    ]);
  }, [getValues, setValue]);

  //* dynamically change the value of subTaskName per index. Depends on what input element was changed.
  // const onValueChange = (id: string, inputValue: string) => {
  //   setSubTasks((prevState) => {
  //     return prevState.map((ctx) =>
  //       ctx.id === id ? { ...ctx, subTaskName: inputValue } : ctx
  //     );
  //   });
  // };

  // const removeSubTaskField = (id: string) => {
  //   setSubTasks((prev) => prev.filter((subT) => subT.id !== id));
  // };
  const removeSubTaskField = React.useCallback(
    (id: string) => {
      const subTaskValue = getValues("subTask");

      setValue(
        "subTask",
        subTaskValue.filter((subTask) => subTask.id !== id)
      );
    },
    [setValue, getValues]
  );

  return (
    <form
      onSubmit={handleSubmit((val) => {
        //execute action in server
        execute(val);

        const { serverError, data } = result;

        if (!serverError) {
          toast({
            title: "New task added.",
            description: val.taskTitle,
          });
        }
      })}
    >
      <FlexBox justifyContent="center" className="mt-8 pb-8">
        <FlexBox
          flexDirection="col"
          className="gap-4 md:w-2/3 lg:w-[40%] w-full"
        >
          <FlexBox flexDirection="col">
            <p className="font-sans text-foreground/80 text-base font-bold tracking-normal">
              Task title
            </p>
            <Input
              {...register("taskTitle")}
              name="taskTitle"
              className="w-full text-sm font-sans font-medium"
              type="text"
            />
            {errors.taskTitle && (
              <p className="font-sans text-sm text-red-500">
                {errors.taskTitle.message}
              </p>
            )}
          </FlexBox>

          <FlexBox flexDirection="col">
            <p className="font-sans text-foreground/80 text-base font-bold tracking-normal">
              Task description
            </p>
            <Textarea
              {...register("taskDescription")}
              name="taskDescription"
              className="w-full min-h-24 text-sm font-sans font-medium"
            />
            {errors.taskDescription && (
              <p className="font-sans text-sm text-red-500">
                {errors.taskDescription?.message}
              </p>
            )}
          </FlexBox>

          <FlexBox flexDirection="col">
            <p className="font-sans text-foreground/80 text-base font-bold tracking-normal">
              Task tags
            </p>
            <div className="w-full">
              <Controller
                control={control}
                name="tags"
                render={({ field }) => (
                  <MultiSelect
                    options={tags}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select tag/s"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />
                )}
              />
              {errors.tags && (
                <p className="font-sans text-sm text-red-500">
                  {errors.tags.message}
                </p>
              )}
            </div>
          </FlexBox>

          <FlexBox className="gap-2" flexDirection="row">
            <FlexBox className="flex-1" flexDirection="col">
              <p className="font-sans text-foreground/80 text-base font-bold tracking-normal">
                Completion Date
              </p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-center h-10 text-sm text-center font-medium",
                      "text-foreground/80 font-medium"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>Pick a date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Controller
                    name="completionDate"
                    control={control}
                    render={({ field }) => (
                      <Calendar
                        onSelect={field.onChange}
                        selected={field.value}
                        mode="single"
                        initialFocus
                      />
                    )}
                  />
                  <Separator />
                  <PopoverClose className="w-full p-1">
                    <Button className="w-full" variant="outline">
                      Close
                    </Button>
                  </PopoverClose>
                </PopoverContent>
              </Popover>
              {errors.completionDate && (
                <p className="font-sans text-sm text-red-500">
                  {errors.completionDate.message}
                </p>
              )}
            </FlexBox>
            <FlexBox flexDirection="col" className="flex-1">
              <p className="font-sans text-foreground/80 text-base font-bold tracking-normal">
                Task Icon
              </p>
              <Controller
                control={control}
                name="icon"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full border h-10 rounded-md text-sm font-medium flex items-center justify-center hover:bg-accent">
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent className="flex flex-col justify-center">
                      <SelectGroup className="grid grid-cols-3 gap-1">
                        {Icons.map((Icon) => (
                          <SelectItem
                            key={Icon.iconName}
                            className="border pl-7"
                            value={Icon.iconName}
                          >
                            <Icon.icon
                              size={23}
                              className="text-foreground/75"
                            />
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.icon && (
                <p className="font-sans text-sm text-red-500">
                  {errors.icon.message}
                </p>
              )}
            </FlexBox>
          </FlexBox>

          <FlexBox flexDirection="col" className="gap-2">
            <p className="font-sans text-foreground/80 text-base font-bold tracking-normal">
              Sub Tasks{" "}
              <span className="text-md font-light">(Leave empty if none.)</span>
            </p>
            {/* {subTasks.map((subTask) => (
              <FlexBox className="gap-2" key={subTask.id}>
                <Input
                  value={subTask.subTaskName}
                  onChange={(e) => onValueChange(subTask.id, e.target.value)}
                  type="text"
                />
                <Button
                  type="button"
                  onClick={() => removeSubTaskField(subTask.id)}
                  variant="outline"
                >
                  <Trash2 size={17} />
                </Button>
              </FlexBox>
            ))} */}
            {subTasksNew.map((subTask, index) => (
              <Controller
                key={index}
                control={control}
                name={`subTask.${index}.subTaskName`}
                render={({ field }) => (
                  <FlexBox className="gap-2" key={subTask.id}>
                    <div className="w-full">
                      <Input
                        {...field}
                        value={field.value}
                        onChange={(event) => {
                          const value = event.target.value;
                          field.onChange(value);
                        }}
                        type="text"
                      />
                      {errors.subTask && (
                        <p className="font-sans text-sm text-red-500">
                          {errors.subTask.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeSubTaskField(subTask.id)}
                      variant="outline"
                    >
                      <Trash2 size={17} />
                    </Button>
                  </FlexBox>
                )}
              />
            ))}
          </FlexBox>

          <FlexBox justifyContent="end">
            <Button type="button" onClick={addSubTaskField} variant="outline">
              <Plus size={16} />
            </Button>
          </FlexBox>

          <FlexBox className="gap-2" flexDirection="mdRow">
            <Button
              className="flex items-center gap-2 md:w-3/4"
              disabled={isExecuting}
              type="submit"
            >
              <span>
                <FolderPlus size={16} />
              </span>
              {isExecuting ? `Creating ...` : `Create Task`}
            </Button>
            <Link href="/tasks">
              <Button
                className="flex items-center w-full gap-2"
                type="button"
                variant="outline"
              >
                <span>
                  <Undo size={16} />
                </span>
                Back to tasks
              </Button>
            </Link>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </form>
  );
};

export default CreateTask;
