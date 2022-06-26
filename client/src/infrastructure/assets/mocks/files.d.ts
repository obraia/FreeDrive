export interface Root extends Array<File> {}

export interface File {
  id: number;
  name: string;
  type: string;
  size: number;
  createdAt: string;
  modifiedAt: string | null;
  deletedAt: string | null;
  url: string;
  isFavorite: boolean;
  isDeleted: boolean;
}
