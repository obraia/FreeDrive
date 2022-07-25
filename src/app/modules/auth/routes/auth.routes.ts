import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'

class AuthRoutes {
  private _controller: AuthController

  constructor(private _router: Router) {
    this._controller = new AuthController()
    this._init()
  }

  private _init(): void {
    this._router.post('/login', this._controller.login.bind(this._controller))
  }
}

export { AuthRoutes }
