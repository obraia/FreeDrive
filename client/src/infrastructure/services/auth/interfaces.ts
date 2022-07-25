export interface IUser {
  id: string
  name: string
  username: string
  email: string
  password: string
  deleted: boolean
  createdAt: Date
  updatedAt: Date
  driveFolder: DriveFolder
  staticFolder: StaticFolder
}

export interface DriveFolder {
  id: string
  userId: string
  parentId: string | null
  folderName: string
  favorite: boolean
  deleted: boolean
  allowDuplicate: boolean
  createdAt: Date
  updatedAt: Date
}

export interface StaticFolder {
  id: string
  userId: string
  parentId: string | null
  folderName: string
  favorite: boolean
  deleted: boolean
  allowDuplicate: boolean
  createdAt: Date
  updatedAt: Date
}
