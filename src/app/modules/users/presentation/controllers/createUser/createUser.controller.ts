import { Request, Response } from 'express'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { CreateUserUseCase } from '../../../domain/useCases/createUser.useCase'

class CreateUserController extends BaseController implements Controller {
  constructor(private readonly useCase: CreateUserUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      body: { name, username, email, password },
      decoded,
    } = req

    const result = await this.useCase.execute({ name, username, email, password })

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { CreateUserController }
