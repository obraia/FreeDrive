import { UserRepository } from "../../../data/repositories/user.repository";
import { DeleteUserUseCase } from "../../../domain/useCases/deleteUser.useCase";
import { DeleteUserController } from "./deleteUser.controller";

const userRepository = new UserRepository();
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const deleteUserController = new DeleteUserController(deleteUserUseCase);
const deleteUserHandler = deleteUserController.handle.bind(deleteUserController);

export { deleteUserHandler };