'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/useAppSelector'
import { addBookToCart } from '@/lib/cart'
import { Icons } from '@/components/icons'

interface AddToCartButtonProps {
  bookId: string
  bookName: string
  price: number
}

export default function AddToCartButton({ bookId, bookName, price }: AddToCartButtonProps) {
  const userId = useAppSelector((state) => state.user.user?.id)
  const [isLoading, setIsLoading] = useState(false)

  const handleBookAdd = async () => {
    try {
      setIsLoading(true)
      await addBookToCart({ userId: userId || '', bookId, bookName, price })
      setIsLoading(false)
      toast.success('Your book has been successfully added to cart')
    } catch (error: any) {
      setIsLoading(false)
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <Button onClick={handleBookAdd}>
      {isLoading ? (
        <>
          <Icons.spinner className="h-4 w-4 animate-spin" />
          <span className="pl-2">Adding...</span>
        </>
      ) : (
        <span>Add to Cart</span>
      )}
    </Button>
  )
}
