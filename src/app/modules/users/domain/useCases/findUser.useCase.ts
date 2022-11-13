import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { UserRepository } from '../../data/repositories/user.repository'
import { UserDTO } from '../entities/user.entity'

interface RequestDTO {
  userId: string
}

interface ResponseDTO {
  user: UserDTO
}

class FindUserUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId } = request

    const user = await this.userRepository.findById(userId, {
      projection: ['id', 'name', 'username', 'email'],
    })

    if (!user) {
      return Result.notFound('User not found')
    }

    return Result.ok<ResponseDTO>({ user })
  }
}

export { FindUserUseCase }
