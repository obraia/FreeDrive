import { FileRepository } from '../../../data/repositories/file.repository'
import { FindFileUseCase } from '../../../domain/useCases/findFile.useCase'
import { FindFileController } from './findFile.controller'

const fileRepository = new FileRepository()
const findFileUseCase = new FindFileUseCase(fileRepository)
const findFileController = new FindFileController(findFileUseCase)
const findFileHandler = findFileController.handle.bind(findFileController)

export { findFileHandler }
