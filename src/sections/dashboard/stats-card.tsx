import React from 'react'
import {
    Card, CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
type StatsCardProps = {}
import { LayoutDashboard ,type LucideIcon} from 'lucide-react'
import { FlexBox } from '@/components/common/flex-box'

const StatsCard = (props: StatsCardProps) => {
    const Icon:LucideIcon = LayoutDashboard
    return (
        <Card className="relative">
            <CardHeader className="flex flex-row items-center justify-between">
                <FlexBox className="" flexDirection="col">
                    <CardTitle className="text-foreground/80 font-bold tracking-tight">Total Tasks</CardTitle>
                    <CardDescription className="text-foreground/60 text-[.75rem] font-regular">Total tasks created</CardDescription>
                </FlexBox>
                <Icon className="text-foreground/70 absolute top-5 right-5" size={24} />
            </CardHeader>
            <CardContent>
                <h1 className="text-2xl font-extrabold tracking-tight">$1</h1>
            </CardContent>
        </Card>
    )
}

export default StatsCard