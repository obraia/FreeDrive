import { FolderRepository } from '../../../data/repositories/folder.repository'
import { CreateFolderUseCase } from '../../../domain/useCases/createFolder.useCase'
import { CreateFoldersController } from './createFolders.controller'

const fileRepository = new FolderRepository()
const createFolderUseCase = new CreateFolderUseCase(fileRepository)
const createFoldersController = new CreateFoldersController(createFolderUseCase)
const createFoldersHandler = createFoldersController.handle.bind(createFoldersController)

export { createFoldersHandler }
