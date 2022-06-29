import { Schema, model } from 'mongoose';
import { IFolder } from '../../folder/models/folder.model';
import { IUser } from '../../user/models/user.model';

interface IFile {
  _id: string;
  userId: string;
  parentId: string;
  fileName: string;
  originalName: string;
  size: number;
  mimetype: string;
  path: string;
  favorite: Boolean;
  deleted: Boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  user?: IUser;
  parent?: IFolder;
}

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
  }
);

const FileModel = model<IFile>('files', fileSchema);

export { FileModel };
export type { IFile };
