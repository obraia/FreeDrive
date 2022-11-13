import { Request, Response } from 'express'
import stream from 'stream'
import { Params } from '../../../../shared/helpers/params.helper'
import { BaseController } from '../../../../shared/presentation/controllers/base.controller'
import { Controller } from '../../../../shared/presentation/controllers/dto/controller.dto'
import { DownloadFoldersUseCase } from '../../../domain/useCases/downloadFolders.useCase'

class DownloadFoldersController extends BaseController implements Controller {
  constructor(private readonly useCase: DownloadFoldersUseCase) {
    super()
  }

  public async handle(req: Request, res: Response) {
    const {
      query: { ids },
      decoded,
    } = req

    const params = {
      userId: decoded.id,
      foldersIds: Params.string(ids).split(';'),
    }

    const result = await this.useCase.execute(params)
    
    if (result.success) {
      const readStream = new stream.PassThrough()
      const fileName = `freedrive-${Date.now()}.zip`

      readStream.end(result.value.file)
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName)
      res.setHeader('Content-Type', 'application/zip')
      res.setHeader('File-Name', fileName)

      return readStream.pipe(res)
    } else {
      return this.sendError(res, result.error)
    }
  }
}

export { DownloadFoldersController }
