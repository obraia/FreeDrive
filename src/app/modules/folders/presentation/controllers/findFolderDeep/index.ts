import { FolderRepository } from '../../../data/repositories/folder.repository'
import { FindFolderDeepUseCase } from '../../../domain/useCases/findFolderDeep.useCase'
import { FindFolderDeepController } from './findFolderDeep.controller'

const folderRepository = new FolderRepository()
const findFolderDeepUseCase = new FindFolderDeepUseCase(folderRepository)
const findFolderDeepController = new FindFolderDeepController(findFolderDeepUseCase)
const findFolderDeepHandler = findFolderDeepController.handle.bind(findFolderDeepController)

export { findFolderDeepHandler }
