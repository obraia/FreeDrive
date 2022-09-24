import { Request, Response } from 'express'
import { Types } from 'mongoose'
import { boundClass } from 'autobind-decorator'
import { BaseController } from '../../shared/controllers/base.controller'
import { UserRepository } from '../repositories/user.repository'
import { IUser } from '../models/user.interface'
import { BadRequestException } from '../../shared/exceptions/badRequest.exception'
import { NotfoundException } from '../../shared/exceptions/notfound.exception'

@boundClass
class UserController extends BaseController<IUser> {
  constructor() {
    super(new UserRepository())
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params

    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid id')
      }

      const result = await this.repository.findById(id, {
        populate: ['driveFolder', 'staticFolder'],
      })

      if (!result) {
        throw new NotfoundException('Not found')
      }

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async findCurrent(req: Request, res: Response) {
    const { decoded } = req

    try {
      if (!decoded) {
        throw new BadRequestException('User cannot be decoded')
      }

      const result = await this.repository.findById(decoded.id, {
        projection: [
          'id',
          'name',
          'username',
          'email',
          'driveFolderId',
          'staticFolderId',
        ]
      })

      if (!result) {
        throw new NotfoundException('Not found')
      }

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }
}

export { UserController }
