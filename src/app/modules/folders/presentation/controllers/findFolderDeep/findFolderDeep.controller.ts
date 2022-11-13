import { Request, Response } from 'express'
import { Params } from '../../../../shared/helpers/params.helper'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { FindFolderDeepUseCase } from '../../../domain/useCases/findFolderDeep.useCase'

class FindFolderDeepController extends BaseController implements Controller {
  constructor(private readonly useCase: FindFolderDeepUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      params: { id },
      decoded,
    } = req

    const params = {
      userId: decoded.id,
      folderId: Params.string(id),
    }

    const result = await this.useCase.execute(params)

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { FindFolderDeepController }
