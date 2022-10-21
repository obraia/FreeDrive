import { Response } from 'express'
import { Error } from '../errors/dtos/error.dto'

class BaseMiddleware {
  constructor() {}

  protected sendError(res: Response, error: Error) {
    return res.status(error.status).json(error)
  }
}

export { BaseMiddleware }
