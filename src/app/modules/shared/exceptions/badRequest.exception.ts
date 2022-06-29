import { httpStatusCode } from '../helpers/httpStatus.helper';

class BadRequestException implements Error {
  name: string;
  message: string;
  status: number;

  constructor(message: string) {
    this.name = 'BadRequestException';
    this.message = message;
    this.status = httpStatusCode.BAD_REQUEST;
  }
}

export { BadRequestException };
