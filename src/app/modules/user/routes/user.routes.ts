import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

class UserRoutes {
  private _controller: UserController;

  constructor(private _router: Router) {
    this._controller = new UserController();
    this._init();
  }

  private _init(): void {
    this._router.post('/users', this._controller.create.bind(this._controller));
  }
}

export { UserRoutes };
