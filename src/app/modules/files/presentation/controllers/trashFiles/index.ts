import { FileRepository } from '../../../data/repositories/file.repository'
import { TrashFilesUseCase } from '../../../domain/useCases/trashFiles.useCase'
import { TrashFilesController } from './trashFiles.controller'

const fileRepository = new FileRepository()
const trashFilesUseCase = new TrashFilesUseCase(fileRepository)
const trashFilesController = new TrashFilesController(trashFilesUseCase)
const trashFilesHandler = trashFilesController.handle.bind(trashFilesController)

export { trashFilesHandler }
