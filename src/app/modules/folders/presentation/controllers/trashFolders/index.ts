import { FolderRepository } from '../../../data/repositories/folder.repository'
import { TrashFoldersUseCase } from '../../../domain/useCases/trashFolders.useCase'
import { TrashFoldersController } from './trashFolders.controller'

const folderRepository = new FolderRepository()
const trashFoldersUseCase = new TrashFoldersUseCase(folderRepository)
const trashFoldersController = new TrashFoldersController(trashFoldersUseCase)
const trashFoldersHandler = trashFoldersController.handle.bind(trashFoldersController)

export { trashFoldersHandler }
