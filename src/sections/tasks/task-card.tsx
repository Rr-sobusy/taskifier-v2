import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { CardHeader, CardContent, Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { TaskCardType } from '@/interfaces/task-card-types'
import { FlexBox } from '@/components/common/flex-box'
import { Icons } from '@/constants/icons'
import { CalendarCheck2, CalendarClock } from 'lucide-react'
import clsx from 'clsx'


const TaskCard = ({ taskTitle = "this is rex randy Hernandez", tags, createdAt = new Date("2024-06-26T16:25:06.726Z"), completionDate = new Date("2024-06-26T16:25:06.726Z"), progress, icon, subTasks, taskDescription }: TaskCardType) => {


  const RenderIcon = () => {
    const iconIndex = Icons.findIndex((ctx) => ctx.iconName === icon)
    const Icon = Icons[iconIndex].icon
    return <Icon />
  }

  return (
    <Card className="shadow-sm relative cursor-pointer">
      <CardHeader className="flex flex-row items-center gap-2 pt-6 pb-3">

        <div className={`h-14 w-14 flex text-background justify-center items-center shadow-sm rounded-lg ${clsx({
          // the bgColor depends on what status of current tasks is.
          "bg-[#7F55DA]": progress === 0,
          "bg-[#039856]": progress > 0 && progress < 100,
          "bg-[#1570EE]": progress === 100
        })}`}>
          {RenderIcon()}
        </div>

        <FlexBox flexDirection="col">
          <CardTitle className="text-[.925rem] tracking-normal font-extrabold leading-none">{taskTitle}</CardTitle>
          <CardDescription className="text-[.850rem] text-foreground/80 font-medium tracking-tight">
            {taskDescription}
          </CardDescription>
        </FlexBox>
      </CardHeader>

      <div className="px-6 flex gap-2">
        <div className="flex items-center gap-1">
          <CalendarCheck2 className="text-foreground/80" size={14} />
          <p className="text-[.75rem] text-foreground/80">Added:</p>
          <p className="text-[.75rem] font-semibold text-foreground/85">{createdAt.toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-1">
          <CalendarClock className="text-foreground/80" size={14} />
          <p className="text-[.75rem] text-foreground/80">Deadline:</p>
          <p className="text-[.75rem] font-semibold text-foreground/85">{completionDate.toLocaleDateString()}</p>
        </div>
      </div>
      <div className="px-6 mt-2">
        <div className="flex item-center gap-1">
          {
            tags.map((tag, index) => (
              <Badge key={index} className="rounded-sm bg-accent bg-green-600  text-background" variant="outline">
                {tag.taskTitle}
              </Badge>))
          }
        </div>
      </div>
      <CardContent className="flex flex-col gap-1">
        <Separator className="my-4" />
        <div className="flex items-center gap-4">
          <Progress className="h-[4px] basis-[90%]" value={progress} />
          <p className="text-[.75rem] font-semibold">{progress + "%"}</p>
        </div>
        <p className="text-[.75rem] font-medium">1/4 sub-tasks completed.</p>
        <div className="flex flex-row items-center gap-2">
          <p className="text-[.75rem] text-foreground/80">Last updated: </p>
          <p className="text-[.75rem] font-semibold text-foreground/85">27 May</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskCard