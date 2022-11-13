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

class TrashFoldersUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, foldersIds } = request

    const results = await this.folderRepository.moveToTrash({
      ids: foldersIds,
      userId,
    })

    if (!results.modifiedCount) {
      return Result.notFound<ResponseDTO>('Folders not found')
    }

    return Result.ok<ResponseDTO>({ message: 'Folders moved to trash' })
  }
}

export { TrashFoldersUseCase }
