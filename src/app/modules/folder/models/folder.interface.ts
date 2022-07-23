import { IFile } from '../../file/models/file.interface'
import { IUser } from '../../user/models/user.interface'

interface IFolder {
  _id: string
  userId: string
  parentId: string
  folderName: string
  color: string
  favorite: Boolean
  deleted: Boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date

  user?: IUser
  parent?: IFolder
  children?: IFolder[]
  files?: IFile[]
}

export { IFolder }
