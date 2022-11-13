import { status } from '../../helpers/status.helper';
import { Error } from './dtos/error.dto'

class Unauthorized implements Error {
  readonly name = 'Unauthorized'
  readonly status = status.UNAUTHORIZED

  constructor(readonly message: string) {}
}

export { Unauthorized };
