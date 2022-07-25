import { RequestHandler, Router } from 'express'
import multer from 'multer'
import { BaseRoutes } from '../../shared/routes/base.routes'
import { FolderController } from '../controllers/folder.controller'

class FolderRoutes extends BaseRoutes {
  private _controller: FolderController
  private _upload: RequestHandler

  constructor(router: Router, private _authMiddleware: RequestHandler) {
    super(router)

    this._controller = new FolderController()
    this._upload = multer({ dest: process.env.STATIC_DIR }).array('files')
    this._init()
  }

  private _init(): void {
    super.load([
      {
        method: 'get',
        path: '/folders',
        handler: this._controller.find,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'get',
        path: '/folders/deep/:id',
        handler: this._controller.findDeepById,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'get',
        path: '/folders/download',
        handler: this._controller.download,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'get',
        path: '/folders/:id',
        handler: this._controller.findById,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'post',
        path: '/folders',
        handler: this._controller.create,
        middlewares: [this._authMiddleware, this._upload],
      },
      {
        method: 'patch',
        path: '/folders/favorite',
        handler: this._controller.favorite,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'patch',
        path: '/folders/move',
        handler: this._controller.move,
        middlewares: [this._authMiddleware, this._upload],
      },
      {
        method: 'patch',
        path: '/folders/trash',
        handler: this._controller.moveToTrash,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'patch',
        path: '/folders/rename/:id',
        handler: this._controller.rename,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'delete',
        path: '/folders',
        handler: this._controller.deleteMany,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'delete',
        path: '/folders/:id',
        handler: this._controller.deleteById,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'get',
        path: '/disk',
        handler: this._controller.getDiskSpace,
        middlewares: [this._authMiddleware],
      },
    ])
  }
}

export { FolderRoutes }
