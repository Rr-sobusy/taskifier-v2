import React from 'react'
import DashboardLayout from '@/components/layout/dashboard/layout'
import AuthProvider from '@/provider/AuthProviders'



const page = ({ params }: { params: { slug: string[] } }) => {
  return (
   <AuthProvider>
    <DashboardLayout>
      rex
    </DashboardLayout>
   </AuthProvider>
  )
}

export default page