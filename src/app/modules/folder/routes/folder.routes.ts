import { RequestHandler, Router } from 'express'
import multer from 'multer'
import { FolderController } from '../controllers/folder.controller'

class FolderRoutes {
  private _controller: FolderController
  private _upload: RequestHandler

  constructor(private _router: Router) {
    this._controller = new FolderController()
    this._upload = multer({ dest: process.env.STATIC_DIR }).array('files')
    this._init()
  }

  private _init(): void {
    this._router.get('/folders', this._controller.find)
    this._router.get('/folders/deep/:id', this._controller.findDeepById)
    this._router.get('/folders/download', this._controller.download)
    this._router.get('/folders/:id', this._controller.findById)
    this._router.post('/folders', this._upload, this._controller.create)
    this._router.patch('/folders/favorite', this._controller.favorite)
    this._router.patch('/folders/move', this._upload, this._controller.move)
    this._router.patch('/folders/trash', this._controller.moveToTrash)
    this._router.patch('/folders/rename/:id', this._controller.rename)
    this._router.delete('/folders', this._controller.deleteMany)
    this._router.delete('/folders:id', this._controller.deleteById)

    // this._router.get('/disk', this._controller.getDiskSpace.bind(this._controller));
  }
}

export { FolderRoutes }
