import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HomeState {
  selectedFiles: number[];
  selectedFolders: number[];
}

const initialState: HomeState = {
  selectedFiles: [],
  selectedFolders: [],
};

const stock = createSlice({
  name: 'Home',
  initialState,
  reducers: {
    selectFiles(state, action: PayloadAction<{ ids: number[] }>) {
      state.selectedFiles = action.payload.ids;
    },
    selectFolders(state, action: PayloadAction<{ ids: number[] }>) {
      state.selectedFolders = action.payload.ids;
    },
    clearFilesSelection(state) {
      state.selectedFiles = [];
    },
    clearFoldersSelection(state) {
      state.selectedFolders = [];
    },
    clearAllSelections(state) {
      state.selectedFolders = [];
      state.selectedFiles = [];
    },
  },
});

export const { selectFiles, selectFolders, clearFilesSelection, clearFoldersSelection, clearAllSelections } =
  stock.actions;

export default stock.reducer;
