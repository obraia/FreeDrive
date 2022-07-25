import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../services/user/interfaces'

export interface IAuthState {
  user: IUser | null
  token: string | null
}

const stock = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: '',
  } as IAuthState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    logout(state) {
      state.user = null
      state.token = ''
    },
  },
})

export const { setUser, setToken, logout } = stock.actions
export default stock.reducer
