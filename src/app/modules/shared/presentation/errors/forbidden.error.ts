import { status } from '../../helpers/status.helper'
import { Error } from './dtos/error.dto'

class Forbidden implements Error {
  readonly name = 'Forbidden'
  readonly status = status.FORBIDDEN

  constructor(readonly message: string) {}
}

export { Forbidden }
