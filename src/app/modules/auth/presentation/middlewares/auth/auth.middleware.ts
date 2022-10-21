import { NextFunction, Request, Response } from 'express'
import { BaseMiddleware } from '../../../../shared/presentation/middlewares/base.middleware'
import { Middleware } from '../../../../shared/presentation/middlewares/dtos/middleware.dto'
import { AuthUseCase } from '../../../domain/useCases/auth.useCase'

class AuthMiddleware extends BaseMiddleware implements Middleware {
  constructor(private readonly useCase: AuthUseCase) {
    super()
  }

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    const result = await this.useCase.execute({ authorization })

    if (result.success) {
      req.decoded = result.value
      next()
    } else {
      this.sendError(res, result.error)
    }
  }
}

export { AuthMiddleware }
