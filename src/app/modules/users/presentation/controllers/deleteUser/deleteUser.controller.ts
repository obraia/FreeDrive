import { Request, Response } from 'express'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { DeleteUserUseCase } from '../../../domain/useCases/deleteUser.useCase'

class DeleteUserController extends BaseController implements Controller {
  constructor(private readonly useCase: DeleteUserUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      params: { id },
    } = req

    const result = await this.useCase.execute({ userId: id })

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { DeleteUserController }
