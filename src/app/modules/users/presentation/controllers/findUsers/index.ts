import { UserRepository } from '../../../data/repositories/user.repository'
import { FindUsersUseCase } from '../../../domain/useCases/findUsers.useCase'
import { FindUsersController } from './findUsers.controller'

const userRepository = new UserRepository()
const findUsersUseCase = new FindUsersUseCase(userRepository)
const findUsersController = new FindUsersController(findUsersUseCase)
const findUsersHandler = findUsersController.handle.bind(findUsersController)

export { findUsersHandler }
