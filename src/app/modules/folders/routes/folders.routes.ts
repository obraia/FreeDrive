import { RequestHandler, Router } from 'express'
import { BaseRoutes } from '../../shared/presentation/routes/base.routes'
import { findFoldersHandler } from '../presentation/controllers/findFolders'
import { downloadFoldersHandler } from '../presentation/controllers/downloadFolders'
import { createFoldersHandler } from '../presentation/controllers/createFolders'
import { favoriteFoldersHandler } from '../presentation/controllers/favoriteFolders'
import { trashFoldersHandler } from '../presentation/controllers/trashFolders'
import { renameFolderHandler } from '../presentation/controllers/renameFolder'
import { deleteFoldersHandler } from '../presentation/controllers/deleteFolders'
import { findFolderHandler } from '../presentation/controllers/findFolder'
import { findFolderDeepHandler } from '../presentation/controllers/findFolderDeep'

class FoldersRoutes extends BaseRoutes {

  constructor(router: Router, private authMiddleware: RequestHandler) {
    super(router)
    this.init()
  }

  private init(): void {
    super.load(
      '/folders',
      [
        ['get', '/', findFoldersHandler],
        ['get', '/download', downloadFoldersHandler],
        ['get', '/:id', findFolderHandler],
        ['get', '/deep/:id', findFolderDeepHandler],
        ['post', '/', createFoldersHandler],
        ['patch', '/favorite', favoriteFoldersHandler],
        ['patch', '/rename/:id', renameFolderHandler],
        ['patch', '/trash', trashFoldersHandler],
        ['delete', '/', deleteFoldersHandler],
      ],
      this.authMiddleware,
    )
  }
}

export { FoldersRoutes }
