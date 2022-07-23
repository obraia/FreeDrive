import { Schema, model } from 'mongoose'
import { FolderModel } from '../../folder/models/folder.model'
import { FileModel } from '../../file/models/file.model'
import { IUser } from './user.interface'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
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
    driveFolderId: {
      type: Schema.Types.ObjectId,
      ref: 'folders',
    },
    staticFolderId: {
      type: Schema.Types.ObjectId,
      ref: 'folders',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  },
)

userSchema.pre('save', async function (next) {
  const user = this as IUser

  const driveFolder = await FolderModel.create({
    userId: user.id,
    parentId: null,
    folderName: 'Meu Drive',
  })

  const staticFolder = await FolderModel.create({
    userId: user.id,
    parentId: null,
    folderName: 'Arquivos estáticos',
  })

  user.driveFolderId = driveFolder.id
  user.staticFolderId = staticFolder.id

  next()
})

userSchema.pre('remove', async function (next) {
  const user = this as IUser

  FolderModel.deleteMany({ userId: user.id })
  FileModel.deleteMany({ userId: user.id })
})

userSchema.virtual('driveFolder', {
  ref: 'folders',
  localField: 'driveFolderId',
  foreignField: '_id',
  justOne: true,
})

userSchema.virtual('staticFolder', {
  ref: 'folders',
  localField: 'staticFolderId',
  foreignField: '_id',
  justOne: true,
})

const UserModel = model<IUser>('users', userSchema)

export { UserModel }
