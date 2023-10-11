import { privateAPI } from '@/utils/axios'
import { Book, CartBook } from '@/utils/types'

type AddBookPayload = {
  userId: string
  bookId: string
  bookName: string
  price: number
}

type DeleteCartBookPayload = {
  userId: string
  bookId: string
}

export const addBookToCart = async (addBookPayload: AddBookPayload) => {
  try {
    const response = await privateAPI.post(`/cart`, addBookPayload)
    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}

export const getCartBooks = async (userId: string) => {
  try {
    const response = await privateAPI.get(`/cart/${userId}`)
    return response.data.books as CartBook[]
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}

export const deleteCartBook = async ({ userId, bookId }: DeleteCartBookPayload) => {
  try {
    const response = await privateAPI.delete(`/cart/${userId}/${bookId}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
