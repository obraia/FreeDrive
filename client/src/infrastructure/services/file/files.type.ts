export interface GetFilesResponse {
  id: string;
  userId: string;
  parentId: string;
  fileName: string;
  originalName: string;
  size: number;
  mimetype: string;
  path: string;
  favorite: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt?: any;
  deletedAt?: any;
}
