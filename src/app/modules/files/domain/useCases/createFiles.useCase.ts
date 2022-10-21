import { Types } from 'mongoose'
import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FileRepository } from '../../data/repositories/file.repository'

interface RequestDTO {
  userId: string
  parentId: string
  replace: boolean
  files: Express.Multer.File[]
}

interface ResponseDTO {
  message: string
}

class CreateFilesUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly userRepository: FileRepository) {}

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, parentId, files } = request

    const filesArray = files.map((file) => this.userRepository.createDocument({
      _id: new Types.ObjectId(file.filename),
      fileName: file.filename,
      userId,
      parentId,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      favorite: false,
      deleted: false,
      createdAt: new Date(),
      })
    )

    await this.userRepository.create(filesArray)

    return Result.ok<ResponseDTO>({ message: 'Files created' })
  }
}

export { CreateFilesUseCase }
