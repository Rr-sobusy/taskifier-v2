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
import Image from 'next/image'


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



export const Header = ({ breadcrumbsPath, themeToggler, currentTheme }: { breadcrumbsPath: any, themeToggler: () => void, currentTheme: string | undefined }) => {
    return (
        <header className="h-[75px] items-center flex justify-between">
            <BreadCrumbsHelper path={breadcrumbsPath} />
            <div className="flex justify-center items-center">
                <SideNavSm >
                    <Menu className="block md:hidden" size={20} />
                </SideNavSm>

                <Image className="px-2 py-2 hover:bg-accent rounded-md" width={37} height={37} alt='' src="/github.svg" />
                <span className="cursor-pointer py-2 px-2 hover:bg-accent rounded-md" onClick={themeToggler}>{currentTheme === "dark" ? <Sun size={23} /> : <Moon size={23} />}</span>
            </div>
        </header>
    )
}
