import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FsHelper } from '../../../../utils/helpers/fs.helper'

interface RequestDTO {}

interface ResponseDTO {
  total: number
  used: number
}

class FindDiskUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor() {}

  async execute(): Promise<Result<ResponseDTO>> {
    const disk = await FsHelper.getDiskSpace()
    return Result.ok<ResponseDTO>(disk)
  }
}

export { FindDiskUseCase }
