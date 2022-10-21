import { Request, Response } from 'express'
import { Params } from '../../../../shared/helpers/params.helper'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { RenameFileUseCase } from '../../../domain/useCases/renameFile.useCase'

class RenameFileController extends BaseController implements Controller {
  constructor(private readonly useCase: RenameFileUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      params: { id },
      body: { originalName },
      decoded,
    } = req

    const params = {
      userId: decoded.id,
      fileId: id,
      originalName: Params.string(originalName),
    }

    const result = await this.useCase.execute(params)

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { RenameFileController }
