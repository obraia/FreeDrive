import { Schema, model } from 'mongoose'
import { IFolder } from './folder.interface'

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

const FolderModel = model<IFolder>('folders', folderSchema)

export { FolderModel }
