import { UserRepository } from "../../../data/repositories/user.repository";
import { FindUserUseCase } from "../../../domain/useCases/findUser.useCase";
import { FindCurrentUserController } from "./findCurrentUser.controller";

const userRepository = new UserRepository();
const findUserUseCase = new FindUserUseCase(userRepository);
const findCurrentUserController = new FindCurrentUserController(findUserUseCase);
const findCurrentUserHandler = findCurrentUserController.handle.bind(findCurrentUserController);

export { findCurrentUserHandler };