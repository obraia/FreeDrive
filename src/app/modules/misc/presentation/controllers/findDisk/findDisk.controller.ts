import { Request, Response } from 'express'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { FindDiskUseCase } from '../../../domain/useCases/findDisk.useCase'

class FindDiskController extends BaseController implements Controller {
  constructor(private readonly useCase: FindDiskUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {

    const result = await this.useCase.execute()

    if (result.success) {
      return this.sendSuccess(res, result.value)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { FindDiskController }
