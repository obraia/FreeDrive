import { compare } from 'bcrypt'
import { JWT } from '../../../shared/helpers/jwt.helper'
import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { UserRepository } from '../../../users/data/repositories/user.repository'

interface RequestDTO {
  username: string
  password: string
}

interface ResponseDTO {
  token: string
}

class LoginUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { username, password } = request

    const user = await this.userRepository.findOne({ username })
    const isValid = user && await compare(password, user.password)

    if (!isValid) {
      return Result.unauthorized('Invalid username or password')
    }

    const token = JWT.encode({ id: user._id })

    return Result.ok<ResponseDTO>({ token })
  }
}

export { LoginUseCase }