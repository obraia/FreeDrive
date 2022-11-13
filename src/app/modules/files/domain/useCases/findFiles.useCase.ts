import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FileRepository } from '../../data/repositories/file.repository'
import { FileDTO } from '../entities/file.entity'
import { Params } from '../../../shared/helpers/params.helper'

interface RequestDTO {
  userId: string
  parentId?: string
  deleted?: boolean
  favorite?: boolean
  originalName?: string
  limit: number
  page: number
}

interface ResponseDTO {
  data: FileDTO[]
  total: number
}

class FindFilesUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly userRepository: FileRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, parentId, deleted, favorite, originalName, limit, page } = request

    const results = this.userRepository.find({
      userId,
      parentId,
      deleted,
      favorite,
      originalName: Params.like(originalName),
    }, {
      pagination: { limit, page },
      projection: ['id', 'originalName', 'mimetype'],
    })

    const [data, total]= await Promise.all([results.data, results.total])

    return Result.ok<ResponseDTO>({ data, total })
  }
}

export { FindFilesUseCase }
