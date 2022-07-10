import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PathSequence } from '../../../app/modules/shared/utils/formatters/paths.formatter'

const stock = createSlice({
  name: 'pages',
  initialState: {
    title: 'FreeDrive',
    current: '/drive',
    pathSequence: [] as PathSequence[],
  },
  reducers: {
    setPage(
      state,
      action: PayloadAction<{
        title: string
        current: string
        pathSequence: PathSequence[]
      }>,
    ) {
      state.title = action.payload.title
      state.current = action.payload.current
      state.pathSequence = action.payload.pathSequence

      document.title = action.payload.title
    },
  },
})

export const { setPage } = stock.actions
export default stock.reducer
