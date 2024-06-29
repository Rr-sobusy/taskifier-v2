import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { CardHeader, CardContent, Card, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { TaskCardType } from '@/interfaces/task-card-types'
import { FilePenLine, CalendarCheck2, CalendarClock } from 'lucide-react'


const TaskCard = ({ taskTitle = "this is rex randy Hernandez", tags, createdAt = new Date("2024-06-26T16:25:06.726Z"), completionDate = new Date("2024-06-26T16:25:06.726Z"), icCompleted, icon, iconBgColor, subTasks }: TaskCardType) => {
  const Icon = ()  => {
      switch (icon) {
        case "FilePenLine" :
          return <FilePenLine />;
      }
  }

  return (
    <Card className="shadow-sm relative cursor-pointer">
      <CardHeader className="flex flex-row items-center gap-2 pt-6 pb-3">
        <div style={{background : iconBgColor}} className={`h-14 w-14 flex text-background justify-center items-center shadow-sm rounded-lg`}>
          {Icon()}
        </div>
        <div className="flex flex-col items-baseline gap-2">
          <div className="flex item-center gap-1">
            {
              tags.map((tag) => (
                <Badge className="rounded-sm bg-accent" variant="outline">
                  {tag.taskTitle}
                </Badge>))
            }
          </div>
          <CardTitle className="text-[.925rem] tracking-normal font-extrabold leading-none">{taskTitle}</CardTitle>
        </div>
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
      <CardContent className="flex flex-col gap-1">
        <Separator className="my-4" />
        <div className="flex items-center gap-4">
          <Progress className="h-[5px] basis-[90%]" value={80} />
          <p className="text-[.75rem] font-semibold">90%</p>
        </div>
        <p className="text-[.75rem] font-semibold">{tags.length.toString()}</p>
        <div className="flex flex-row items-center gap-2">
          <p className="text-foreground/80">Last updated: </p>
          <p className="text-[.75rem] font-semibold text-foreground/85">27 May</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskCard