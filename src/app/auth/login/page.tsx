import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import Card from '@/sections/welcome/sub-hero-card'
import type { HeroCardProps } from '@/sections/welcome/sub-hero-card'
import { Command } from 'lucide-react'

import { signIn } from '@/auth'
import { FlexBox } from '@/components/common/flex-box'

const subHeaders: HeroCardProps[] = [
  {
    cardTitle: "Smart Scheduling",
    content: "Prioritize and schedule your tasks with ease. Taskifier's intelligent algorithms help you manage your time effectively, ensuring you never miss a deadline.",
    Icon: Command,
    gradientColor: "from-blue-400 to-indigo-700"
  },
  {
    cardTitle: "Streamlined Task Management",
    content: "Taskifier keeps everything organized, so you can focus on what matters.",
    Icon: Command,
    gradientColor: "from-green-400 to-blue-700"
  },
  {
    cardTitle: "Real-time Syncing",
    content: " Access your tasks anytime, anywhere. Taskifier syncs across all your devices, so you're always up to date whether you're on your phone, tablet, or computer.",
    Icon: Command,
    gradientColor: "from-green-400 to-lime-500"
  }
]


const page = () => {

  const formAction = async () => {
    "use server"
    await signIn("google", {
      redirectTo: "/dashboard"
    });
  }

  return (
    <section className="min-h-screen min-w-[calc(100vw-13px)] bg-gradient-to-tr from-blue-50 to-indigo-300 px-5 md:px-14">
     
      <header className="h-[90px] flex justify-between items-center">
        {/* <div className="flex items-center">
          <Image alt='' src="/icon.svg" width={50} height={50} />
          <h5 className="font-sans text-slate-700 text-xl md:text-2xl font-extrabold -ml-3">ask<span className="text-[#6B71F1]">ifier</span></h5>
        </div> */}
        <FlexBox alignItems="center" >
          <Image alt='' src="/icon.svg" width={50} height={50} />
          <h5 className="font-sans text-slate-700 text-xl md:text-2xl font-extrabold -ml-3">ask<span className="text-[#6B71F1]">ifier</span></h5>
        </FlexBox>
        <form action={formAction}>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-400 hover:shadow-md brod"><Image className="mr-2" alt='' height={20} width={20} src="/google.svg" />Sign In</Button></form>
      </header>

      <FlexBox className="mt-10 md:mt-0" display="flex" flexDirection="mdRow" justifyContent="evenly" alignItems="center">
        <div>
          <h1 className="font-sans text-5xl md:text-[3rem] text-slate-700 font-extrabold tracking-tighter self-center justify-center place-self-center justify-self-center">All your task at one place. With ease.</h1>
          <h5 className="font-sans md:text-base font-medium text-sm text-slate-600 max-w-xl mt-5 md:mt-3">Keep all your tasks organized in one place, effortlessly. Taskifier offers a clean, intuitive interface to help you stay on top of your to-do list, whether it&apos;s for work, school, or personal projects.</h5>
        </div>
        <Image className="z-20" alt='' src="/blub(3).png" height={400} width={400} />
      </FlexBox>

      <h1 className="text-center font-sans text-2xl tracking-tighter font-extrabold text-slate-600 mt-5">Transform the way you manage tasks with us!</h1>
      <FlexBox className="gap-16 md:gap-8 max-w-5xl relative mx-auto py-[5rem]" display="flex" flexDirection="mdRow">
        {
          subHeaders.map((card) => (<Card key={card.cardTitle} cardProps={card} />))
        }
      </FlexBox>
    </section>
  )
}

export default page