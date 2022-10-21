import { FolderRepository } from '../../../data/repositories/folder.repository'
import { RenameFolderUseCase } from '../../../domain/useCases/renameFolder.useCase'
import { RenameFolderController } from './renameFolder.controller'

const folderRepository = new FolderRepository()
const renameFolderUseCase = new RenameFolderUseCase(folderRepository)
const renameFolderController = new RenameFolderController(renameFolderUseCase)
const renameFolderHandler = renameFolderController.handle.bind(renameFolderController)

export { renameFolderHandler }
