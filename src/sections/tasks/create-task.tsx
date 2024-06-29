"use client"

import React, { HTMLAttributes } from 'react'
import { FlexBox } from '@/components/common/flex-box'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Calendar as CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"



type Props = {
    formAction?: (data: FormData) => void
}

const CreateTask = ({ formAction }: Props) => {
    const [date, setDate] = React.useState<Date>()

    return (
        <form onSubmit={async (e) => {
        }} >
            <FlexBox justifyContent="center" className="mt-8">
                <FlexBox flexDirection="col" className="gap-4 md:w-2/3 lg:w-1/3 w-full">

                    <FlexBox flexDirection="col">
                        <p className='font-sans text-foreground/80 text-base font-bold tracking-normal'>Task title</p>
                        <Input name="taskTitle" className="w-full text-sm font-sans font-medium" type='text' />
                    </FlexBox>

                    <FlexBox flexDirection="col">
                        <p className='font-sans text-foreground/80 text-base font-bold tracking-normal'>Task description</p>
                        <Textarea name="taskDescription" className="w-full min-h-24" />
                    </FlexBox>

                    <FlexBox flexDirection="col">
                        <p className='font-sans text-foreground/80 text-base font-bold tracking-normal'>Completion Date</p>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-center text-sm text-center font-medium",
                                        !date && "text-foreground/80 font-medium"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </FlexBox>

                    <Button type="submit">Test</Button>
                </FlexBox>

            </FlexBox>
        </form>
    )
}

export default CreateTask