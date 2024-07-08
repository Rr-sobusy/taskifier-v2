import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { CardHeader, CardContent, Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { TaskCardType } from '@/interfaces/task-card-types'
import { FlexBox } from '@/components/common/flex-box'
import { Icons } from '@/constants/icons'
import { CalendarCheck2, CalendarClock, Loader } from 'lucide-react'
import clsx from 'clsx'
import { format } from 'date-fns'
import type { SampleType } from '@/interfaces/get-sample-type'


const TaskCard = (Schema: SampleType[0]) => {

  const RenderIcon = () => {
    const iconIndex = Icons.findIndex((ctx) => ctx.iconName === Schema.icon)
    const Icon = Icons[iconIndex].icon
    return <Icon />
  }

  return (
    <Card className="relative cursor-pointer shadow-md overflow-x-hidden">
      <CardHeader className="flex flex-row items-center gap-2 pt-6 pb-3">

        <div className={`h-14 w-14 flex text-background justify-center items-center shadow-sm rounded-lg ${clsx({
          // the bgColor depends on what status of current tasks is.
          "bg-[#7F55DA]": Schema.progress === 0,
          "bg-[#039856]": Schema.progress > 0 && Schema.progress < 100,
          "bg-[#1570EE]": Schema.progress === 100
        })}`}>
          {RenderIcon()}
        </div>

        <FlexBox flexDirection="col">
          <CardTitle className="text-[.925rem] tracking-normal font-extrabold leading-none">{Schema.taskTitle}</CardTitle>
          <CardDescription className="text-[.850rem] text-foreground/80 font-medium tracking-tight">
            {Schema.taskDescription}
          </CardDescription>
        </FlexBox>
      </CardHeader>

      <div className="px-6 flex gap-2">
        <div className="flex items-center gap-1">
          <CalendarCheck2 className="text-foreground/80" size={14} />
          <p className="text-[.75rem] text-foreground/80">Added:</p>
          <p className="text-[.75rem] font-semibold text-foreground/85">{format(Schema.createdAt, 'dd MMM yyyy')}</p>
        </div>
        <div className="flex items-center gap-1">
          <CalendarClock className="text-foreground/80" size={14} />
          <p className="text-[.75rem] text-foreground/80">Deadline:</p>
          <p className="text-[.75rem] font-semibold text-foreground/85">{format(Schema.completionDate, 'dd MMM yyyy')}</p>
        </div>
      </div>
      <div className="px-6 mt-2">
        <div className="flex item-center gap-1">
          {
            Schema.tags.map((tag, index) => (
              <Badge key={index} className="rounded-sm bg-accent bg-green-600  text-background" variant="outline">
                {tag.taskTitle}
              </Badge>))
          }
        </div>
      </div>
      <CardContent className="flex flex-col gap-1">
        <Separator className="my-2" />
        <FlexBox display="flex" alignItems="center" className="gap-1 -mb-1">
          <Loader className="text-foreground/85" size={14} />
          <p className="text-[.75rem] text-foreground/85">Progress:</p>
        </FlexBox>
        <div className="flex items-center gap-4">
          <Progress className="h-[4px] bg-accent basis-[90%]" value={Schema.progress} />
          <p className="text-[.75rem] font-semibold">{Schema.progress + "%"}</p>
        </div>
        <p className="text-[.75rem] text-foreground/70 font-medium">1/4 sub-tasks completed.</p>
        <div className="flex flex-row items-center gap-2">
          <p className="text-[.75rem] text-foreground/80">Last updated: </p>
          <p className="text-[.75rem] font-semibold text-foreground/85">27 May</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskCard