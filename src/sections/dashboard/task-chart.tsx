import React from 'react'
import {
    CardHeader,
    CardContent,
    Card,
    CardTitle,
    CardDescription,
  } from "@/components/ui/card";

type Props = {}

const TaskChart = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground/80 font-bold tracking-tight">Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>

      </CardContent>
    </Card>
  )
}

export default TaskChart