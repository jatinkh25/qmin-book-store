'use client'

import { ReactNode, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { updateUserState } from '@/store/slices/userSlice'
import { User } from '@/utils/types'

export default function AuthCheckProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()

  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('access_token')

    if (accessToken == null) {
      dispatch(updateUserState({ isSignedIn: false, user: null }))
    } else {
      const account: User = jwt_decode(accessToken)
      dispatch(updateUserState({ isSignedIn: true, user: account }))
    }
  }

  return <>{children}</>
}
