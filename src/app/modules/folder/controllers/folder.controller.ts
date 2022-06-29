import { Response, Request } from 'express';
import { Types } from 'mongoose';
import { BaseController } from '../../shared/controllers/base.controller';
import { FolderRepository } from '../repositories/folder.repository';
import { IFolder } from '../models/folder.model';
import { BadRequestException } from '../../shared/exceptions/badRequest.exception';
import { NotfoundException } from '../../shared/exceptions/notfound.exception';

class FolderController extends BaseController<IFolder> {
  constructor() {
    super(new FolderRepository());
  }

  async findDeepById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid id');
      }

      const [result] = await this.repository.findDeepById(id);

      if (!result) {
        throw new NotfoundException('Folder not found');
      }

      return this.sendSuccess(res, result);
    } catch (error: any) {
      this.sendError(res, error);
    }
  }
}

export { FolderController };
