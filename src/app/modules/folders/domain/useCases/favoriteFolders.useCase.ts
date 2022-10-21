import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FolderRepository } from '../../data/repositories/folder.repository'

interface RequestDTO {
  userId: string
  foldersIds: string[]
  favorite: boolean
}

interface ResponseDTO {
  message: string
}

class FavoriteFoldersUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, foldersIds, favorite } = request

    const results = await this.folderRepository.favorite({
      ids: foldersIds,
      favorite,
      userId,
    })

    if (!results.modifiedCount) {
      return Result.notFound<ResponseDTO>('Folders not found')
    }

    return Result.ok<ResponseDTO>({ message: `Folders ${favorite ? 'favorited' : 'unfavorited'}` })
  }
}

export { FavoriteFoldersUseCase }
