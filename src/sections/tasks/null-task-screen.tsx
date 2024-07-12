import React from 'react'
import {
    CardHeader,
    CardContent,
    Card,
    CardTitle,
    CardDescription,
  } from "@/components/ui/card";
  import { CirclePlus } from 'lucide-react';

type Props = {}

const NullTask = (props: Props) => {
  return (
   <Card>
    <CardContent className="flex flex-col justify-center items-center min-h-[11rem] md:min-h-[15rem]">
       <h4 className="font-bold text-xl tracking-tight text-foreground/80">No task listed</h4>
       <p className="text-foreground/70 font-normal text-base">Click to create one</p>
       <CirclePlus className="text-foreground/65 mt-1" size={30} />
    </CardContent>
   </Card>
  )
}

export default NullTask