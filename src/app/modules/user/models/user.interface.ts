interface IUser {
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

export { IUser }
