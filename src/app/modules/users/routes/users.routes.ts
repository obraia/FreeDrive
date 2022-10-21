import { RequestHandler, Router } from 'express'
import { BaseRoutes } from '../../shared/presentation/routes/base.routes'
import { createUserHandler } from '../presentation/controllers/createUser'
import { deleteUserHandler } from '../presentation/controllers/deleteUser'
import { findCurrentUserHandler } from '../presentation/controllers/findCurrentUser'
import { findUserHandler } from '../presentation/controllers/findUser'
import { findUsersHandler } from '../presentation/controllers/findUsers'
import { updateUserHandler } from '../presentation/controllers/updateUser'

class UsersRoutes extends BaseRoutes {

  constructor(router: Router, private authHandler: RequestHandler) {
    super(router)
    this.init()
  }

  private init(): void {
    super.load('/users', [
      ['get', '/', [this.authHandler, findUsersHandler]],
      ['get', '/current', [this.authHandler, findCurrentUserHandler]],
      ['get', '/:id', [this.authHandler, findUserHandler]],
      ['post', '/', [this.authHandler, createUserHandler]],
      ['patch', '/:id', [this.authHandler, updateUserHandler]],
      ['delete', '/:id', [this.authHandler, deleteUserHandler]],
    ])
  }
}

export { UsersRoutes }
