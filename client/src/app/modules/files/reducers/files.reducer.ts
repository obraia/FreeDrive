import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IFileChild,
  IFolderChild,
} from '../../../../infrastructure/services/folder/interfaces'
import { ContextMenuItem } from '../../shared/components/layout/contextmenu'

export interface FilesState {
  files: IFileChild[]
  folders: IFolderChild[]
  selectedFiles: string[]
  selectedFolders: string[]
  contextMenuItems: ContextMenuItem[]
}

const initialState: FilesState = {
  files: [],
  folders: [],
  selectedFiles: [],
  selectedFolders: [],
  contextMenuItems: [],
}

const stock = createSlice({
  name: 'Files',
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<IFileChild[]>) => {
      state.files = action.payload
    },
    setFolders: (state, action: PayloadAction<IFolderChild[]>) => {
      state.folders = action.payload
    },
    addFiles: (state, action: PayloadAction<IFileChild[]>) => {
      state.files = [...state.files, ...action.payload]
    },
    addFolders: (state, action: PayloadAction<IFolderChild[]>) => {
      state.folders.push(...action.payload)
    },
    clearFiles: (state) => {
      state.files = []
    },
    clearFolders: (state) => {
      if (state.folders.length) {
        state.folders = []
      }
    },
    selectFiles(state, action: PayloadAction<{ ids: string[] }>) {
      state.selectedFiles = action.payload.ids
    },
    selectFolders(state, action: PayloadAction<{ ids: string[] }>) {
      state.selectedFolders = action.payload.ids
    },
    clearFilesSelection(state) {
      state.selectedFiles = []
    },
    clearFoldersSelection(state) {
      state.selectedFolders = []
    },
    clearAllSelections(state) {
      if (state.selectedFiles.length) {
        state.selectedFiles = []
      }
      if (state.selectedFolders.length) {
        state.selectedFolders = []
      }
      if (state.contextMenuItems.length) {
        state.contextMenuItems = []
      }
    },
    setContextMenuItems(state, action: PayloadAction<{ items: ContextMenuItem[] }>) {
      state.contextMenuItems = action.payload.items
    },
  },
})

export const {
  setFiles,
  setFolders,
  addFiles,
  addFolders,
  clearFiles,
  clearFolders,
  selectFiles,
  selectFolders,
  clearFilesSelection,
  clearFoldersSelection,
  clearAllSelections,
  setContextMenuItems,
} = stock.actions

export default stock.reducer
