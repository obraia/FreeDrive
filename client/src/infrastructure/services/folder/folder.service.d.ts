import { IFile } from '../file/files.service'

export interface IFolder {
  id: string
  userId: string
  parentId: string
  folderName: string
  color?: string
  favorite: boolean
  deleted: boolean
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IFolderDeep extends IFolder {
  _id: string
  children: IFolder[]
  files: IFile[]
  parents: (IFolder & { _id: string; depth: number })[]
}

export interface IGetFoldersParams {
  parentId?: string
  favorite?: boolean
  deleted?: boolean
  limit?: number
  page?: number
}

export interface IGetFoldersResponse extends Array<IFolder> {}

export interface IGetFolderByIdResponse extends IFolderDeep {}

export interface ICreateFolderResponse extends IFolder {}

export interface IUploadFolderResponse extends Array<IFolder> {}

export interface IDownloadFolderResponse {
  data: any
  originalName: string
}

export interface IFavoriteResponse {
  acknowledged: Boolean
  matchedCount: number
  modifiedCount: number
}

export interface IMoveToTrashResponse {
  acknowledged: Boolean
  matchedCount: number
  modifiedCount: number
}

export interface IRenameResponse {
  acknowledged: Boolean
  matchedCount: number
  modifiedCount: number
}

export interface IMoveResponse {
  acknowledged: Boolean
  matchedCount: number
  modifiedCount: number
}

export interface IDeleteResponse {
  acknowledged: Boolean
  matchedCount: number
  modifiedCount: number
}
