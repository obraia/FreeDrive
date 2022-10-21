import { status } from '../../helpers/status.helper';
import { Error } from './dtos/error.dto'

class BadRequest implements Error {
  readonly name = 'BadRequest'
  readonly status = status.BAD_REQUEST

  constructor(readonly message: string) {}
}

export { BadRequest };
