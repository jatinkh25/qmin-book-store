import { publicAPI } from '../utils/axios'

type LoginPayload = {
  email: string
  password: string
}

type SignupPayload = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const login = async (loginPayload: LoginPayload) => {
  try {
    const response = await publicAPI.post('/login', loginPayload)
    localStorage.setItem('access_token', response.data.access_token)

    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}

export const signup = async (signupPayload: SignupPayload) => {
  try {
    const response = await publicAPI.post('/signup', signupPayload)
    localStorage.setItem('access_token', response.data.access_token)

    return response.data
  } catch (error: any) {
    throw new Error(error.response.data.error)
  }
}
