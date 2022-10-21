import { Schema, model } from 'mongoose'
import { hash } from 'bcrypt'
import { FolderEntity } from '../../../folders/domain/entities/folder.entity'
import { FileEntity } from '../../../files/domain/entities/file.entity'

interface UserDTO {
  id?: string
  name: string
  username: string
  email: string
  password: string
  role?: 'admin' | 'user'
  deleted?: Boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  driveFolderId?: string
  staticFolderId?: string
}

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
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
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
  const user = this as UserDTO
  const { AUTH_SALT_ROUNDS } = process.env

  const driveFolder = await FolderEntity.create({
    userId: user.id,
    parentId: null,
    allowDuplicate: true,
    folderName: 'Meu Drive',
  })

  const staticFolder = await FolderEntity.create({
    userId: user.id,
    parentId: null,
    folderName: 'Arquivos estáticos',
  })

  user.driveFolderId = driveFolder.id
  user.staticFolderId = staticFolder.id
  user.password = await hash(user.password, Number(AUTH_SALT_ROUNDS))

  next()
})

userSchema.pre('remove', async function (next) {
  const user = this as UserDTO
  FolderEntity.deleteMany({ userId: user.id })
  FileEntity.deleteMany({ userId: user.id })
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

const UserEntity = model<UserDTO>('users', userSchema)

export { UserEntity, UserDTO }
