import { FileRepository } from '../../../data/repositories/file.repository'
import { DownloadFileUseCase } from '../../../domain/useCases/downloadFile.useCase'
import { DownloadFileController } from './downloadFile.controller'

const fileRepository = new FileRepository()
const downloadFileUseCase = new DownloadFileUseCase(fileRepository)
const downloadFileController = new DownloadFileController(downloadFileUseCase)
const downloadFileHandler = downloadFileController.handle.bind(downloadFileController)

export { downloadFileHandler }
