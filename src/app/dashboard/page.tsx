import React from 'react'
import DashboardLayout from '@/components/layout/dashboard/layout'
import AuthProvider from '@/provider/AuthProviders'

type Props = {}

const page = (props: Props) => {
  return (
    <AuthProvider>
      <DashboardLayout>
        <p>Dashboard</p>
      </DashboardLayout>
    </AuthProvider>
  )
}

export default page