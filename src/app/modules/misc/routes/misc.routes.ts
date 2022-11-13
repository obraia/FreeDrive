import { RequestHandler, Router } from 'express'
import { BaseRoutes } from '../../shared/presentation/routes/base.routes'
import { findDiskHandler } from '../presentation/controllers/findDisk'

class MiscRoutes extends BaseRoutes {

  constructor(router: Router, private authHandler: RequestHandler) {
    super(router)
    this.init()
  }

  private init(): void {
    super.load('/misc', [
      ['get', '/disk', [this.authHandler, findDiskHandler]],
    ])
  }
}

export { MiscRoutes }
