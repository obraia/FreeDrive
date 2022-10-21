import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { UserRepository } from '../../data/repositories/user.repository'

interface RequestDTO {
  userId: string
}

interface ResponseDTO {
  message: string
}

class DeleteUserUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId } = request

    const user = await this.userRepository.deleteById(userId)

    if(!user) {
      return Result.notFound('User not found')
    }

    return Result.ok<ResponseDTO>({ message: 'User deleted successfully' })
  }
}

export { DeleteUserUseCase }
