"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { greetUser } from '@/actions/tasks/sample-action'

type Props = {}

const TestComp = (props: Props) => {
  return (
   <Button onClick={async()=>{
    
   }}>
    test
   </Button>
  )
}

export default TestComp