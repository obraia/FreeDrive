import { AuthUseCase } from "../../../domain/useCases/auth.useCase";
import { AuthMiddleware } from "./auth.middleware";

const authUseCase = new AuthUseCase();
const authMiddleware = new AuthMiddleware(authUseCase);
const authHandler = authMiddleware.handle.bind(authMiddleware);

export { authHandler };