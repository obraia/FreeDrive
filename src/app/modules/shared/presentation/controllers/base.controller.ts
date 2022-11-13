import { Response, Request } from 'express'
import { Error } from '../errors/dtos/error.dto'
import { status } from '../../helpers/status.helper'

class BaseController {
  constructor() {}

  protected sendSuccess(res: Response, object: Object) {
    return res.status(status.OK).json(object)
  }

  protected sendCreated(res: Response, object: Object) {
    return res.status(status.CREATED).json(object)
  }

  protected sendFile(res: Response, path: string, cb?: () => void) {
    return res.sendFile(path, cb)
  }

  protected sendDownload(res: Response, path: string, cb?: () => void) {
    return res.status(status.OK).download(path, cb)
  }

  protected sendError(res: Response, error: Error) {
    return res.status(error.status).json(error)
  }
}

export { BaseController }
