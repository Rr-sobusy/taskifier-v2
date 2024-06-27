import React from 'react'
import type { LucideIcon } from 'lucide-react'

export type HeroCardProps = {
    cardTitle: string
    content: string
    Icon: LucideIcon
    gradientColor: string
}

type CardProps = {
    cardProps: HeroCardProps
}

const Card = ({ cardProps }: CardProps) => {

    const Icon = cardProps.Icon

    return (
        <div className="min-h-[180px] border px-3 border-slate-300/45 flex flex-col gap-3 items-center relative rounded-2xl shadow-md md:flex-1">
            <div className={`h-[4rem] w-[4rem] rounded-full flex gap-3 items-center justify-center absolute -top-10  bg-gradient-to-r ${cardProps.gradientColor}`}>
                <Icon className="text-white" size={30} />
            </div>
            <h5 className="text-center text-lg md:text-base font-extrabold font-sans mt-7 text-slate-600">{cardProps.cardTitle}</h5>
            <p className="text-center text-[15px] md:text-sm font-sans font-semibold text-slate-500 tracking-tight"> {cardProps.content} </p>
        </div>
    )
}

export default Card