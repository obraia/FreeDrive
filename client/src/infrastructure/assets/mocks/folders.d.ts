export interface Root extends Array<Folder> {}

export interface Folder {
  id: number;
  name: string;
  size: number;
  createdAt: string;
  modifiedAt: string | null;
  deletedAt: string | null;
  color: string | null;
  isFavorite: boolean;
  isDeleted: boolean;
}
