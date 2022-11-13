import { FileRepository } from '../../../data/repositories/file.repository'
import { RenameFileUseCase } from '../../../domain/useCases/renameFile.useCase'
import { RenameFileController } from './renameFile.controller'

const fileRepository = new FileRepository()
const renameFileUseCase = new RenameFileUseCase(fileRepository)
const renameFileController = new RenameFileController(renameFileUseCase)
const renameFileHandler = renameFileController.handle.bind(renameFileController)

export { renameFileHandler }
