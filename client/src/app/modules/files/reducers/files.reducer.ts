import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContextMenuItem } from '../../shared/components/layout_components/contextmenu';

export interface FilesState {
  selectedFiles: string[];
  selectedFolders: string[];
  contextMenuItems: ContextMenuItem[];
}

const initialState: FilesState = {
  selectedFiles: [],
  selectedFolders: [],
  contextMenuItems: [],
};

const stock = createSlice({
  name: 'Files',
  initialState,
  reducers: {
    selectFiles(state, action: PayloadAction<{ ids: string[] }>) {
      state.selectedFiles = action.payload.ids;
    },
    selectFolders(state, action: PayloadAction<{ ids: string[] }>) {
      state.selectedFolders = action.payload.ids;
    },
    clearFilesSelection(state) {
      state.selectedFiles = [];
    },
    clearFoldersSelection(state) {
      state.selectedFolders = [];
    },
    clearAllSelections(state) {
      if (state.selectedFiles.length > 0) {
        state.selectedFiles = [];
      }
      if (state.selectedFolders.length > 0) {
        state.selectedFolders = [];
      }
      if (state.contextMenuItems.length > 0) {
        state.contextMenuItems = [];
      }
    },
    setContextMenuItems(state, action: PayloadAction<{ items: ContextMenuItem[] }>) {
      state.contextMenuItems = action.payload.items;
    },
  },
});

export const {
  selectFiles,
  selectFolders,
  clearFilesSelection,
  clearFoldersSelection,
  clearAllSelections,
  setContextMenuItems,
} = stock.actions;

export default stock.reducer;
