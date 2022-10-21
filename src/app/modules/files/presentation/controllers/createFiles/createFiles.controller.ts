import { Request, Response } from 'express'
import { Params } from '../../../../shared/helpers/params.helper'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { CreateFilesUseCase } from '../../../domain/useCases/createFiles.useCase'

class CreateFilesController extends BaseController implements Controller {
  constructor(private readonly useCase: CreateFilesUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      files, 
      body: { parentId, replace }, 
      decoded
    } = req

    const params = {
      userId: decoded.id,
      files: Params.array<Express.Multer.File>(files),
      parentId: Params.string(parentId),
      replace: Params.boolean(replace),
    }

    const result = await this.useCase.execute(params)

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { CreateFilesController }
