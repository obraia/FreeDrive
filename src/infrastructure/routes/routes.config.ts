import { Router } from 'express'
import { authHandler } from '../../app/modules/auth/presentation/middlewares/auth'
import { authRoutes } from '../../app/modules/auth/presentation/routes'
import { filesRoutes } from '../../app/modules/files/routes'
import { foldersRoutes } from '../../app/modules/folders/routes'
import { miscRoutes } from '../../app/modules/misc/routes'
import { usersRoutes } from '../../app/modules/users/routes'

class Routes {
  private readonly router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  get routes(): Router {
    return this.router
  }

  private init(): void {
    authRoutes(this.router)
    usersRoutes(this.router, authHandler)
    filesRoutes(this.router, authHandler)
    foldersRoutes(this.router, authHandler)
    miscRoutes(this.router, authHandler)

    // not found
    this.router.use((req, res) => {
      res.status(404).json({ message: 'Not found' })
    });
  }
}

export { Routes }
