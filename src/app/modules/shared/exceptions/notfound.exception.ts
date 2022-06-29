import { httpStatusCode } from '../helpers/httpStatus.helper';

class NotfoundException implements Error {
  name: string;
  message: string;
  status: number;

  constructor(message: string) {
    this.name = 'NotfoundException';
    this.message = message;
    this.status = httpStatusCode.BAD_REQUEST;
  }
}

export { NotfoundException };
