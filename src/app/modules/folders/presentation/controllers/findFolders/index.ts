import { FolderRepository } from '../../../data/repositories/folder.repository'
import { FindFoldersUseCase } from '../../../domain/useCases/findFolders.useCase'
import { FindFoldersController } from './findFolders.controller'

const folderRepository = new FolderRepository()
const findFoldersUseCase = new FindFoldersUseCase(folderRepository)
const findFoldersController = new FindFoldersController(findFoldersUseCase)
const findFoldersHandler = findFoldersController.handle.bind(findFoldersController)

export { findFoldersHandler }
