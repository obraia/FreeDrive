import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const stock = createSlice({
  name: 'pages',
  initialState: {
    title: 'FreeDrive',
    headerTitle: 'Início',
  },
  reducers: {
    setPage(
      state,
      action: PayloadAction<{
        title: string;
        headerTitle: string;
      }>
    ) {
      state.title = action.payload.title;
      state.headerTitle = action.payload.headerTitle;

      document.title = action.payload.title;
    },
  },
});

export const { setPage } = stock.actions;
export default stock.reducer;
