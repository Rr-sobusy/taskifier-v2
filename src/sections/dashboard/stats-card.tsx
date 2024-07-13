import React from 'react'
import {
    Card, CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FlexBox } from '@/components/common/flex-box'
import { StatsCardProps } from '@/interfaces/stats-type'

const StatsCard = ({description, icon, title, value}: StatsCardProps) => {
    const Icon  = icon
    return (
        <Card className="relative">
            <CardHeader className="flex flex-row items-center justify-between">
                <FlexBox className="" flexDirection="col">
                    <CardTitle className="text-foreground/80 font-bold tracking-tight">{title}</CardTitle>
                    <CardDescription className="text-foreground/60 text-[.75rem] font-regular">{description}</CardDescription>
                </FlexBox>
                <Icon className="text-foreground/70 absolute top-5 right-5" size={24} />
            </CardHeader>
            <CardContent>
                <h1 className="text-2xl font-extrabold tracking-tight">{value}</h1>
            </CardContent>
        </Card>
    )
}

export default StatsCard