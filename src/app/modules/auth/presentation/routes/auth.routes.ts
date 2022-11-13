import { Router } from 'express'
import { BaseRoutes } from '../../../shared/presentation/routes/base.routes'
import { loginHandler } from '../controllers/login'

class AuthRoutes extends BaseRoutes {
  constructor(router: Router) {
    super(router)
    this._init()
  }

  private _init(): void {
    this.load('/auth', [
      ['post', '/login', loginHandler],
    ])
  }
}

export { AuthRoutes }
