import { Request, Response } from 'express'
import { Params } from '../../../../shared/helpers/params.helper'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { FindUsersUseCase } from '../../../domain/useCases/findUsers.useCase'

class FindUsersController extends BaseController implements Controller {
  constructor(private readonly useCase: FindUsersUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      query: { name, username, email, limit, page },
      decoded,
    } = req

    const params = {
      userId: decoded.id,
      name: Params.string(name),
      username: Params.string(username),
      email: Params.string(email),
      limit: Params.string(limit),
      page: Params.string(page),
    }

    const result = await this.useCase.execute(params)

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { FindUsersController }
