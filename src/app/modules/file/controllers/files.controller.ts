import { Request, Response } from 'express';
import { FsHelper } from '../../../utils/helpers/fs.helper';
import { httpStatusCode } from '../../../utils/helpers/httpStatus.helper';
import { FileRepository } from '../repositories/file.repository';

class FilesController {
  private _repository: FileRepository;

  constructor() {
    this._repository = new FileRepository();
  }

  public async find(req: Request, res: Response): Promise<Response | undefined> {
    const { query } = req;

    const params = {
      userId: query.userId ? String(query.userId) : undefined,
      parentId: query.parentId ? String(query.parentId) : undefined,
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
      const file = await this._repository.findById(id);
      return res.status(httpStatusCode.OK).json(file);
    } catch (e: any) {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: e.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<Response | undefined> {
    const { files, body } = req;

    try {
      if (files instanceof Array) {
        const mongoSchema = files.map((file) => ({
          fileName: file.filename,
          userId: body.userId,
          parentId: body.parentId,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          path: file.path,
        }));

        await this._repository.createMany(mongoSchema);

        return res.status(httpStatusCode.OK).json(mongoSchema);
      }
    } catch (e: any) {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: e.message,
      });
    }
  }
}

export { FilesController };
