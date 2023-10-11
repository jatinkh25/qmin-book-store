export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface UpdateUserStatePayload {
  isSignedIn: boolean
  user: User | null
}

export type Book = {
  id: string
  name: string
  description: string
  datePublished: string
  price: number
}

export type CartBook = {
  _id: string
  bookName: string
  price: number
}
