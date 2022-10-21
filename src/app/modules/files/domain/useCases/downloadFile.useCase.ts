import mime from 'mime-types'
import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FileRepository } from '../../data/repositories/file.repository'

interface RequestDTO {
  userId: string
  fileId: string
}

interface ResponseDTO {
  file: {
    path: string
    originalName: string
    mimetype: string
  }
}

class DownloadFileUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly fileRepository: FileRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, fileId } = request

    const file = await this.fileRepository.findToDownload({
      id: fileId,
      userId,
    })

    if (!file) {
      return Result.notFound<ResponseDTO>('File not found')
    }

    return Result.ok<ResponseDTO>({
      file: {
        path: file.path,
        mimetype: file.mimetype,
        originalName: `${file.originalName}.${mime.extension(file.mimetype)}`,
      },
    })
  }
}

export { DownloadFileUseCase }
