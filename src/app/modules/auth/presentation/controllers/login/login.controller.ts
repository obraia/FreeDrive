import { Request, Response } from 'express'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { LoginUseCase } from '../../../domain/useCases/login.useCase'

class LoginController extends BaseController implements Controller {
  constructor(private readonly _useCase: LoginUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const { username, password } = req.body

    const result = await this._useCase.execute({ username, password })

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { LoginController }
