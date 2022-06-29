import { Schema, model } from 'mongoose';
import { IFile } from '../../file/models/file.model';
import { IUser } from '../../user/models/user.model';

interface IFolder {
  _id: string;
  userId: string;
  parentId: string;
  folderName: string;
  color: string;
  favorite: Boolean;
  deleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  user?: IUser;
  parent?: IFolder;
  children?: IFolder[];
  files?: IFile[];
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

const FolderModel = model<IFolder>('folders', folderSchema);

export { FolderModel };
export type { IFolder };
