import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import type { SampleType } from '@/interfaces/get-sample-type'
  import { FlexBox } from '@/components/common/flex-box'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/constants/icons'

type Props = {
  task: SampleType[0]
}

const ManageTask = ({ task }: Props) => {
  
  const RenderIcon = () => {
    const iconIndex = Icons.findIndex((ctx) => ctx.iconName === task.icon)
    const Icon = Icons[iconIndex].icon
    return <Icon />
  }
  return (
    <FlexBox className="md:min-w-[36rem] min-w-[90%]" flexDirection="col">
      <FlexBox className="gap-2">
        <div className="h-16 w-16 flex justify-center items-center rounded-md bg-blue-200">
          {RenderIcon()}
        </div>
        <FlexBox flexDirection="col" className="">
          <h2 className="text-xl text-foreground/85 font-semibold">{task.taskTitle}</h2>
          <p>{task.taskDescription}</p>
        </FlexBox>
      </FlexBox>
      <FlexBox className="gap-2 my-2">
        {
          task.tags.map((tag) => <Badge>{tag.taskTitle}</Badge>)
        }
      </FlexBox>
      <Separator />
      <h5>Subtasks:</h5>
      {
        task.subTasks.map((subtask)=> (<FlexBox className="py-3 px-2 rounded-md bg-accent text-foreground/60 font-medium">{subtask.subTaskTitle}</FlexBox>))
      }
    </FlexBox>
  )
}

export default ManageTask