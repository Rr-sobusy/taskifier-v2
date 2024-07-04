import React from 'react'
import DashboardLayout from '@/components/layout/dashboard/layout'
import AuthProvider from '@/provider/AuthProviders'
import { CardsStats } from '@/sections/dashboard/sample-chart'
import StatsCard from '@/sections/dashboard/stats-card'
import { auth } from '@/auth'
import { FlexBox } from '@/components/common/flex-box'

type Props = {}

const page = async (props: Props) => {
  const user = await auth();
  return (
    <AuthProvider>
      <DashboardLayout>
        <h1 className="scroll-m-20 ml-1 text-foreground/85 font-extrabold tracking-tight text-2xl lg:text-2xl">
          Hi, {user?.user?.name}
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsCard />
        </div>
        <FlexBox className="mt-5" display="block"> <CardsStats /></FlexBox>
      </DashboardLayout>
    </AuthProvider>
  )
}

export default page