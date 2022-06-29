import { BaseRepository } from '../../shared/repositories/base.repository';
import { FileModel, IFile } from '../models/file.model';

class FileRepository extends BaseRepository<IFile> {
  constructor() {
    super(FileModel);
  }

  async move(ids: string[], parentId: string) {
    return await this.model.update({
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
}

export { FileRepository };
