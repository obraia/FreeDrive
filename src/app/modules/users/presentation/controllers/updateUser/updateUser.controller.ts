import { Request, Response } from 'express'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { UpdateUserUseCase } from '../../../domain/useCases/updateUser.useCase'

class UpdateUserController extends BaseController implements Controller {
  constructor(private readonly useCase: UpdateUserUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      params: { id },
      body: { name, username, email, password },
      decoded,
    } = req

    const result = await this.useCase.execute({
      userId: id,
      name,
      username,
      email,
      password,
    })

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { UpdateUserController }
