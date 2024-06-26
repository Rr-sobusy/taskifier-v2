import React from 'react'
import Link from 'next/link'
import { type SidenavType } from '@/interfaces/sidenav-types'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


import { Sun, Moon, Menu, GithubIcon } from 'lucide-react'
import Image from 'next/image'


const BreadCrumbsHelper = ({ path = [] }: { path: SidenavType["title"][] }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    path.slice(0,2).map((ctx, index) => <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem key={index} className="capitalize">
                            <Link className={`text-[.75rem] ${ctx !== path[0]  ? 'text-foreground/95 pointer-events-none' : 'text-foreground/70'}  tracking-tight font-semibold `} href={`/${ctx}`}>
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

                <Menu className="block md:hidden" size={20} />


                {/* <GithubIcon size={37} className="px-2 py-2 hover:bg-accent rounded-md" /> */}
                <span className="cursor-pointer py-2 px-2 hover:bg-accent rounded-md" onClick={themeToggler}>{currentTheme === "dark" ? <Sun size={23} /> : <Moon size={23} />}</span>
            </div>
        </header>
    )
}
