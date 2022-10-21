import { Request, Response } from 'express'
import { boundClass } from 'autobind-decorator'
import { BaseMiddleware } from './base.middleware'
import { BadRequestException } from '../presentation/errors/badRequest.error'
import { UserModel } from '../../users/models/user.model'
import { NotFoundException } from '../presentation/errors/notFound.error'
import { ForbiddenException } from '../presentation/errors/forbidden.error'

@boundClass
class RoleMiddleware extends BaseMiddleware {
  constructor(private _role: 'admin' | 'user') {
    super()
  }

  public override async handle(req: Request, res: Response, next: Function) {
    const { decoded } = req

    try {
      if (!decoded) {
        throw new BadRequestException('User cannot be decoded')
      }
  
      const user = await UserModel.findById(decoded.id)
  
      if (!user) {
        throw new NotFoundException('Current user not found')
      }
  
      if(user.role !==  this._role) {
        throw new ForbiddenException('You are not allowed to do this')
      }

      next()
    } catch (error: any) {
      this.sendError(res, error)
    }
  }
}

export { RoleMiddleware }
