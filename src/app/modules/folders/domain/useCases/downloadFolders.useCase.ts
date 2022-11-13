import mime from 'mime-types'
import AdmZip from 'adm-zip'
import { Result } from '../../../shared/helpers/result.helper'
import { UseCase } from '../../../shared/domain/dto/useCase.dto'
import { FolderRepository } from '../../data/repositories/folder.repository'
import { FolderDTO } from '../entities/folder.entity'

interface RequestDTO {
  userId: string
  foldersIds: string[]
}

interface ResponseDTO {
  file: Buffer
}

class DownloadFoldersUseCase implements UseCase<RequestDTO, Result<ResponseDTO>> {
  constructor(private readonly folderRepository: FolderRepository) {}

  private async createZip(folders: FolderDTO[]) {
    const zip = new AdmZip()

    for (const folder of folders) {
      // zip.addLocalFile(file.path, '', `${file.originalName}.${mime.extension(file.mimetype)}`)
    }

    return zip.toBuffer()
  }

  async execute(request: RequestDTO): Promise<Result<ResponseDTO>> {
    const { userId, foldersIds } = request

    const folders = await this.folderRepository.findRecusive({
      ids: foldersIds,
      userId,
    })

    if (!folders.length) {
      return Result.notFound<ResponseDTO>('Folders not found')
    }

    const file = await this.createZip(folders)

    return Result.ok<ResponseDTO>({ file })
  }
}

export { DownloadFoldersUseCase }
