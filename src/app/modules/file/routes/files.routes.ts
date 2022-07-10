import { RequestHandler, Router } from 'express'
import sharp from 'sharp'
import { FilesController } from '../controllers/files.controller'
import driveEngine from '../engines/drive.engine'
import staticEngine from '../engines/static.engine'

class FilesRoutes {
  private _controller: FilesController
  private _uploadDrive: RequestHandler
  private _uploadStatic: RequestHandler

  constructor(private _router: Router) {
    this._controller = new FilesController()

    const { DRIVE_DIR, THUMBS_DIR, FILES_DIR } = process.env

    this._uploadDrive = driveEngine({
      dest: DRIVE_DIR,
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
    this._router.get('/files', this._controller.find)
    this._router.get('/files/download', this._controller.downloadMany)
    this._router.get('/files/download/:id', this._controller.downloadById)
    this._router.post('/files', this._uploadDrive, this._controller.create)
    this._router.post('/files/static', this._uploadStatic, this._controller.create)
    this._router.patch('/files/favorite', this._controller.favorite)
    this._router.patch('/files/move', this._controller.move)
    this._router.patch('/files/trash', this._controller.moveToTrash)
    this._router.patch('/files/rename/:id', this._controller.rename)
    this._router.delete('/files', this._controller.deleteMany)
    this._router.get('/files/:id', this._controller.findById)
    this._router.delete('/files:id', this._controller.deleteById)
  }
}

export { FilesRoutes }
