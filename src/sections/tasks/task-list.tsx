"use client";

import React from "react";
import { SampleType } from "@/interfaces/fetched-task-types";
import Link from "next/link";
import TaskCard from "./task-card";
import NullTask from "./null-task-screen";
import { useSearchParams } from "next/navigation";
import { isAfter } from "date-fns";
import type { TaskProgress } from "@/interfaces/task-progress";

type TaskListsProps = {
  tasks: SampleType;
};

const TaskLists = ({ tasks }: TaskListsProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter") as TaskProgress;

  /**
   * * Filter the task lists depends to url query params supplied
   */
  const filteredTasks = (): SampleType => {
    if (search === "on-going")
      return tasks.filter(
        (task) =>
          task.progress < 100 &&
          task.progress !== 0 &&
          !isAfter(new Date(), task.completionDate)
      );
    if (search === "failed")
      return tasks.filter(
        (task) =>
          task.progress !== 100 && isAfter(new Date(), task.completionDate)
      );
    if (search === "completed")
      return tasks.filter((task) => task.progress === 100);
    if (search === "starting")
      return tasks.filter(
        (task) =>
          task.progress === 0 && !isAfter(new Date(), task.completionDate)
      );
    return tasks;
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-7 ">
      {filteredTasks().length ? (
        filteredTasks().map((task) => (
          <Link
            key={task.tasksId}
            href={`tasks/management/${task.userId}/${task.tasksId}`}
          >
            <TaskCard
              userEmail={task.userEmail}
              userId={task.userId}
              updatedAt={task.updatedAt}
              tasksId={task.tasksId}
              subTasks={task.subTasks}
              key={task.tasksId}
              taskTitle={task.taskTitle}
              taskDescription={task.taskDescription}
              completionDate={task.completionDate}
              progress={task.progress}
              createdAt={task.createdAt}
              tags={task.tags}
              icon={task.icon}
            />
          </Link>
        ))
      ) : (
        <Link href="/tasks/create">
          <NullTask />
        </Link>
      )}
    </div>
  );
};

export default TaskLists;
