import { httpStatusCode } from '../helpers/httpStatus.helper';

class UnauthorizedException implements Error {
  name: string;
  message: string;
  status: number;

  constructor(message: string) {
    this.name = 'UnauthorizedException';
    this.message = message;
    this.status = httpStatusCode.UNAUTHORIZED;
  }
}

export { UnauthorizedException };
