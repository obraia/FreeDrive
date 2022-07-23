import { BaseRepository } from '../../shared/repositories/base.repository'
import { IUser } from '../models/user.interface'
import { UserModel } from '../models/user.model'

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel)
  }
}

export { UserRepository }
