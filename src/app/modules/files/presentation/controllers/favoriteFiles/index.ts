import { FileRepository } from '../../../data/repositories/file.repository'
import { FavoriteFilesUseCase } from '../../../domain/useCases/favoriteFiles.useCase'
import { FavoriteFilesController } from './favoriteFiles.controller'

const fileRepository = new FileRepository()
const favoriteFilesUseCase = new FavoriteFilesUseCase(fileRepository)
const favoriteFilesController = new FavoriteFilesController(favoriteFilesUseCase)
const favoriteFilesHandler = favoriteFilesController.handle.bind(favoriteFilesController)

export { favoriteFilesHandler }
