import { Request, Response } from 'express'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { FindUserUseCase } from '../../../domain/useCases/findUser.useCase'

class FindCurrentUserController extends BaseController implements Controller {
  constructor(private readonly useCase: FindUserUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const { decoded } = req

    const result = await this.useCase.execute({ userId: decoded.id })

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { FindCurrentUserController }
