"use client"

import React, { HTMLAttributes } from 'react'
import { FlexBox } from '@/components/common/flex-box'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'


type Props = {
    formAction?: (data: FormData) => void
}

const CreateTask = ({ formAction }: Props) => {
    return (
        <form action={formAction} >
            <FlexBox justifyContent="center" className="mt-8">
                <FlexBox flexDirection="col" className="gap-4 md:w-2/3 lg:w-1/3 w-full">
                    <FlexBox flexDirection="col">
                        <p className='font-sans text-foreground/85 text-base font-extrabold tracking-tight'>Task title</p>
                        <Input name="taskTitle" className="w-full text-sm font-sans font-medium" type='text' />
                    </FlexBox>
                    <FlexBox flexDirection="col">
                        <p className='font-sans text-foreground/85 text-base font-extrabold tracking-tight'>Task description</p>
                        <Textarea name="taskDescription" className="w-full min-h-24" />
                    </FlexBox>
                    <Button type="submit">Test</Button>
                </FlexBox>
            </FlexBox>
        </form>
    )
}

export default CreateTask