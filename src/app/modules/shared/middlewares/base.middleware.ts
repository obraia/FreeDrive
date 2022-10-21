import { boundClass } from 'autobind-decorator'
import { Response, Request } from 'express'
import { Error } from '../presentation/errors/dtos/error.dto'
import { status } from '../helpers/status.helper'

@boundClass
class BaseMiddleware {
  constructor() {}

  public async handle(req: Request, res: Response, next: Function) {
    next()
  }

  protected sendError(res: Response, error: Error) {
    return res.status(error.status || status.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    })
  }
}

export { BaseMiddleware }
