import { publicAPI } from '@/utils/axios'
import { Book } from '@/utils/types'

export const getBooks = async () => {
  try {
    const response = await publicAPI.get('/books')
    return response.data.books as Book[]
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}

export const getBookDetails = async (bookId: string) => {
  try {
    const response = await publicAPI.get(`/books/${bookId}`)
    return response.data.book as Book
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
