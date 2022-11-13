import { Schema, model } from 'mongoose'
import { FileDTO } from '../../../files/domain/entities/file.entity'
import { UserDTO } from '../../../users/domain/entities/user.entity'

interface FolderDTO {
  _id: string
  userId: string
  parentId: string
  folderName: string
  color: string | null
  favorite: Boolean
  deleted: Boolean
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
  user?: UserDTO
  parent?: FolderDTO
  children?: FolderDTO[]
  files?: FileDTO[]
}

const folderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'folders',
    },
    folderName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
    deletedAt: {
      type: Date,
    },
    allowDuplicate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  },
)

const FolderEntity = model<FolderDTO>('folders', folderSchema)

export { FolderEntity, FolderDTO }
