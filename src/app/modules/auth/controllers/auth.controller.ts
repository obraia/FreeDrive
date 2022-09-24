import { Request, Response } from 'express'
import { boundClass } from 'autobind-decorator'
import { compare } from 'bcrypt'
import { BaseController } from '../../shared/controllers/base.controller'
import { BadRequestException } from '../../shared/exceptions/badRequest.exception'
import { NotfoundException } from '../../shared/exceptions/notfound.exception'
import { UserRepository } from '../../user/repositories/user.repository'
import { IUser } from '../../user/models/user.interface'
import { JWTHelper } from '../helpers/jwt.helper'

@boundClass
class AuthController extends BaseController<IUser> {
  constructor() {
    super(new UserRepository())
  }

  public async login(req: Request, res: Response) {
    const { username, password } = req.body

    try {
      const user = await this.repository.findOne({ username })

      if (!user) {
        throw new NotfoundException('User not found')
      }

      const isValid = await compare(password, user.password)

      if (!isValid) {
        throw new BadRequestException('Invalid password')
      }

      const token = JWTHelper.encode({
        id: user._id,
      })

      return this.sendSuccess(res, { token })
    } catch (error: any) {
      this.sendError(res, error)
    }
  }
}

export { AuthController }
