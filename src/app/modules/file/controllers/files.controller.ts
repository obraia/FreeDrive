import { Request, Response } from 'express';
import { BaseController } from '../../shared/controllers/base.controller';
import { FileRepository } from '../repositories/file.repository';
import { BadRequestException } from '../../shared/exceptions/badRequest.exception';
import { IFile } from '../models/file.model';

class FilesController extends BaseController<IFile> {
  constructor() {
    super(new FileRepository());
  }

  public override async create(req: Request, res: Response): Promise<Response | undefined> {
    const { files, body } = req;

    try {
      if (!(files instanceof Array)) {
        throw new BadRequestException('Invalid files');
      }

      const mongoSchema = files.map((file) => ({
        fileName: file.filename,
        userId: body.userId,
        parentId: body.parentId,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path,
        favorite: false,
        deleted: false,
        createdAt: new Date(),
      }));

      const result = await this.repository.create(mongoSchema);
      return this.sendCreated(res, result);
    } catch (e: any) {
      this.sendError(res, e);
    }
  }
}

export { FilesController };
