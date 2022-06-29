import { httpStatusCode } from '../helpers/httpStatus.helper';

class EntityException implements Error {
  name: string;
  message: string;
  status: number;

  constructor(message: string) {
    this.name = 'EntityException';
    this.message = message;
    this.status = httpStatusCode.BAD_REQUEST;
  }
}

export { EntityException };
