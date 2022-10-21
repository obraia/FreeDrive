import { Request, Response } from 'express'
import { Params } from '../../../../shared/helpers/params.helper'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { DownloadFileUseCase } from '../../../domain/useCases/downloadFile.useCase'

class DownloadFileController extends BaseController implements Controller {
  constructor(private readonly useCase: DownloadFileUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      params: { id },
      decoded,
    } = req

    const params = {
      userId: decoded.id,
      fileId: Params.string(id),
    }

    const result = await this.useCase.execute(params)

    if (result.success) {
      res.setHeader('Content-disposition', 'attachment; filename=' + result.value.file.originalName)
      res.setHeader('Content-Type', result.value.file.mimetype)
      res.setHeader('File-Name', result.value.file.originalName)

      return this.sendDownload(res, result.value.file.path)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { DownloadFileController }
