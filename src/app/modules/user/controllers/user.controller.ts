import { Request, Response } from 'express';
import { httpStatusCode } from '../../../utils/helpers/httpStatus.helper';
import { UserRepository } from '../repositories/user.repository';

class UserController {
  private _repository: UserRepository;

  constructor() {
    this._repository = new UserRepository();
  }

  public async create(req: Request, res: Response): Promise<Response | undefined> {
    const { body } = req;

    try {
      const mongoSchema = {
        name: body.name,
        email: body.email,
        username: body.username,
        password: body.password,
      };

      await this._repository.create(mongoSchema);

      return res.status(httpStatusCode.OK).json({ message: 'User created successfully' });
    } catch (e: any) {
      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: e.message,
      });
    }
  }
}

export { UserController };
