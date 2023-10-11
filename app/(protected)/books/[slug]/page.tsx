import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getBookDetails } from '@/lib/books'
import DateTooltip from './dateTooltip'
import AddToCartButton from './addToCartButton'

interface BookDetailsProps {
  params: {
    slug: string
  }
}

export default async function BookDetails({ params }: BookDetailsProps) {
  const book = await getBookDetails(params.slug)

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6 w-full min-h-visible">
      <div className="flex items-center justify-between space-y-2 w-full">
        <h2 className="text-3xl font-bold tracking-tight">Book Details</h2>
      </div>

      <div className="min-h-visible-book flex items-center justify-center">
        <Card className="w-full sm:max-w-md">
          <CardHeader className="flex gap-2 flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">{book.name}</CardTitle>
            <DateTooltip content={book.datePublished} />
          </CardHeader>

          <CardContent>
            <div className="text-sm italic">{book.description}</div>
          </CardContent>

          <CardFooter className="flex justify-between items-center">
            <span>${book.price}</span>
            <AddToCartButton bookName={book.name} bookId={book.id} price={book.price} />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
