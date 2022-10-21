import { FileRepository } from '../../../data/repositories/file.repository'
import { FindFilesUseCase } from '../../../domain/useCases/findFiles.useCase'
import { FindFilesController } from './findFiles.controller'

const fileRepository = new FileRepository()
const findFilesUseCase = new FindFilesUseCase(fileRepository)
const findFilesController = new FindFilesController(findFilesUseCase)
const findFilesHandler = findFilesController.handle.bind(findFilesController)

export { findFilesHandler }
