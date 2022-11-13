import { Request, Response } from 'express'
import { Params } from '../../../../shared/helpers/params.helper'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { FavoriteFoldersUseCase } from '../../../domain/useCases/favoriteFolders.useCase'

class FavoriteFoldersController extends BaseController implements Controller {
  constructor(private readonly useCase: FavoriteFoldersUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      body: { ids, favorite },
      decoded,
    } = req

    const params = {
      userId: decoded.id,
      foldersIds: Params.arrayString(ids),
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

export { FavoriteFoldersController }
