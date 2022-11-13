import { UserRepository } from "../../../data/repositories/user.repository";
import { FindUserUseCase } from "../../../domain/useCases/findUser.useCase";
import { FindUserController } from "./findUser.controller";

const userRepository = new UserRepository();
const findUserUseCase = new FindUserUseCase(userRepository);
const findUserController = new FindUserController(findUserUseCase);
const findUserHandler = findUserController.handle.bind(findUserController);

export { findUserHandler };