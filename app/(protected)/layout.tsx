'use client'

import Header from '@/components/Header'
import { useAppSelector } from '@/hooks/useAppSelector'
import { redirect } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

export default function ProtectedRouteLayout({ children }: { children: ReactNode }) {
  const isUserSignedIn = useAppSelector((state) => state.user.isSignedIn)

  useEffect(() => {
    if (!isUserSignedIn) {
      redirect('/login')
    }
  }, [isUserSignedIn])

  return (
    <>
      <Header />
      {children}
    </>
  )
}
