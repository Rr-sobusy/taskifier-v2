import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const flexBoxVariants = cva('h-full', {
    variants: {
        display: {
            flex: "flex",
            block: "block"
        }
        ,
        flexDirection: {
            row: "flex-row",
            col: "flex-col",
            mdRow: "flex-col md:flex-row",
            mdCol: "flex-row md:flex-col"
        },
        alignItems: {
            default: "",
            start: "items-start",
            center: "items-center",
            end: "items-end",
            stretch: "items-stretch",
            baseline: "items-baseline",
        },
        justifyContent: {
            default:"",
            center: "justify-center",
            start: "justify-start",
            between: "justify-between",
            end: "justify-end",
            evenly: "justify-evenly"
        }
    },
    defaultVariants: {
        display: "flex",
        flexDirection: "row",
        alignItems :"default",
        justifyContent:"default"

    }
})

export interface FlexBoxProps extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexBoxVariants> { }


const FlexBox: React.FC<FlexBoxProps> = ({
    className,
    alignItems,
    flexDirection,
    justifyContent,
    display,
    ...props
}) => {
    const Comp = "div"
    return <Comp {...props} className={cn(flexBoxVariants({ alignItems, className, flexDirection, justifyContent, display }))} />
}

FlexBox.displayName = "div";

export { FlexBox, flexBoxVariants }