import { Types } from 'mongoose'
import { IFolder } from '../../folder/models/folder.interface'
import { IUser } from '../../user/models/user.interface'

interface IFile {
  _id?: Types.ObjectId
  userId: string
  parentId: string
  fileName: string
  originalName: string
  size: number
  mimetype: string
  path: string
  favorite: Boolean
  deleted: Boolean
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date

  user?: IUser
  parent?: IFolder
}

export { IFile }
