import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FileRepository } from '../../data/repositories/file.repository'

interface RequestDTO {
  userId: string
  fileId: string
  originalName: string
}

interface ResponseDTO {
  message: string
}

class RenameFileUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly fileRepository: FileRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, fileId, originalName } = request

    const results = await this.fileRepository.rename({
      id: fileId,
      userId,
      originalName,
    })

    if (!results.matchedCount) {
      return Result.notFound<ResponseDTO>('File not found')
    }

    return Result.ok<ResponseDTO>({ message: 'File renamed' })
  }
}

export { RenameFileUseCase }
