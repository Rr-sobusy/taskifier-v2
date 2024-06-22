import React from 'react'
import Link from 'next/link'
import { type SidenavType } from '@/interfaces/sidenav-types'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SideNavSm } from './side-nav-sm'

import { Sun, Moon, Menu } from 'lucide-react'


const BreadCrumbsHelper = ({ path = [] }: { path: SidenavType["title"][] }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    path.map((ctx, index) => <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem key={index} className="capitalize">
                            <Link className={`text-[.75rem] ${index === path.length - 1 ? 'text-slate-700 pointer-events-none' : 'text-slate-400'}  tracking-tight font-semibold hover:text-slate-600 dark:text-slate-300`} href={`/${ctx}`}>
                                {ctx}
                            </Link>
                        </BreadcrumbItem>

                    </>
                    )
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}



export const Header = ({ breadcrumbsPath, themeToggler }: { breadcrumbsPath: any , themeToggler: ()=>void}) => {
    return (
        <header className="h-[75px] items-center flex justify-between">
            <BreadCrumbsHelper path={breadcrumbsPath} />
            <div className="flex justify-center items-center gap-3">
                <SideNavSm>
                    <Menu className="block md:hidden" size={20} />
                </SideNavSm>

                <Avatar className="w-7 h-7">
                    <AvatarImage src="/man.svg" />
                    <AvatarFallback></AvatarFallback>
                </Avatar>
                <span onClick={themeToggler}><Moon size={22} /></span>
            </div>
        </header>
    )
}
