export interface CurrentFolder {
  id: string;
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
  history: History[];
}

export interface FolderChild {
  id: string;
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
  id: string;
  folderName: string;
}

export interface GetFoldersResponse {
  id: string;
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
