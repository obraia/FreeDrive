import { Request, Response } from 'express'
import { boundClass } from 'autobind-decorator'
import { UnauthorizedException } from '../../shared/exceptions/unauthorized.exception copy'
import { BaseMiddleware } from '../../shared/middlewares/base.middleware'
import { JWTHelper } from '../helpers/jwt.helper'

@boundClass
class AuthMiddleware extends BaseMiddleware {
  constructor() {
    super()
  }

  public override async handle(req: Request, res: Response, next: Function) {
    const { authorization } = req.headers

    try {
      if (!authorization) {
        throw new UnauthorizedException('Token not found')
      }

      const [type, token] = authorization.split(' ')

      if (type !== 'Bearer') {
        throw new UnauthorizedException('Invalid token format')
      }

      const decoded = JWTHelper.verify(token)

      if (!decoded) {
        throw new UnauthorizedException('Invalid token')
      }

      req.decoded = decoded as any

      next()
    } catch (error: any) {
      this.sendError(res, error)
    }
  }
}

export { AuthMiddleware }
