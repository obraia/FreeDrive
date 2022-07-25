import { Schema, model } from 'mongoose'
import { IAuth } from './auth.interface'

const authSchema = new Schema(
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  },
)

const UserModel = model<IAuth>('auths', authSchema)

export { UserModel }
