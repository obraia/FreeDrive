import { FolderRepository } from '../../../data/repositories/folder.repository'
import { DownloadFoldersUseCase } from '../../../domain/useCases/downloadFolders.useCase'
import { DownloadFoldersController } from './downloadFolders.controller'

const folderRepository = new FolderRepository()
const downloadFoldersUseCase = new DownloadFoldersUseCase(folderRepository)
const downloadFoldersController = new DownloadFoldersController(downloadFoldersUseCase)
const downloadFoldersHandler = downloadFoldersController.handle.bind(downloadFoldersController)

export { downloadFoldersHandler }
