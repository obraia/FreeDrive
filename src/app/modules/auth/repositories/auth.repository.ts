import { BaseRepository } from '../../shared/repositories/base.repository'
import { IAuth } from '../models/auth.interface'
import { UserModel } from '../models/auth.model'

class AuthRepository extends BaseRepository<IAuth> {
  constructor() {
    super(UserModel)
  }
}

export { AuthRepository }
