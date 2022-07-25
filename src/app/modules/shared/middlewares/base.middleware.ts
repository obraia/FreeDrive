import { boundClass } from 'autobind-decorator'
import { Response, Request } from 'express'
import { StatusException } from '../exceptions/status.exception'
import { httpStatusCode } from '../helpers/httpStatus.helper'

@boundClass
class BaseMiddleware {
  constructor() {}

  public async handle(req: Request, res: Response, next: Function) {
    next()
  }

  protected sendError(res: Response, error: StatusException) {
    return res.status(error.status || httpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    })
  }
}

export { BaseMiddleware }
