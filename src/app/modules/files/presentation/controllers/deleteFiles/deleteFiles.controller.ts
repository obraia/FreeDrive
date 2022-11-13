import { Request, Response } from 'express'
import { Params } from '../../../../shared/helpers/params.helper'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { DeleteFilesUseCase } from '../../../domain/useCases/deleteFiles.useCase'

class DeleteFilesController extends BaseController implements Controller {
  constructor(private readonly useCase: DeleteFilesUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      body: { ids },
      decoded,
    } = req

    const params = {
      userId: decoded.id,
      filesIds: Params.arrayString(ids),
    }

    const result = await this.useCase.execute(params)

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { DeleteFilesController }
