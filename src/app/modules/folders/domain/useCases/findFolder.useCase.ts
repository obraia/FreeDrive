import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FolderRepository } from '../../data/repositories/folder.repository'
import { FolderDTO } from '../entities/folder.entity'

interface RequestDTO {
  userId: string
  folderId: string
}

interface ResponseDTO {
  folder: FolderDTO
}

class FindFolderUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, folderId } = request

    const folder = await this.folderRepository.findOne({
      id: folderId,
      userId,
    }, {
      projection: ['id', 'folderName', 'favorite', 'allowDuplicate', 'createdAt', 'updatedAt'],
    })

    if(!folder) {
      return Result.notFound<ResponseDTO>('Folder not found')
    }

    return Result.ok<ResponseDTO>({ folder })
  }
}

export { FindFolderUseCase }
