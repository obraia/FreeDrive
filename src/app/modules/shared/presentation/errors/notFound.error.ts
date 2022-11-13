import { status } from '../../helpers/status.helper'
import { Error } from './dtos/error.dto'

class NotFound implements Error {
  readonly name = 'NotFound'
  readonly status = status.NOT_FOUND

  constructor(readonly message: string) {}
}

export { NotFound }
