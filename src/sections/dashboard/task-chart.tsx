"use client";

import * as React from "react";
import { TrendingUp, PieChart as PieChartIcon } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { type BulkTasksProps } from "@/interfaces/fetched-task-types";
import { filterTask } from "@/lib/utils";

type TaskChartProps = {
  tasks: BulkTasksProps;
};

const chartConfig = {
  completed: {
    label: "completed",
    color: "hsl(var(--chart-1))",
  },
  failed: {
    label: "failed",
    color: "hsl(var(--chart-2))",
  },
  "on-going": {
    label: "on-going",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;
export const TaskChart = ({ tasks }: TaskChartProps) => {
  const chartData = [
    {
      name: "completed",
      count: filterTask({ tasks: tasks, taskType: "completed" }).length,
      fill: "var(--color-completed)",
    },
    {
      name: "pending",
      count: filterTask({ tasks: tasks, taskType: "on-going" }).length,
      fill: "var(--color-on-going)",
    },
    {
      name: "failed",
      count: filterTask({ tasks: tasks, taskType: "failed" }).length,
      fill: "var(--color-failed)",
    }
  ];
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-foreground/80 flex items-center gap-2 font-bold tracking-tight">
          <span className="px-3 py-3 rounded-full bg-accent/40 shadow-md">
            <PieChartIcon size={17} />
          </span>
          Task Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {tasks.length}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total sub-division of tasks.
        </div>
      </CardFooter>
    </Card>
  );
};
