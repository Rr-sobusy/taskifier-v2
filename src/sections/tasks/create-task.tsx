"use client"

import React, { useState } from 'react'
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"

import { sampleAction } from '@/actions/tasks/sample-action'
import { useAction } from 'next-safe-action/hooks'
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";
import { MultiSelect } from '@/components/ui/multi-select'
import { Colors } from '@/constants/icon-colors'
import { Icons } from '@/constants/icons'

type Props = {
    formAction?: (data: FormData) => void
}
const frameworksList = [
    { value: "react", label: "React", icon: Turtle },
    { value: "angular", label: "Angular", icon: Cat },
    { value: "vue", label: "Vue", icon: Dog },
    { value: "svelte", label: "Svelte", icon: Rabbit },
    { value: "ember", label: "Ember", icon: Fish },
];
const CreateTask = ({ formAction }: Props) => {
    const [date, setDate] = React.useState<Date>()
    const { execute, result, isExecuting } = useAction(sampleAction);
    const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["react", "angular"]);

    return (
        <form onSubmit={async (e) => {
            e.preventDefault()

        }} >
            <FlexBox justifyContent="center" className="mt-8">
                <FlexBox flexDirection="col" className="gap-4 md:w-2/3 lg:w-[40%] w-full">

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

                    <FlexBox flexDirection="col">
                        <p className='font-sans text-foreground/80 text-base font-bold tracking-normal'>Select tag/s</p>
                        <div className="w-full">
                            <MultiSelect
                                options={frameworksList}
                                onValueChange={setSelectedFrameworks}
                                defaultValue={selectedFrameworks}
                                placeholder="Select frameworks"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                            />
                        </div>
                    </FlexBox>

                    <FlexBox className="gap-2" justifyContent="between" flexDirection="row">
                        <FlexBox flexDirection="col" className="flex-1">
                            <p className='font-sans text-foreground/80 text-base font-bold tracking-normal'>Select tag/s</p>
                            <Select name="select">
                                <SelectTrigger className="w-full border h-10 rounded-md text-sm font-medium flex items-center justify-center hover:bg-accent">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent className="flex flex-col justify-center">
                                    <SelectGroup className="grid grid-cols-3 gap-1">
                                        {
                                            Colors.map((color) => (
                                                <SelectItem className="border pl-6" value={color}>
                                                    <div style={{ background: color }} className="h-7 w-7 rounded-md"></div>
                                                </SelectItem>))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FlexBox>
                        <FlexBox flexDirection="col" className="flex-1">
                            <p className='font-sans text-foreground/80 text-base font-bold tracking-normal'>Select tag/s</p>
                            <Select name="select">
                                <SelectTrigger className="w-full border h-10 rounded-md text-sm font-medium flex items-center justify-center hover:bg-accent">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent className="flex flex-col justify-center">
                                    <SelectGroup className="grid grid-cols-3 gap-1">
                                        {
                                            Icons.map((Icon, key) => (
                                                <SelectItem className="border pl-7" value={Icon.iconName}>
                                                    <Icon.icon size={23} className="text-foreground" />
                                                </SelectItem>))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FlexBox>

                    </FlexBox>

                    <Button disabled={isExecuting} type="submit">Test</Button>
                </FlexBox>

            </FlexBox>
        </form>
    )
}

export default CreateTask