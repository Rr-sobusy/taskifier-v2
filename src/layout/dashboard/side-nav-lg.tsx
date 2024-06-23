import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SidenavData } from '@/constants/side-nav-data'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import type { SidenavType } from '@/interfaces/sidenav-types'


const TooltipHelper = ({ children, title, ...rest }: { children: React.ReactNode, title: SidenavType["href"] }) => {
    return (<TooltipProvider>
        <Tooltip {...rest}>
            <TooltipTrigger>{children}</TooltipTrigger>
            <TooltipContent className="bg-foreground">
               <p>{title}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>)
}

const SidenavLg = ({ routes = [ ], routerPaths }: { routes?: SidenavType[], routerPaths: SidenavType["href"][] }) => {
    return (
        <aside className="w-[70px] hidden md:flex flex-col items-center fixed border-r min-h-screen bg-background">
            <Image className="mt-5" alt="" src="\icon.svg" width={40} height={40} />
            <div className="flex flex-col mt-7 gap-3 justify-center items-center">
                {
                    routes.map((route) => {
                        const Icon = route.icon;
                        const activeRoute = "/" + routerPaths[0] === route.href ? 'text-background bg-primary' : 'text-foreground bg-accent';
                        return <Link className={`w-10 h-10  flex justify-center items-center rounded-xl ${activeRoute}`} key={route.title} href={route.href}>
                            <TooltipHelper title={route.title}>
                                <Icon size={15} />
                            </TooltipHelper>
                        </Link>
                    })
                }
            </div>
        </aside>
    )
}

export default SidenavLg;