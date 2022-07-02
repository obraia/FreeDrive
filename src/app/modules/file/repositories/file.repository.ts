import { Types } from 'mongoose';
import { BaseRepository } from '../../shared/repositories/base.repository';
import { FileModel, IFile } from '../models/file.model';

class FileRepository extends BaseRepository<IFile> {
  constructor() {
    super(FileModel);
  }

  async findParent(parentId: string) {
    return this.model.findOne({ parentId: new Types.ObjectId(parentId) }).populate('parent');
  }

  async move(ids: string[], parentId: string) {
    return await this.model.updateMany({
      where: {
        _id: {
          $in: ids,
        },
      },
      data: { parentId },
    });
  }

  async copy(file: IFile[], parentId: string) {
    return await this.model.create(
      file.map((f) => ({
        ...f,
        parentId,
        _id: undefined,
      }))
    );
  }

  async favorite(ids: string[], favorite: boolean) {
    return await this.model.updateMany({ _id: { $in: ids } }, [{ $set: { favorite } }]);
  }

  async moveToTrash(ids: string[]) {
    return await this.model.updateMany({ _id: { $in: ids } }, { $set: { deleted: true } });
  }
}

export { FileRepository };
