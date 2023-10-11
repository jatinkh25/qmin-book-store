import axios from 'axios'
import { SERVER_URL } from './constants'

const publicAPI = axios.create({
  baseURL: SERVER_URL,
})

const privateAPI = axios.create({
  baseURL: SERVER_URL,
})

privateAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
  return newConfig
})

export { publicAPI, privateAPI }
