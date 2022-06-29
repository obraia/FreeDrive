import { httpStatusCode } from '../helpers/httpStatus.helper';

class InternalException implements Error {
  name: string;
  message: string;
  status: number;

  constructor(message: string) {
    this.name = 'InternalException';
    this.message = message;
    this.status = httpStatusCode.INTERNAL_SERVER_ERROR;
  }
}

export { InternalException };
