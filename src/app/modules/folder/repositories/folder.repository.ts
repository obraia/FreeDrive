import { Types } from 'mongoose';
import { BaseRepository } from '../../shared/repositories/base.repository';
import { FolderModel, IFolder } from '../models/folder.model';

class FolderRepository extends BaseRepository<IFolder> {
  constructor() {
    super(FolderModel);
  }

  async findDeepById(id: string): Promise<any> {
    return this.model.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      { $lookup: { from: 'files', localField: '_id', foreignField: 'parentId', as: 'files' } },
      { $lookup: { from: 'folders', localField: '_id', foreignField: 'parentId', as: 'children' } },
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
    ]);
  }
}

export { FolderRepository };
