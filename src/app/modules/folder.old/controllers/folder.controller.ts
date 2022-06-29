import { Request, Response } from 'express';
import { FsHelper } from '../../../utils/helpers/fs.helper';
import { httpStatusCode } from '../../../utils/helpers/httpStatus.helper';
import { FolderRepository } from '../repositories/folder.repository';

class FolderController {
  private _repository: FolderRepository;

  constructor() {
    this._repository = new FolderRepository();
  }

  public async find(req: Request, res: Response): Promise<Response | undefined> {
    const { query } = req;

    const params = {
      userId: query.userId ? String(query.userId) : undefined,
      parentId: query.parentId ? String(query.parentId) : undefined,
      favorite: query.favorite ? query.favorite === 'true' : undefined,
      deleted: query.deleted ? query.deleted === 'true' : undefined,
    };

    try {
      const file = await this._repository.find(params);
      return res.status(httpStatusCode.OK).json(file);
    } catch (e: any) {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: e.message,
      });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;

    try {
      const folder = await this._repository.findById(id);

      const response = {
        ...folder,
        history: [] as any,
        parent: undefined,
      };

      if (folder?.parent) {
        const history = await this._repository.findHistory(folder.parent.id);
        if (history) response.history.push(folder.parent, ...history);
      }

      return res.status(httpStatusCode.OK).json(response);
    } catch (e: any) {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: e.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<Response | undefined> {
    const { body } = req;

    try {
      const mongoSchema = {
        folderName: body.folderName,
        userId: body.userId,
        parentId: body.parentId,
      };

      await this._repository.create(mongoSchema);

      return res.status(httpStatusCode.OK).json({ message: 'Folder created successfully' });
    } catch (e: any) {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: e.message,
      });
    }
  }

  public async getDiskSpace(req: Request, res: Response): Promise<void> {
    try {
      const disk = await FsHelper.getDiskSpace();
      res.status(httpStatusCode.OK).json(disk);
    } catch (e: any) {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: e.message,
      });
    }
  }
}

export { FolderController };
