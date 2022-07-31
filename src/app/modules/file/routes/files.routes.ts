import { RequestHandler, Router } from 'express'
import sharp from 'sharp'
import { BaseRoutes } from '../../shared/routes/base.routes'
import { FilesController } from '../controllers/files.controller'
import driveEngine from '../engines/drive.engine'

class FilesRoutes extends BaseRoutes {
  private _controller: FilesController
  private _uploadDrive: RequestHandler
  private _uploadStatic: RequestHandler

  constructor(router: Router, private _authMiddleware: RequestHandler) {
    super(router)

    this._controller = new FilesController()

    const { FILES_DIR, THUMBS_DIR } = process.env

    this._uploadDrive = driveEngine({
      dest: FILES_DIR,
      thumb: {
        dest: THUMBS_DIR,
        transform: sharp().webp({ quality: 70 }).resize(200, 200),
      },
    }).array('files')

    this._uploadStatic = driveEngine({
      dest: FILES_DIR,
      transform: sharp().jpeg({ quality: 75 }).resize(1200, 1200, { fit: 'inside' }),
      thumb: {
        dest: THUMBS_DIR,
        transform: sharp().webp().resize(200, 200),
      },
    }).array('files')

    this._init()
  }

  private _init(): void {
    super.load([
      {
        method: 'get',
        path: '/files',
        handler: this._controller.find,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'get',
        path: '/files/download',
        handler: this._controller.downloadMany,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'get',
        path: '/files/download/:id',
        handler: this._controller.downloadById,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'post',
        path: '/files',
        handler: this._controller.create,
        middlewares: [this._authMiddleware, this._uploadDrive],
      },
      {
        method: 'post',
        path: '/files/static',
        handler: this._controller.create,
        middlewares: [this._authMiddleware, this._uploadStatic],
      },
      {
        method: 'patch',
        path: '/files/favorite',
        handler: this._controller.favorite,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'patch',
        path: '/files/move',
        handler: this._controller.move,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'patch',
        path: '/files/trash',
        handler: this._controller.moveToTrash,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'patch',
        path: '/files/rename/:id',
        handler: this._controller.rename,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'delete',
        path: '/files',
        handler: this._controller.deleteMany,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'get',
        path: '/files/:id',
        handler: this._controller.findById,
        middlewares: [this._authMiddleware],
      },
      {
        method: 'delete',
        path: '/files:id',
        handler: this._controller.deleteById,
        middlewares: [this._authMiddleware],
      },
    ])
  }
}

export { FilesRoutes }
