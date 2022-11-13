import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FileRepository } from '../../data/repositories/file.repository'

interface RequestDTO {
  userId: string
  filesIds: string[]
}

interface ResponseDTO {
  message: string
}

class DeleteFilesUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly fileRepository: FileRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, filesIds } = request

    const results = await this.fileRepository.delete({
      ids: filesIds,
      userId,
    })

    if (!results.deletedCount) {
      return Result.notFound<ResponseDTO>('Files not found')
    }

    return Result.ok<ResponseDTO>({ message: 'Files deleted' })
  }
}

export { DeleteFilesUseCase }
