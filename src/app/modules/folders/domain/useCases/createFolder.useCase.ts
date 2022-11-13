import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FolderRepository } from '../../data/repositories/folder.repository'

interface RequestDTO {
  userId: string
  parentId: string
  folderName: string
}

interface ResponseDTO {
  message: string
}

class CreateFolderUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, parentId, folderName } = request

    const folder = this.folderRepository.createDocument({
      userId,
      parentId,
      folderName,
    })

    await this.folderRepository.create(folder)

    return Result.ok<ResponseDTO>({ message: 'Files created' })
  }
}

export { CreateFolderUseCase }
