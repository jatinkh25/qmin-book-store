import Link from 'next/link'

import UserNav from './userNav'
import { Icons } from '../icons'
import ToggleTheme from '../ui/toggleTheme'

export default function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/books">
          <h1 className="font-bold tracking-tight text-lg">Qmin Book Store</h1>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <ToggleTheme />
          <Link href="/cart">
            <Icons.cart />
          </Link>
          <UserNav />
        </div>
      </div>
    </div>
  )
}
