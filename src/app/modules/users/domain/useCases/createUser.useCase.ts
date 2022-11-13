import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { UserRepository } from '../../data/repositories/user.repository'

interface RequestDTO {
  name: string
  email: string
  username: string
  password: string
}

interface ResponseDTO {
  message: string
}

class CreateUserUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { name, email, username, password } = request

    const user = await this.userRepository.findOne({
      $or: [{ email }, { username }],
    })

    if(user) {
      return Result.badRequest('User already exists')
    }

    await this.userRepository.create({
      name,
      email,
      username,
      password
    })

    return Result.ok<ResponseDTO>({ message: 'User created successfully' })
  }
}

export { CreateUserUseCase }
