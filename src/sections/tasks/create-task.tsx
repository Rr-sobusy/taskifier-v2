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

import { addNewTask } from '@/actions/tasks/add-task'
import { useAction } from 'next-safe-action/hooks'
import { Trash2, Plus } from "lucide-react";
import { MultiSelect } from '@/components/ui/multi-select'
import { Icons } from '@/constants/icons'
import { v4 as uuidv4 } from 'uuid'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema, TaskSchema } from '@/interfaces/add-task-schema'
import { useToast } from '@/components/ui/use-toast'
import { tags } from '@/constants/tags'


type CreateTaskProps = {
    userId: string
}

type SubTaskProps = {
    id: string
    subTaskName: string
}

const CreateTask = ({ userId }: CreateTaskProps) => {
    const [date, setDate] = React.useState<Date>()
    const [subTasks, setSubTasks] = React.useState<SubTaskProps[]>([{ id: uuidv4(), subTaskName: "" }])

    const { toast } = useToast()

    const { execute, isExecuting, result } = useAction(addNewTask.bind(null, userId, subTasks.map((task) => task.subTaskName)))

    const { register, handleSubmit, formState: { errors }, control } = useForm<TaskSchema>({
        resolver: zodResolver(taskSchema)
    })


    /**
     * * From line 67 - 89. Perform dynamic changing of value by not implementing 
     * * react-hook-form library to save time and prevent bugs.
     */
    const addSubTaskField = () => {
        if (subTasks.length && subTasks[subTasks.length - 1].subTaskName !== "") {
            const newSubTasks: SubTaskProps = {
                id: uuidv4(),
                subTaskName: ""
            }
            setSubTasks((prev) => [...prev, newSubTasks]);
        }
    }

    const onValueChange = (id: string, newValue: string) => {
        const origArray = [...subTasks];
        const arrIndex = origArray.findIndex((subtask) => subtask.id === id);
        origArray[arrIndex] = {
            ...origArray[arrIndex],
            subTaskName: newValue
        }
        setSubTasks(origArray)
    }

    const removeSubTaskField = (id: string) => {
        if (subTasks.length !== 1)
            setSubTasks((prev) => prev.filter((subT) => subT.id !== id));
    }

    return (
        <form onSubmit={handleSubmit((val) => {
            //execute action in server
            execute(val);

            const { serverError, data } = result;

            if (!serverError) {
                toast({
                    title: "New task added.",
                })
            }
        })} >
            <FlexBox justifyContent="center" className="mt-8 pb-8">
                <FlexBox flexDirection="col" className="gap-4 md:w-2/3 lg:w-[40%] w-full">

                    <FlexBox flexDirection="col">
                        <p className='font-sans text-foreground/80 text-base font-bold tracking-normal'>Task title</p>
                        <Input {...register("taskTitle")} name="taskTitle" className="w-full text-sm font-sans font-medium" type='text' />
                        {
                            errors.taskTitle && <p className="font-sans text-sm text-red-500">{errors.taskTitle.message}</p>
                        }
                    </FlexBox>

                    <FlexBox flexDirection="col">
                        <p className='font-sans text-foreground/80 text-base font-bold tracking-normal'>Task description</p>
                        <Textarea {...register("taskDescription")} name="taskDescription" className="w-full min-h-24 text-sm font-sans font-medium" />
                        {
                            errors.taskDescription && <p className="font-sans text-sm text-red-500">{errors.taskDescription?.message}</p>
                        }
                    </FlexBox>

                    <FlexBox flexDirection="col">
                        <p className='font-sans text-foreground/80 text-base font-bold tracking-normal'>Task tags</p>
                        <div className="w-full">
                            <Controller
                                control={control}
                                name="tags"
                                render={({ field }) => (
                                    <MultiSelect
                                        options={tags}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        placeholder="Select tag/s"
                                        variant="inverted"
                                        animation={2}
                                        maxCount={3}
                                    />)}
                            />
                            {
                                errors.tags && <p className="font-sans text-sm text-red-500">{errors.tags.message}</p>
                            }
                        </div>
                    </FlexBox>

                    <FlexBox className="gap-2" flexDirection="row">
                        <FlexBox className="flex-1" flexDirection="col">
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
                                    <Controller name="completionDate" control={control}
                                        render={({ field }) => (<Calendar
                                            onSelect={field.onChange}
                                            selected={field.value}
                                            mode="single"
                                            initialFocus
                                        />)}
                                    />
                                </PopoverContent>
                            </Popover>
                            {
                                errors.completionDate && <p className="font-sans text-sm text-red-500">{errors.completionDate.message}</p>
                            }
                        </FlexBox>
                        <FlexBox flexDirection="col" className="flex-1">
                            <p className='font-sans text-foreground/80 text-base font-bold tracking-normal'>Task Icon</p>
                            <Controller control={control}
                                name="icon"
                                render={({ field }) => (<Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full border h-10 rounded-md text-sm font-medium flex items-center justify-center hover:bg-accent">
                                        <SelectValue placeholder="Select icon" />
                                    </SelectTrigger>
                                    <SelectContent className="flex flex-col justify-center">
                                        <SelectGroup className="grid grid-cols-3 gap-1">
                                            {
                                                Icons.map((Icon) => (
                                                    <SelectItem key={Icon.iconName} className="border pl-7" value={Icon.iconName}>
                                                        <Icon.icon size={23} className="text-foreground/75" />
                                                    </SelectItem>))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>)}
                            />
                            {
                                errors.icon && <p className="font-sans text-sm text-red-500">{errors.icon.message}</p>
                            }
                        </FlexBox>
                    </FlexBox>

                    <FlexBox flexDirection="col" className="gap-2">
                        <p className='font-sans text-foreground/80 text-base font-bold tracking-normal'>Sub Tasks <span className="text-md font-light">(Leave empty if none.)</span></p>
                        {
                            subTasks.map((subTask) => (<FlexBox className="gap-2" key={subTask.id}>
                                <Input value={subTask.subTaskName} onChange={(e) => onValueChange(subTask.id, e.target.value)} type='text' />
                                <Button type="button" onClick={() => removeSubTaskField(subTask.id)} variant="outline"><Trash2 size={17} /></Button>
                            </FlexBox>))
                        }
                    </FlexBox>

                    <FlexBox justifyContent="end">
                        <Button type="button" onClick={addSubTaskField} variant="outline"><Plus size={16} /></Button>
                    </FlexBox>

                    <Button disabled={isExecuting} type="submit">{isExecuting ? `Creating ...` : `Create Task`}</Button>
                </FlexBox>

            </FlexBox>
        </form>
    )
}

export default CreateTask