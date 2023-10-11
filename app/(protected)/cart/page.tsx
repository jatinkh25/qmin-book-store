'use client'

import useSWR from 'swr'
import Link from 'next/link'
import { toast } from 'sonner'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteCartBook, getCartBooks } from '@/lib/cart'
import { useAppSelector } from '@/hooks/useAppSelector'
import { Icons } from '@/components/icons'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const EmptyCart = () => {
  return (
    <div className="min-h-visible flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl sm:text-4xl pb-4">Your cart is Empty</h1>
      <Link
        href="/books"
        className="rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
      >
        Add some books
      </Link>
    </div>
  )
}

export default function Cart() {
  const userId = useAppSelector((state) => state.user.user?.id)

  const {
    data: cartBooks,
    isLoading,
    mutate,
  } = useSWR(`/cart/${userId}`, () => getCartBooks(userId || ''))

  const handleBookDelete = async (bookId: string) => {
    try {
      await deleteCartBook({ userId: userId || '', bookId })
      mutate()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  if (!isLoading && (cartBooks == null || cartBooks.length == 0)) {
    return <EmptyCart />
  }

  const totalPrice =
    cartBooks?.reduce((acc, curr) => {
      return acc + curr.price
    }, 0) || 0

  return (
    <div className="flex-1 space-y-4 p-4 pt-3 sm:p-8 sm:pt-6 w-full min-h-visible">
      <div className="flex items-center justify-between space-y-2 w-full">
        <h2 className="text-3xl font-bold tracking-tight">Cart</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="pb-8 col-span-full lg:col-start-1 lg:col-end-3">
          <Table className="w-full lg:max-w-lg">
            <TableHeader>
              <TableRow>
                <TableHead>Book Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cartBooks?.map((book) => {
                return (
                  <TableRow key={book._id}>
                    <TableCell className="font-medium">
                      <Link href={`/books/${book._id}`} className="w-full">
                        {book.bookName}
                      </Link>
                    </TableCell>
                    <TableCell>{book.price}</TableCell>
                    <TableCell>
                      <Icons.delete
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => handleBookDelete(book._id)}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        <div className="col-span-full lg:col-start-3 lg:col-end-4">
          <Card className="">
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
              <CardTitle className="text-lg font-bold text-center ">Proceed to Checkout</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between items-center">
                <span>Sub Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span>Taxes:</span>
                <span>${(totalPrice * 0.3).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span>Total Amount:</span>
                <span>${(totalPrice * 1.3).toFixed(2)}</span>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              <Button className="w-full">Confirm Order</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
