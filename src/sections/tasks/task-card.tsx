import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { CardHeader, CardContent, Card, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { FilePenLine, CalendarCheck2, CalendarClock } from 'lucide-react'

type Props = {}

const TaskCard = (props: Props) => {
  return (
    <Card className="shadow-sm relative cursor-pointer">
      <CardHeader className="flex flex-row items-center gap-2 pt-6 pb-3">
        <div className="h-14 w-14 flex bg-[#039856] text-background justify-center items-center shadow-sm rounded-lg">
          <FilePenLine />
        </div>
        <div className="flex flex-col items-baseline gap-2">
          <div className="flex item-center gap-1">
            <Badge className="rounded-sm bg-accent" variant="outline">
              <p>rex</p>
            </Badge>
            <Badge className="rounded-sm bg-accent" variant="outline">
              <p>rex</p>
            </Badge>
            <Badge className="rounded-sm bg-accent" variant="outline">
              <p>rex</p>
            </Badge>
            <Badge className="rounded-sm bg-accent" variant="outline">
              <p>rex</p>
            </Badge>
            <Badge className="rounded-sm bg-accent" variant="outline">
              <p>rex</p>
            </Badge>
          </div>
          <CardTitle className="text-[.925rem] tracking-normal font-extrabold leading-none">Craft a blog about the evolution of UI/UX.</CardTitle>
        </div>
      </CardHeader>
      <div className="px-6 flex gap-2">
        <div className="flex items-center gap-1">
          <CalendarCheck2 className="dark:text-slate-200 text-slate-600" size={14} />
          <p className="text-[.75rem] dark:text-slate-200 text-slate-600">Added:</p>
          <p className="text-[.75rem] font-semibold dark:text-slate-300 text-slate-800">27 May</p>
        </div>
        <div className="flex items-center gap-1">
          <CalendarClock className="dark:text-slate-200 text-slate-600" size={14} />
          <p className="text-[.75rem] dark:text-slate-200 text-slate-600">Deadline:</p>
          <p className="text-[.75rem] font-semibold dark:text-slate-300 text-slate-800">27 May</p>
        </div>
      </div>
      <CardContent className="flex flex-col gap-1">
        <Separator className="my-4" />
        <div className="flex items-center gap-4">
          <Progress className="h-[5px] basis-[90%]" value={80} />
          <p className="text-[.75rem] font-semibold">90%</p>
        </div>
        <p className="text-[.75rem] font-semibold">1/4 sub-tasks completed</p>
        <div className="flex flex-row items-center gap-2">
          <p className="text-[.75rem] dark:text-slate-200 text-slate-600">Last updated: </p>
          <p className="text-[.75rem] font-semibold dark:text-slate-300 text-slate-800">27 May</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskCard