import { FileRepository } from '../../../data/repositories/file.repository'
import { DeleteFilesUseCase } from '../../../domain/useCases/deleteFiles.useCase'
import { DeleteFilesController } from './deleteFiles.controller'

const fileRepository = new FileRepository()
const deleteFilesUseCase = new DeleteFilesUseCase(fileRepository)
const deleteFilesController = new DeleteFilesController(deleteFilesUseCase)
const deleteFilesHandler = deleteFilesController.handle.bind(deleteFilesController)

export { deleteFilesHandler }
