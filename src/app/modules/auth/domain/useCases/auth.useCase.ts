import { JWT } from '../../../shared/helpers/jwt.helper'
import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'

interface RequestDTO {
  authorization?: string
}

interface ResponseDTO {
  id: string
}

class AuthUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor() {}

  private getToken(authorization: string) {
    const [type, token] = authorization.split(' ')

    if (type !== 'Bearer' || !token) {
      return null
    }

    return token
  }

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { authorization = '' } = request

    const token = this.getToken(authorization)
    const decoded = JWT.verify<ResponseDTO>(token)

    if (!decoded) {
      return Result.unauthorized('Invalid token')
    }

    return Result.ok<ResponseDTO>(decoded)
  }
}

export { AuthUseCase }
