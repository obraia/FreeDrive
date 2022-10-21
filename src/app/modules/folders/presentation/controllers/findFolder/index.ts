import { FolderRepository } from '../../../data/repositories/folder.repository'
import { FindFolderUseCase } from '../../../domain/useCases/findFolder.useCase'
import { FindFolderController } from './findFolder.controller'

const folderRepository = new FolderRepository()
const findFolderUseCase = new FindFolderUseCase(folderRepository)
const findFolderController = new FindFolderController(findFolderUseCase)
const findFolderHandler = findFolderController.handle.bind(findFolderController)

export { findFolderHandler }
