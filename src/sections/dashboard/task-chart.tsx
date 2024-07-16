"use client"

import React from "react";
import {
  CardHeader,
  CardContent,
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

type Props = {};

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const TaskChart = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground/80 font-bold tracking-tight">
          Upcoming Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TaskChart;
