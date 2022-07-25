import { Router } from 'express'
import { AuthMiddleware } from '../../app/modules/auth/middlewares/auth.middleware'
import { AuthRoutes } from '../../app/modules/auth/routes/auth.routes'
import { FilesRoutes } from '../../app/modules/file/routes/files.routes'
import { FolderRoutes } from '../../app/modules/folder/routes/folder.routes'
import { UserRoutes } from '../../app/modules/user/routes/user.routes'

class Routes {
  public router: Router

  constructor() {
    this.router = Router()
    this._init()
  }

  private _init(): void {
    const authMiddleware = new AuthMiddleware()

    new AuthRoutes(this.router)
    new UserRoutes(this.router, authMiddleware.handle)
    new FilesRoutes(this.router, authMiddleware.handle)
    new FolderRoutes(this.router, authMiddleware.handle)
  }

  public getRouter(): Router {
    return this.router
  }
}

export { Routes }
