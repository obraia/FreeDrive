import { UserRepository } from "../../../../users/data/repositories/user.repository";
import { LoginUseCase } from "../../../domain/useCases/login.useCase";
import { LoginController } from "./login.controller";

const userRepository = new UserRepository();
const loginUseCase = new LoginUseCase(userRepository);
const loginController = new LoginController(loginUseCase);
const loginHandler = loginController.handle.bind(loginController);

export { loginHandler };