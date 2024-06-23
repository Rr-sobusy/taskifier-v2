import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadatea:Metadata = {
  title : "Taskifier",
  description : "Manage your task at ease."
}

const page = () => {
  return (
    <section className="h-screen w-screen bg-gradient-to-r from-blue-100 to-indigo-50 px-5 md:px-14">
      <header className="h-[90px] flex justify-between items-center">
        <div className="flex items-center">
          <Image alt='' src="/icon.svg" width={50} height={50} />
          <h5 className="font-sans text-slate-700 text-2xl font-extrabold -ml-3">ask<span className="text-primary">ifier</span></h5>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-indigo-400"><Image className="mr-2" alt='' height={20} width={20} src="/google.svg" />Sign In with google</Button>
      </header>
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-evenly items-center">
        <div>
          <h1 className="font-customFont text-3xl md:text-5xl text-slate-600 font-extrabold tracking-tighter self-center justify-center place-self-center justify-self-center">All your task at one place. With ease.</h1>
          <h5 className="font-sans text-lg text-slate-00 max-w-xl mt-1">Keep all your tasks organized in one place, effortlessly. Taskifier offers a clean, intuitive interface to help you stay on top of your to-do list, whether it's for work, school, or personal projects.</h5>
        </div>
        <Image alt='' src="/tasks_image.png" height={350} width={350} />
      </div>
      <div className="flex gap-4 max-w-2xl mx-auto mt-5">
        <div className="h-[200px] border flex-1">rex</div>
        <div className="h-[200px] border flex-1">rex</div>
        <div className="h-[200px] border flex-1">rex</div>
      </div>

    </section>
  )
}

export default page