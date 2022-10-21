import { Schema, model } from 'mongoose'

interface SessionDTO {
  id: string
  name: string
  username: string
  email: string
  password: string
  deleted: Boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  driveFolderId?: string
  staticFolderId?: string
}

const sessionSchema = new Schema(
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

const SessionEntity = model<SessionDTO>('sessions', sessionSchema)

export { SessionEntity, SessionDTO }
