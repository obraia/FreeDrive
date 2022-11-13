import { FolderRepository } from '../../../data/repositories/folder.repository'
import { DeleteFoldersUseCase } from '../../../domain/useCases/deleteFolders.useCase'
import { DeleteFoldersController } from './deleteFolders.controller'

const folderRepository = new FolderRepository()
const deleteFoldersUseCase = new DeleteFoldersUseCase(folderRepository)
const deleteFoldersController = new DeleteFoldersController(deleteFoldersUseCase)
const deleteFoldersHandler = deleteFoldersController.handle.bind(deleteFoldersController)

export { deleteFoldersHandler }
