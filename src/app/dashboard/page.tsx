import React from 'react'
import DashboardLayout from '@/components/layout/dashboard/layout'
import AuthProvider from '@/provider/AuthProviders'
import { CardsStats } from '@/sections/dashboard/sample-chart'
import { auth } from '@/auth'

type Props = {}

const page = async (props: Props) => {
  const user = await auth();
  return (
    <AuthProvider>
      <DashboardLayout>
        <h1 className="scroll-m-20 text-foreground/85 font-extrabold tracking-tight text-2xl lg:text-2xl">
          Hi, {user?.user?.name}
        </h1>
        <CardsStats />
      </DashboardLayout>
    </AuthProvider>
  )
}

export default page