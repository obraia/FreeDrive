import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FolderRepository } from '../../data/repositories/folder.repository'
import { FolderDTO } from '../entities/folder.entity'

interface RequestDTO {
  userId: string
  parentId?: string
  deleted?: boolean
  favorite?: boolean
  folderName?: string
  limit: number
  page: number
}

interface ResponseDTO {
  data: FolderDTO[]
  total: number
}

class FindFoldersUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, parentId, deleted, favorite, folderName, limit, page } = request

    const results = this.folderRepository.find({
      userId,
      parentId,
      deleted,
      favorite,
      folderName,
    }, {
      pagination: { limit, page },
      projection: ['id', 'folderName', 'favorite'],
    })

    const [data, total] = await Promise.all([results.data, results.total])

    return Result.ok<ResponseDTO>({ data, total })
  }
}

export { FindFoldersUseCase }
