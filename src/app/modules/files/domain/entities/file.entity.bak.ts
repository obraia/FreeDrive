import mime from 'mime-types'
import { FolderDTO } from '../../../folders/domain/entities/folder.entity'
import { UserDTO } from '../../../users/domain/entities/user.entity'

interface FileDTO {
  id?: string
  userId: string
  parentId: string
  fileName: string
  originalName: string
  size: number
  mimetype: string
  path: string
  favorite: Boolean
  deleted: Boolean
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
  user?: UserDTO
  parent?: FolderDTO
}

interface CreateFileParams {
  fileName: string
  userId: string
  parentId: string
  originalName: string
  size: number
  mimetype: string
  path: string
}

class File {
  private readonly fileName: string
  private readonly userId: string
  private readonly parentId: string
  private originalName: string
  private readonly size: number
  private readonly mimetype: string
  private readonly path: string
  private favorited: Boolean
  private deleted: Boolean
  private readonly createdAt: Date
  private updatedAt: Date | null
  private deletedAt: Date | null

  constructor(params: CreateFileParams) {
    this.fileName = params.fileName
    this.userId = params.userId
    this.parentId = params.parentId
    this.originalName = params.originalName
    this.size = params.size
    this.mimetype = params.mimetype
    this.path = params.path
    this.favorited = false
    this.deleted = false
    this.createdAt = new Date()
    this.updatedAt = null
    this.deletedAt = null
  }

  get originalNameWithExtension() {
    return `${this.originalName}.${mime.extension(this.mimetype)}`
  }

  rename(originalName: string) {
    this.originalName = originalName
  }

  favorite() {
    this.favorited = true
  }

  unfavorite() {
    this.favorited = false
  }

  delete() {
    this.deleted = true
    this.deletedAt = new Date()
  }

  restore() {
    this.deleted = false
    this.deletedAt = null
  }

  update() {
    this.updatedAt = new Date()
  }
}


export { File, FileDTO }
