"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import Next13ProgressBar from 'next13-progressbar'

import SidenavLg from './side-nav-lg'
import { SidenavData } from '@/constants/side-nav-data'
import { Header } from './header'

type LayoutProps = {
  children?: React.ReactNode;
}

const DashboardLayout = ({
  children
}: LayoutProps) => {

  const pathName = usePathname()
  const route = pathName.split("/").filter(path => path)
  const { theme, setTheme } = useTheme()

  const themeToggler = (): void => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  return (
    <>
      <Next13ProgressBar />
      <SidenavLg routerPaths={route} routes={SidenavData} />
      <main className="flex flex-col z-10 w-screen md:w-[calc(100vw-70px)] md:relative left-[58px] md:px-8 px-3 md:min-h-[calc(100vh+10px)]">
        <Header themeToggler={themeToggler} breadcrumbsPath={route} />
        {children}
      </main>
    </>
  )
}

export default DashboardLayout