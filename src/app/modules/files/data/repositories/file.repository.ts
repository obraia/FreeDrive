import { BaseRepository } from '../../../shared/repositories/base.repository'
import { FileEntity, FileDTO } from '../../domain/entities/file.entity'

class FileRepository extends BaseRepository<FileDTO> {
  constructor() {
    super(FileEntity)
  }

  async findToDownload(params: { id: string; userId: string }) {
    return this.model.findOne(
      {
        _id: params.id,
        userId: params.userId,
      },
    ).select(['path', 'originalName', 'mimetype'])
  }

  findManyToDownload(params: { ids: string[]; userId: string }) {
    return this.model.find(
      {
        _id: { $in: params.ids },
        userId: params.userId,
      },
    ).select(['path', 'originalName', 'mimetype'])
  }

  async copy(file: FileDTO[], parentId: string) {
    return await this.model.create(
      file.map((f) => ({
        ...f,
        parentId,
        _id: undefined,
      })),
    )
  }

  async rename(params: { id: string; userId: string; originalName: string }) {
    return await this.model.updateOne(
      { _id: params.id, userId: params.userId },
      { $set: { originalName: params.originalName } },
    )
  }

  async favorite(params: { ids: string[]; userId: string; favorite: boolean }) {
    return await this.model.updateMany(
      { _id: { $in: params.ids }, userId: params.userId },
      [{ $set: { favorite: params.favorite } }],
    )
  }

  async delete(params: { ids: string[]; userId: string }) {
    return await this.model.deleteMany({
      _id: { $in: params.ids },
      userId: params.userId,
    })
  }

  async move(params: { ids: string[]; userId: string; parentId: string }) {
    return await this.model.updateMany(
      { _id: { $in: params.ids }, userId: params.userId },
      { $set: { parentId: params.parentId } },
    )
  }

  async moveToTrash(params: { ids: string[]; userId: string }) {
    return await this.model.updateMany(
      { _id: { $in: params.ids }, userId: params.userId },
      { $set: { deleted: true } },
    )
  }

  async deleteByNames(names: string[], parentId: string) {
    return await this.model.deleteMany({
      originalName: { $in: names },
      parentId,
    })
  }
}

export { FileRepository }
