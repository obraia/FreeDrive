import { Request, Response } from 'express'
import { Params } from '../../../../shared/helpers/params.helper'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { FindFileUseCase } from '../../../domain/useCases/findFile.useCase'

class FindFileController extends BaseController implements Controller {
  constructor(private readonly useCase: FindFileUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      params: { id },
      decoded,
    } = req

    const params = {
      userId: decoded.id,
      fileId: Params.string(id),
    }

    const result = await this.useCase.execute(params)

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { FindFileController }
