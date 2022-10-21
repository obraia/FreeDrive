import { UserRepository } from "../../../data/repositories/user.repository";
import { UpdateUserUseCase } from "../../../domain/useCases/updateUser.useCase";
import { UpdateUserController } from "./updateUser.controller";

const userRepository = new UserRepository();
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const updateUserController = new UpdateUserController(updateUserUseCase);
const updateUserHandler = updateUserController.handle.bind(updateUserController);

export { updateUserHandler };