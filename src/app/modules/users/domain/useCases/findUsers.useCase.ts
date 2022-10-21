import { Params } from '../../../shared/helpers/params.helper'
import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { UserRepository } from '../../data/repositories/user.repository'
import { UserDTO } from '../entities/user.entity'

interface RequestDTO {
  name?: string
  username?: string
  email?: string
  limit: string
  page: string
}

interface ResponseDTO {
  data: UserDTO[]
  total: number
}

class FindUsersUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { name, username, email, limit, page } = request

    const results = this.userRepository.find({
      name: Params.like(name),
      username: Params.like(username),
      email: Params.like(email),
    }, {
      pagination: Params.pagination(limit, page),
      projection: ['id', 'name', 'username', 'email'],
    })

    const [data, total]= await Promise.all([results.data, results.total])

    return Result.ok<ResponseDTO>({ data, total })
  }
}

export { FindUsersUseCase }
