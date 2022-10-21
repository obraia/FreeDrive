import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FolderRepository } from '../../data/repositories/folder.repository'

interface RequestDTO {
  userId: string
  foldersIds: string[]
}

interface ResponseDTO {
  message: string
}

class DeleteFoldersUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, foldersIds } = request

    const results = await this.folderRepository.delete({
      ids: foldersIds,
      userId,
    })

    if (!results.deletedCount) {
      return Result.notFound<ResponseDTO>('Files not found')
    }

    return Result.ok<ResponseDTO>({ message: 'Files deleted' })
  }
}

export { DeleteFoldersUseCase }
