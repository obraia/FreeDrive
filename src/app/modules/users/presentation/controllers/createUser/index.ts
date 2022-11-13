import { UserRepository } from "../../../data/repositories/user.repository";
import { CreateUserUseCase } from "../../../domain/useCases/createUser.useCase";
import { CreateUserController } from "./createUser.controller";

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);
const createUserHandler = createUserController.handle.bind(createUserController);

export { createUserHandler };