export interface CurrentFolder {
  _id: string;
  userId: string;
  parentId: string;
  folderName: string;
  color?: any;
  favorite: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt?: any;
  deletedAt?: any;
  children: FolderChild[];
  files: FileChild[];
  parents: History[];
}

export interface FolderChild {
  _id: string;
  folderName: string;
  color?: any;
  favorite: boolean;
  deleted: boolean;
}

export interface FileChild {
  id: string;
  fileName: string;
  originalName: string;
  mimetype: string;
  favorite: boolean;
  deleted: boolean;
}

export interface History {
  _id: string;
  folderName: string;
}

export interface GetFoldersResponse {
  _id: string;
  userId: string;
  parentId: string;
  folderName: string;
  color?: any;
  favorite: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt?: any;
  deletedAt?: any;
}
