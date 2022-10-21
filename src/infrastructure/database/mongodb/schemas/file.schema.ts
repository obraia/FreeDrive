import { Schema, model } from 'mongoose'

const fileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'folders',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
      unique: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  },
)

fileSchema.virtual('parent', {
  ref: 'folders',
  localField: 'parentId',
  foreignField: '_id',
  justOne: true,
})

const FileEntity = model<FileDTO>('files', fileSchema)

export { FileEntity }
