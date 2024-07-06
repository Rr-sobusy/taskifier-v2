import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import Card from '@/sections/welcome/sub-hero-card'
import type { HeroCardProps } from '@/sections/welcome/sub-hero-card'
import { Command, Play, SquareKanban, FolderClock } from 'lucide-react'

import { signIn } from '@/auth'
import { FlexBox } from '@/components/common/flex-box'
import HeroImage from '../../../../public/blub(3).png'
import BackdropFilter from '@/app/samp/_page'


const subHeaders: HeroCardProps[] = [
  {
    cardTitle: "Smart Scheduling",
    content: "Prioritize and schedule your tasks with ease. Taskifier's intelligent algorithms help you manage your time effectively, ensuring you never miss a deadline.",
    Icon: Command,
    gradientColor: "from-blue-400 to-indigo-600"
  },
  {
    cardTitle: "Streamlined Task Management",
    content: "Taskifier keeps everything organized, so you can focus on what matters.",
    Icon: SquareKanban,
    gradientColor: "from-blue-400 to-indigo-600"
  },
  {
    cardTitle: "Real-time Syncing",
    content: " Access your tasks anytime, anywhere. Taskifier syncs across all your devices, so you're always up to date whether you're on your phone, tablet, or computer.",
    Icon: FolderClock,
    gradientColor: "from-blue-400 to-indigo-600"
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
    <section className="min-h-screen min-w-[calc(100vw-13px)] px-5 md:px-14">

      <header className="h-[70px] md:max-w-[65rem] mx-auto flex justify-between items-center">

        <FlexBox alignItems="center" >
          <Image alt='' src="/icon.svg" width={50} height={50} />
          <h5 className="font-sans text-slate-700 text-xl md:text-2xl font-extrabold -ml-3">ask<span className="text-[#535bf0]">ifier</span></h5>
        </FlexBox>

        <form action={formAction}>
          <Button className="text-background bg-indigo-500 hover:bg-indigo-600  hover:shadow-md brod"><Image className="mr-2" alt='' height={20} width={20} src="/google.svg" />
            Sign-in with Google
          </Button>
        </form>

      </header>

      <FlexBox className="mt-10 md:mt-0 md:max-w-[63rem] mx-auto relative" display="flex" flexDirection="mdRow" justifyContent="evenly" alignItems="center">
        <FlexBox flexDirection="col">
          <h1 className="font-sans text-5xl z-50 text-foreground/80 md:text-[3rem] font-extrabold tracking-tighter self-center justify-center place-self-center justify-self-center">All your task at one place. With ease.</h1>
          <h5 className="font-sans md:text-base font-medium text-sm text-foreground/65 max-w-xl mt-5 md:mt-3">Keep all your tasks organized in one place, effortlessly. Taskifier offers a clean, intuitive interface to help you stay on top of your to-do list, whether it&apos;s for work, school, or personal projects.</h5>
          <FlexBox flexDirection="row" className="md:mt-5 mt-6 gap-3">
            <form action={formAction}>
              <Button className="bg-indigo-500 hover:bg-indigo-600 hover:shadow-md rounded-xl flex gap-2"><span className="animate-bounce"><Play size={15} /></span>Try for free</Button>
            </form>
            <Button className="bg-indigo-500 rounded-xl bg-transparent hover:shadow-md hover:bg-transparent shadow-none text-indigo-500 border border-indigo-500"><a target='_blank' href="https://github.com/Rr-sobusy/taskifier-v2">View Github</a></Button>
          </FlexBox>
        </FlexBox>
        <Image priority className="z-20 " alt='' src={HeroImage} height={400} width={400} />
        <BackdropFilter />
      </FlexBox>


      <h1 className="text-center font-sans text-2xl tracking-tighter font-extrabold text-foreground/75 mt-5">Transform the way you manage tasks with us!</h1>
      <FlexBox className="gap-16 md:gap-8 max-w-5xl relative mx-auto py-[5rem]" display="flex" flexDirection="mdRow">
        {
          subHeaders.map((card) => (
            <Card cardProps={card} key={card.cardTitle} />
          ))
        }
      </FlexBox>
    </section>
  )
}

export default page