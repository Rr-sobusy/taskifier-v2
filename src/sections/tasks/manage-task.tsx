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

type Props = {
  task : SampleType[0]
}

const ManageTask = ({task}: Props) => {
  return (
    <FlexBox className="md:min-w-[34rem] min-w-[90%]" flexDirection="col">
      <h5 className="text-xl font-bold text-foreground/90">{task.taskTitle}</h5>
      <p className="text-sm text-foreground/70 fons-sans font-medium">{task.taskDescription}</p>
      <p>Tags:</p>
      <Separator />
    </FlexBox>
  )
}

export default ManageTask