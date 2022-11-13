import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FileRepository } from '../../data/repositories/file.repository'

interface RequestDTO {
  userId: string
  filesIds: string[]
  favorite: boolean
}

interface ResponseDTO {
  message: string
}

class FavoriteFilesUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly fileRepository: FileRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, filesIds, favorite } = request

    const results = await this.fileRepository.favorite({
      ids: filesIds,
      favorite,
      userId,
    })

    if (!results.modifiedCount) {
      return Result.notFound<ResponseDTO>('Files not found')
    }

    return Result.ok<ResponseDTO>({ message: `Files ${favorite ? 'favorited' : 'unfavorited'}` })
  }
}

export { FavoriteFilesUseCase }
