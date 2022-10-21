import { FileRepository } from '../../../data/repositories/file.repository'
import { CreateFilesUseCase } from '../../../domain/useCases/createFiles.useCase'
import { CreateFilesController } from './createFiles.controller'

const fileRepository = new FileRepository()
const createFilesUseCase = new CreateFilesUseCase(fileRepository)
const createFilesController = new CreateFilesController(createFilesUseCase)
const createFilesHandler = createFilesController.handle.bind(createFilesController)

export { createFilesHandler }
