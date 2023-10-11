'use client'

import { ReactNode, useEffect } from 'react'

import { useAppSelector } from '@/hooks/useAppSelector'
import { redirect } from 'next/navigation'
import ToggleTheme from '@/components/ui/toggleTheme'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const isUserSignedIn = useAppSelector((state) => state.user.isSignedIn)

  useEffect(() => {
    if (isUserSignedIn) redirect('/books')
  }, [isUserSignedIn])

  return (
    <>
      <div className="container relative mt-8 lg:mt-0 min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <ToggleTheme />
        </div>
        <div className="relative hidden h-full flex-col p-10 text-primary border-r lg:flex lg:items-center lg:justify-center">
          <div className="space-y-2">
            <h1 className="text-3xl text-center font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-gray-900 dark:from-white dark:to-gray-500 ">
              Revolutionize Your Books Experience
            </h1>
            <p className="max-w-[600px] pt-4 md:text-xl text-center text-zinc-500 dark:text-zinc-100 mx-auto">
              Join us and get into the world of Books.
            </p>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}
