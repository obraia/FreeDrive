export interface IFolder {
  _id: string
  userId: string
  parentId: string
  folderName: string
  color?: any
  favorite: boolean
  deleted: boolean
  createdAt: Date
  updatedAt?: any
  deletedAt?: any
  children: IFolderChild[]
  files: IFileChild[]
  parents: IFolderParent[]
}

export interface IFolderChild {
  _id: string
  folderName: string
  color?: any
  favorite: boolean
  deleted: boolean
}

export interface IFileChild {
  _id: string
  fileName: string
  originalName: string
  mimetype: string
  favorite: boolean
  deleted: boolean
}

export interface IFolderParent {
  _id: string
  folderName: string
  depth: number
}
