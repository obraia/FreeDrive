import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FileRepository } from '../../data/repositories/file.repository'
import { FileDTO } from '../entities/file.entity'

interface RequestDTO {
  userId: string
  fileId: string
}

interface ResponseDTO {
  file: FileDTO
}

class FindFileUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly fileRepository: FileRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, fileId } = request

    const file = await this.fileRepository.findOne({
      _id: fileId,
      userId,
    }, {
      projection: ['id', 'originalName', 'mimetype'],
    })

    if(!file) {
      return Result.notFound<ResponseDTO>('File not found')
    }

    return Result.ok<ResponseDTO>({ file })
  }
}

export { FindFileUseCase }
