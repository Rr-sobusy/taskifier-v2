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

export const SideNavSm = ({ routes = [], activePath, children, className, ...props }: { routes?: SidenavType[], activePath?: string, children: React.ReactNode, className?: string }) => {
    return (<Sheet>
        <SheetTrigger className={cn(``, className)} {...props}>{children}</SheetTrigger>
        <SheetContent side="left">
            <SheetHeader className="flex flex-col gap-2">
                <SheetTitle className="flex justify-center"><Image height={50} width={50} alt='' src="/icon.svg" /></SheetTitle>
                <SheetDescription>
                    {
                        routes.map((route) => {
                            const Icon = route.icon
                            return (<Link className={`py-4 px-3 w-full text-start text-sm font-extrabold rounded-lg flex items-center gap-2`} key={route.title} href={route.href} >
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