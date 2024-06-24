import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Command } from 'lucide-react'

import { signIn } from '@/auth'

const page = () => {
  return (
    <section className="min-h-screen min-w-[calc(100vw-13px)] bg-gradient-to-tr from-blue-50 to-indigo-200 px-5 md:px-14">
      <header className="h-[90px] flex justify-between items-center">
        <div className="flex items-center">
          <Image alt='' src="/icon.svg" width={50} height={50} />
          <h5 className="font-sans text-slate-700 text-xl md:text-2xl font-extrabold -ml-3">ask<span className="text-[#6B71F1]">ifier</span></h5>
        </div>
        <form action={async()=>{
          "use server"
            await signIn("google", {
              redirectTo:"/dashboard"
            });
        }}><Button className="bg-gradient-to-r from-blue-500 to-indigo-400 hover:shadow-md"><Image className="mr-2" alt='' height={20} width={20} src="/google.svg" />Sign In</Button></form>
      </header>
      <div className="flex flex-col md:flex-row relative mt-10 md:mt-0 justify-evenly items-center">
        <div>
          <h1 className="font-sans text-5xl md:text-[3rem] text-slate-700 font-extrabold tracking-tighter self-center justify-center place-self-center justify-self-center">All your task at one place. With ease.</h1>
          <h5 className="font-sans md:text-base font-medium text-sm text-slate-600 max-w-xl mt-5 md:mt-3">Keep all your tasks organized in one place, effortlessly. Taskifier offers a clean, intuitive interface to help you stay on top of your to-do list, whether it's for work, school, or personal projects.</h5>
        </div>
        <Image className="z-20" alt='' src="/blub(3).png" height={400} width={400} />
      </div>
      <h1 className="text-center font-sans text-2xl tracking-tighter font-extrabold text-slate-600 mt-5">Transform the way you manage tasks with us!</h1>
      <div className="flex flex-col md:flex-row gap-16 md:gap-8 max-w-4xl relative mx-auto py-[5rem]">
        <div className="min-h-[180px] border px-3 border-slate-200 flex flex-col gap-3 items-center relative rounded-md shadow-md md:flex-1">
          <div className="h-[4rem] w-[4rem] rounded-full flex gap-3 items-center justify-center absolute -top-10  bg-gradient-to-r from-blue-400 to-indigo-700">
            <Command className="text-white" size={30} />
          </div>
          <h5 className="text-center text-base font-extrabold font-sans mt-7 text-slate-600">Smart Scheduling</h5>
          <p className="text-center text-sm font-sans font-semibold text-slate-500 tracking-tight"> Prioritize and schedule your tasks with ease. Taskifier's intelligent algorithms help you manage your time effectively, ensuring you never miss a deadline. </p>
        </div>
        <div className="min-h-[180px] border px-3 border-slate-200 flex flex-col gap-3 items-center relative rounded-md shadow-md md:flex-1">
          <div className="h-[4rem] w-[4rem] rounded-full flex gap-3 items-center justify-center absolute -top-10  bg-gradient-to-r from-green-400 to-blue-700">
            <Command className="text-white" size={30} />
          </div>
          <h5 className="text-center text-base font-extrabold font-sans text-slate-600 mt-8">Streamlined Task Management</h5>
          <p className="text-center text-sm font-sans font-semibold text-slate-500 tracking-tight">Taskifier keeps everything organized, so you can focus on what matters. </p>
        </div>
        <div className="min-h-[180px] border px-3 border-slate-200 flex flex-col items-center relative rounded-md shadow-md md:flex-1">
          <div className="h-[4rem] w-[4rem] rounded-full flex gap-3 items-center justify-center absolute -top-10  bg-gradient-to-r from-orange-400 to-lime-500">
            <Command className="text-white" size={30} />
          </div>
          <h5 className="text-center text-base font-extrabold mt-7 font-sans text-slate-600">Real-time Syncing</h5>
          <p className="text-center text-sm font-sans font-semibold text-slate-500 tracking-tight"> Access your tasks anytime, anywhere. Taskifier syncs across all your devices, so you're always up to date whether you're on your phone, tablet, or computer. </p>
        </div>

      </div>
    </section>
  )
}

export default page