import { RequestHandler, Router } from 'express'
import { BaseRoutes } from '../../shared/routes/base.routes'
import { UserController } from '../controllers/user.controller'

class UserRoutes extends BaseRoutes {
  private _controller: UserController

  constructor(_router: Router, private _authMiddleware: RequestHandler) {
    super(_router)

    this._controller = new UserController()
    this._init()
  }

  private _init(): void {
    super.load([
      {
        method: 'get',
        path: '/users/current',
        handler: this._controller.findCurrent,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'get',
        path: '/users/:id',
        handler: this._controller.findById,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'post',
        path: '/users',
        handler: this._controller.create,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'patch',
        path: '/users',
        handler: this._controller.update,
        middlewares: [this._authMiddleware],
      },
    ])
  }
}

export { UserRoutes }
