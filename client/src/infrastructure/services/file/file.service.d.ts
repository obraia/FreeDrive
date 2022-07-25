export interface IFile {
  id: string
  userId: string
  parentId: string
  fileName: string
  originalName: string
  size: number
  mimetype: string
  path: string
  favorite: boolean
  deleted: boolean
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IGetFilesParams {
  parentId?: string
  favorite?: boolean
  deleted?: boolean
  limit: number
  page: number
}

export interface IGetFilesResponse extends Array<IFile> {}

export interface IUploadFileResponse extends Array<IFile> {}

export interface IDownloadFileResponse {
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
