import { Request, Response } from 'express'
import { Params } from '../../../../shared/helpers/params.helper'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { FindFilesUseCase } from '../../../domain/useCases/findFiles.useCase'

class FindFilesController extends BaseController implements Controller {
  constructor(private readonly useCase: FindFilesUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      query: { parentId, deleted, favorite, originalName, limit, page },
      decoded,
    } = req

    const params = {
      userId: decoded.id,
      parentId: Params.string(parentId),
      deleted: Params.boolean(deleted),
      favorite: Params.boolean(favorite),
      originalName: Params.string(originalName),
      limit: Params.number(limit, 10),
      page: Params.number(page, 1),
    }

    const result = await this.useCase.execute(params)

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { FindFilesController }
