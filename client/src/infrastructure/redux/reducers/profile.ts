import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../services/user/interfaces'

const stock = createSlice({
  name: 'auth',
  initialState: {
    user: {} as IUser,
    token: '',
  },
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
  },
})

export const { setUser } = stock.actions
export default stock.reducer
