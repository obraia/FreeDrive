import { Types } from 'mongoose'
import { BaseRepository } from '../../../shared/repositories/base.repository'
import { FolderEntity, FolderDTO } from '../../domain/entities/folder.entity'

class FolderRepository extends BaseRepository<FolderDTO> {
  constructor() {
    super(FolderEntity)
  }

  async findWithParents(params: { id: string; userId: string }): Promise<FolderDTO[]> {
    return this.model.aggregate([
      { $match: { _id: new Types.ObjectId(params.id), userId: new Types.ObjectId(params.userId) } },
      {
        $graphLookup: {
          from: 'folders',
          startWith: '$parentId',
          connectFromField: 'parentId',
          connectToField: '_id',
          as: 'parents',
          depthField: 'depth',
        },
      },
      {
        $project: {
          _id: 1,
          id: '$_id',
          folderName: 1,
          allowDuplicate: 1,
          parents: {
            _id: 1,
            id: '$_id',
            folderName: 1,
          }
        }
      },
    ]).exec()
  }
  async findRecusive(params: { ids: string[]; userId: string }) {
    return this.model.aggregate([
      { $match: { _id: { $in: params.ids.map((id) => new Types.ObjectId(id)) } } },
      {
        $graphLookup: {
          from: 'folders',
          startWith: '$_id',
          connectFromField: '_id',
          connectToField: 'parentId',
          as: 'children',
          depthField: 'depth',
        },
      },
    ])
  }

  async copy(file: FolderDTO[], parentId: string) {
    return await this.model.create(
      file.map((f) => ({
        ...f,
        parentId,
        _id: undefined,
      })),
    )
  }

  async rename(params: { id: string; userId: string; folderName: string }) {
    return await this.model.updateOne(
      { _id: params.id, userId: params.userId },
      { $set: { folderName: params.folderName } },
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

export { FolderRepository }
