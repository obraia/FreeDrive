import mime from 'mime-types'
import AdmZip from 'adm-zip'
import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FileRepository } from '../../data/repositories/file.repository'
import { FileDTO } from '../entities/file.entity'
import { MongoHelper } from '../../../shared/helpers/mongo.helper'

interface RequestDTO {
  userId: string
  filesIds: string[]
}

interface ResponseDTO {
  file: Buffer
}

interface CallbackDTO {
  (request: RequestDTO): Promise<Result<ResponseDTO>>
}

class DownloadFilesUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly fileRepository: FileRepository) {}

  private async zipFiles(files: FileDTO[]) {
    const zip = new AdmZip()

    for (const file of files) {
      zip.addLocalFile(file.path, '', `${file.originalName}.${mime.extension(file.mimetype)}`)
    }

    return zip.toBuffer()
  }

  private validate(request: RequestDTO, callback: CallbackDTO) {
    if (!MongoHelper.isValidObjectIdArray(request.filesIds)) {
      return Result.badRequest<ResponseDTO>('Invalid files ids')
    }

    if(!MongoHelper.isValidObjectId(request.userId)) {
      return Result.unauthorized<ResponseDTO>('Invalid user id')
    }

    return callback(request)
  }

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, filesIds } = request
    
    const files = await this.fileRepository.findManyToDownload({
      ids: filesIds,
      userId,
    })

    if (!files.length) {
      return Result.notFound<ResponseDTO>('Files not found')
    }

    const file = await this.zipFiles(files)

    return Result.ok<ResponseDTO>({ file })
  }
}

export { DownloadFilesUseCase }
