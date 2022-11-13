import { Request, Response } from 'express'
import { Params } from '../../../../shared/helpers/params.helper'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { FavoriteFilesUseCase } from '../../../domain/useCases/favoriteFiles.useCase'

class FavoriteFilesController extends BaseController implements Controller {
  constructor(private readonly useCase: FavoriteFilesUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      body: { ids, favorite },
      decoded,
    } = req

    const params = {
      userId: decoded.id,
      filesIds: Params.arrayString(ids),
      favorite: Params.boolean(favorite),
    }

    const result = await this.useCase.execute(params)

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { FavoriteFilesController }
