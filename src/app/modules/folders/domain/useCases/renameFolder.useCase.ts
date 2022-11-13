import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FolderRepository } from '../../data/repositories/folder.repository'

interface RequestDTO {
  userId: string
  folderId: string
  folderName: string
}

interface ResponseDTO {
  message: string
}

class RenameFolderUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, folderId, folderName } = request

    const results = await this.folderRepository.rename({
      id: folderId,
      userId,
      folderName,
    })

    if (!results.matchedCount) {
      return Result.notFound<ResponseDTO>('Folder not found')
    }

    return Result.ok<ResponseDTO>({ message: 'Folder renamed' })
  }
}

export { RenameFolderUseCase }
