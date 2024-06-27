import React from 'react'
import DashboardLayout from '@/components/layout/dashboard/layout'
import AuthProvider from '@/provider/AuthProviders'
import ButtonMe from './button'

type Props = {}

const page = (props: Props) => {
  return (
    <AuthProvider>
       <DashboardLayout>
        <p>Dashboard</p>
        <ButtonMe />
      </DashboardLayout>
    </AuthProvider>
  )
}

export default page