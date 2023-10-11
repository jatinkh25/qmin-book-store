import { UpdateUserStatePayload, User } from '@/utils/types'
import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  isSignedIn: boolean
  user: User | null
  isUserLoading: boolean
}

const initialState: UserState = {
  isSignedIn: false,
  user: null,
  isUserLoading: false,
}

const cartSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserState(state, action: { type: string; payload: UpdateUserStatePayload }) {
      const newState = { ...state, ...action.payload }
      state.isSignedIn = newState.isSignedIn
      state.user = newState.user
    },
    setIsUserLoading(state, action: { type: string; payload: boolean }) {
      state.isUserLoading = action.payload
    },
    clearUserState: (state) => {
      state.isSignedIn = false
      state.user = null
      localStorage.removeItem('access_token')
    },
  },
})

export const { updateUserState, setIsUserLoading, clearUserState } = cartSlice.actions
export default cartSlice.reducer
