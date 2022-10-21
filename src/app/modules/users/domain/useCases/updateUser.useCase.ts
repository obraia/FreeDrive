import { Params } from '../../../shared/helpers/params.helper'
import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { UserRepository } from '../../data/repositories/user.repository'

interface RequestDTO {
  userId: string
  name?: string
  email?: string
  username?: string
  password?: string
}

interface ResponseDTO {
  message: string
}

class UpdateUserUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, name, email, username, password } = request

    const user = await this.userRepository.updateById(userId, {
      name: Params.string(name),
      email: Params.string(email),
      username: Params.string(username),
      password: Params.string(password),
    })

    if(!user) {
      return Result.badRequest('User not found')
    }

    return Result.ok<ResponseDTO>({ message: 'User updated successfully' })
  }
}

export { UpdateUserUseCase }
