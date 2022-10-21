import { Request, Response } from 'express'
import { Params } from '../../../../shared/helpers/params.helper'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { CreateFolderUseCase } from '../../../domain/useCases/createFolder.useCase'

class CreateFoldersController extends BaseController implements Controller {
  constructor(private readonly useCase: CreateFolderUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      body: { parentId, folderName }, 
      decoded
    } = req

    const params = {
      userId: decoded.id,
      parentId: Params.string(parentId),
      folderName: Params.string(folderName),
    }

    const result = await this.useCase.execute(params)

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { CreateFoldersController }
