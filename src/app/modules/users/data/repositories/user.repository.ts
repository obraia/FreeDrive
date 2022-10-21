import { BaseRepository } from '../../../shared/repositories/base.repository'
import { UserDTO, UserEntity } from '../../domain/entities/user.entity'

class UserRepository extends BaseRepository<UserDTO> {
  constructor() {
    super(UserEntity)
  }
}

export { UserRepository }
