import { status } from '../../helpers/status.helper';
import { Error } from './dtos/error.dto'

class Internal implements Error {
  readonly name = 'Internal'
  readonly status = status.INTERNAL_SERVER_ERROR

  constructor(readonly message: string) {}
}

export { Internal };
