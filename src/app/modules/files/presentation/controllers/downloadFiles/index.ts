import { FileRepository } from '../../../data/repositories/file.repository'
import { DownloadFilesUseCase } from '../../../domain/useCases/downloadFiles.useCase'
import { DownloadFilesController } from './downloadFiles.controller'

const fileRepository = new FileRepository()
const downloadFilesUseCase = new DownloadFilesUseCase(fileRepository)
const downloadFilesController = new DownloadFilesController(downloadFilesUseCase)
const downloadFilesHandler = downloadFilesController.handle.bind(downloadFilesController)

export { downloadFilesHandler }
