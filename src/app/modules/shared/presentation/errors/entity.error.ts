import { status } from '../../helpers/status.helper';
import { Error } from './dtos/error.dto'

class Entity implements Error {
  readonly name = 'Entity'
  readonly status = status.UNPROCESSABLE_ENTITY

  constructor(readonly message: string) {}
}

export { Entity };
