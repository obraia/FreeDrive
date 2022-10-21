import { FolderRepository } from '../../../data/repositories/folder.repository'
import { FavoriteFoldersUseCase } from '../../../domain/useCases/favoriteFolders.useCase'
import { FavoriteFoldersController } from './favoriteFolders.controller'

const folderRepository = new FolderRepository()
const favoriteFoldersUseCase = new FavoriteFoldersUseCase(folderRepository)
const favoriteFoldersController = new FavoriteFoldersController(favoriteFoldersUseCase)
const favoriteFoldersHandler = favoriteFoldersController.handle.bind(favoriteFoldersController)

export { favoriteFoldersHandler }
