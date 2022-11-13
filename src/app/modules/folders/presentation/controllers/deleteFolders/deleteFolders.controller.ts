import { Request, Response } from 'express'
import { Params } from '../../../../shared/helpers/params.helper'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { DeleteFoldersUseCase } from '../../../domain/useCases/deleteFolders.useCase'

class DeleteFoldersController extends BaseController implements Controller {
  constructor(private readonly useCase: DeleteFoldersUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      body: { ids },
      decoded,
    } = req

    const params = {
      userId: decoded.id,
      foldersIds: Params.arrayString(ids),
    }

    const result = await this.useCase.execute(params)

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { DeleteFoldersController }
