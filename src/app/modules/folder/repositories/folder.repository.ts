import { Types } from 'mongoose'
import { BaseRepository } from '../../shared/repositories/base.repository'
import { FolderModel } from '../models/folder.model'
import { IFolder } from '../models/folder.interface'

class FolderRepository extends BaseRepository<IFolder> {
  constructor() {
    super(FolderModel)
  }

  async findDeepById(id: string, params: any): Promise<any> {
    return this.model.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'files',
          let: { folderId: '$_id' },
          pipeline: [
            {
              $match: {
                ...params,
                $expr: { $eq: ['$parentId', '$$folderId'] },
              },
            },
          ],
          as: 'files',
        },
      },
      {
        $lookup: {
          from: 'folders',
          let: { folderId: '$_id' },
          pipeline: [
            {
              $match: {
                ...params,
                $expr: { $eq: ['$parentId', '$$folderId'] },
              },
            },
          ],
          as: 'children',
        },
      },
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
    ])
  }

  async findDeepChildren(ids: Types.ObjectId[]): Promise<any> {
    return this.model.aggregate([
      { $match: { _id: { $in: ids } } },
      {
        $lookup: {
          from: 'folders',
          let: { folderId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$parentId', '$$folderId'] },
                deleted: false,
              },
            },
            { $project: { _id: 1, folderName: 1 } },
          ],
          as: 'children',
        },
      },
      {
        $lookup: {
          from: 'files',
          let: { folderId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$parentId', '$$folderId'] },
                deleted: false,
              },
            },
            { $project: { originalName: 1, mimetype: 1, path: 1 } },
          ],
          as: 'files',
        },
      },
      { $project: { folderName: 1, children: 1, files: 1 } },
    ])
  }

  async move(ids: string[], parentId: string) {
    return await this.model.updateMany({ _id: { $in: ids } }, { $set: { parentId } })
  }

  async rename(id: string, folderName: string) {
    return await this.model.updateOne({ _id: id }, { $set: { folderName } })
  }

  async favorite(ids: string[], favorite: boolean) {
    return await this.model.updateMany({ _id: { $in: ids } }, [
      { $set: { favorite } },
    ])
  }

  async moveToTrash(ids: string[]) {
    return await this.model.updateMany(
      { _id: { $in: ids } },
      { $set: { deleted: true } },
    )
  }
}

export { FolderRepository }
