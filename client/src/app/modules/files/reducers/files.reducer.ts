import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFile } from '../../../../infrastructure/services/file/file.service.d'
import { IFolder } from '../../../../infrastructure/services/folder/folder.service.d'
import { ContextMenuItem } from '../../shared/components/layout/contextmenu'

export interface FilesState {
  files: IFile[]
  folders: IFolder[]
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
    setFiles: (state, action: PayloadAction<IFile[]>) => {
      state.files = action.payload
    },
    setFolders: (state, action: PayloadAction<IFolder[]>) => {
      state.folders = action.payload
    },
    addFiles: (state, action: PayloadAction<IFile[]>) => {
      state.files.push(...action.payload)
    },
    addFolders: (state, action: PayloadAction<IFolder[]>) => {
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
