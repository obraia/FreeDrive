import { FindDiskUseCase } from "../../../domain/useCases/findDisk.useCase";
import { FindDiskController } from "./findDisk.controller";

const findDiskUseCase = new FindDiskUseCase();
const findDiskController = new FindDiskController(findDiskUseCase);
const findDiskHandler = findDiskController.handle.bind(findDiskController);

export { findDiskHandler };