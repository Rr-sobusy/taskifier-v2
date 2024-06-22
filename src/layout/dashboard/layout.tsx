"use client"

import React from 'react'
import SidenavLg from './side-nav-lg'
import { SidenavData } from '@/constants/side-nav-data'
import { Header } from './header'

type LayoutProps = {
  children?: React.ReactNode;
}

const DashboardLayout = async ({
  children
}: LayoutProps) => {
  return (
   <>
      <SidenavLg routes={SidenavData} />   
      <main className="flex flex-col z-10 w-screen md:w-[calc(100vw-70px)] md:relative left-[58px] md:px-8 px-3 md:min-h-[calc(100vh+10px)]">
          {children}
      </main>
   </>
  )
}

export default DashboardLayout