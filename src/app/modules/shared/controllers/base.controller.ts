import { Response, Request } from 'express';
import { FilterQuery, Types } from 'mongoose';
import { BadRequestException } from '../exceptions/badRequest.exception';
import { NotfoundException } from '../exceptions/notfound.exception';
import { StatusException } from '../exceptions/status.exception';
import { httpStatusCode } from '../helpers/httpStatus.helper';
import { BaseRepository } from '../repositories/base.repository';

class BaseController<T> {
  constructor(protected repository: BaseRepository<T>) {}

  public async find(req: Request, res: Response) {
    const { query } = req;

    try {
      const result = await this.repository.findAll(query as FilterQuery<T>);
      return this.sendSuccess(res, result);
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid id');
      }

      const result = await this.repository.findById(id);

      if (!result) {
        throw new NotfoundException('Not found');
      }

      return this.sendSuccess(res, result);
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    const { body } = req;

    try {
      const result = await this.repository.create(body);
      return this.sendCreated(res, result);
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid id');
      }

      const result = await this.repository.update(id, req.body);

      if (!result) {
        throw new NotfoundException('Not found');
      }

      return this.sendSuccess(res, result);
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid id');
      }

      const result = await this.repository.delete(id);

      if (!result) {
        throw new NotfoundException('Not found');
      }

      return this.sendSuccess(res, result);
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  protected sendSuccess(res: Response, object: Object) {
    return res.status(httpStatusCode.OK).json(object);
  }

  protected sendCreated(res: Response, object: Object) {
    return res.status(httpStatusCode.CREATED).json(object);
  }

  protected sendError(res: Response, error: StatusException) {
    return res.status(error.status || httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
}

export { BaseController };
