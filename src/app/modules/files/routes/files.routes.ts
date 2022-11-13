import { RequestHandler, Router } from 'express'
import { BaseRoutes } from '../../shared/presentation/routes/base.routes'
import { findFilesHandler } from '../presentation/controllers/findFiles'
import { downloadFilesHandler } from '../presentation/controllers/downloadFiles'
import { downloadFileHandler } from '../presentation/controllers/downloadFile'
import { createFilesHandler } from '../presentation/controllers/createFiles'
import { favoriteFilesHandler } from '../presentation/controllers/favoriteFiles'
import { trashFilesHandler } from '../presentation/controllers/trashFiles'
import { renameFileHandler } from '../presentation/controllers/renameFile'
import { deleteFilesHandler } from '../presentation/controllers/deleteFiles'
import { findFileHandler } from '../presentation/controllers/findFile'
import driveEngine from '../data/engines/drive.engine'

class FilesRoutes extends BaseRoutes {
  private uploadDrive: RequestHandler
  private uploadStatic: RequestHandler

  constructor(router: Router, private authHandler: RequestHandler) {
    super(router)

    const { FILES_DIR, THUMBS_DIR } = process.env

    this.uploadDrive = driveEngine({
      dest: FILES_DIR,
      thumb: {
        dest: THUMBS_DIR,
        transform: { quality: 70, size: { width: 200, height: 200 } },
      },
    }).array('files')

    this.uploadStatic = driveEngine({
      dest: FILES_DIR,
      transform: { quality: 75, size: { width: 1200, height: 1200 } },
      thumb: {
        dest: THUMBS_DIR,
        transform: { quality: 70, size: { width: 200, height: 200 } },
      },
    }).array('files')

    this.init()
  }

  private init(): void {
    super.load(
      '/files',
      [
        ['get', '/', findFilesHandler],
        ['get', '/download', downloadFilesHandler],
        ['get', '/download/:id', downloadFileHandler],
        ['get', '/:id', findFileHandler],
        ['post', '/', [this.uploadDrive, createFilesHandler]],
        ['post', '/static', [this.uploadStatic, createFilesHandler]],
        ['patch', '/favorite', favoriteFilesHandler],
        ['patch', '/rename/:id', renameFileHandler],
        ['patch', '/trash', trashFilesHandler],
        ['delete', '/', deleteFilesHandler],
      ],
      this.authHandler,
    )
  }
}

export { FilesRoutes }
