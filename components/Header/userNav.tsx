'use client'

import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownMenu'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { clearUserState } from '@/store/slices/userSlice'
import { useEffect, useState } from 'react'

export default function UserNav() {
  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isClientSide, setIsClientSide] = useState(false)

  const avatarFallback = user && user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()

  useEffect(() => {
    setIsClientSide(true)
  }, [])

  const handleLogout = () => {
    dispatch(clearUserState())
    router.push('/login')
  }

  if (!isClientSide) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{`${user?.firstName} ${user?.lastName}`}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
