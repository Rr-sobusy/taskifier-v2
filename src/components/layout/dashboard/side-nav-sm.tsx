import React from 'react'
import { SidenavType } from '@/interfaces/sidenav-types'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export const SideNavSm = ({ routes = [], routerPaths, children, className, ...props }: { routes?: SidenavType[], routerPaths: SidenavType["href"][], children: React.ReactNode, className?: string }) => {
    return (<Sheet>
        <SheetTrigger className={cn(``, className)} {...props}>{children}</SheetTrigger>
        <SheetContent side="left">
            <SheetHeader className="flex flex-col gap-2">
                <SheetTitle className="flex justify-center"><Image height={50} width={50} alt='' src="/icon.svg" /></SheetTitle>
                <SheetDescription className="flex flex-col gap-3">
                    {
                        routes.map((route) => {
                            const Icon = route.icon;
                            const activeRoute = "/" + routerPaths[0] === route.href ? 'text-background bg-primary' : 'text-foreground bg-accent';
                            return (<Link className={`py-2 px-3 w-full text-start text-sm font-extrabold rounded-lg flex items-center gap-2 ${activeRoute}`} key={route.title} href={route.href} >
                                <span>{<Icon size={16} />}</span>
                                {route.title}
                            </Link>)
                        })
                    }
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>)
}