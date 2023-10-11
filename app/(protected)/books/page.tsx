import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getBooks } from '@/lib/books'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import Link from 'next/link'

export default async function Books() {
  const books = await getBooks()

  return (
    <div className="flex-1 space-y-4 p-4 pt-3 sm:p-8 sm:pt-6 w-full">
      <div className="flex items-center justify-between space-y-2 w-full">
        <h2 className="text-3xl font-bold tracking-tight">Books</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book) => {
          return (
            <Card key={book.id} className="w-visible sm:w-auto">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">{book.name}</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-sm italic truncate">{book.description}</div>
              </CardContent>

              <CardFooter className="flex justify-between items-center">
                <span>${book.price}</span>
                <Link
                  href={`/books/${book.id}`}
                  className="rounded-md text-sm font-medium bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                >
                  View Details
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
