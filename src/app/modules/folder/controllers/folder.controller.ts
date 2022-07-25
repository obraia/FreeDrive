import { boundClass } from 'autobind-decorator'
import { Response, Request } from 'express'
import { Types } from 'mongoose'
import AdmZip from 'adm-zip'
import stream from 'stream'

import { BaseController } from '../../shared/controllers/base.controller'
import { FolderRepository } from '../repositories/folder.repository'
import { BadRequestException } from '../../shared/exceptions/badRequest.exception'
import { NotfoundException } from '../../shared/exceptions/notfound.exception'
import { IFolder } from '../models/folder.interface'
import { FsHelper } from '../../../utils/helpers/fs.helper'

@boundClass
class FolderController extends BaseController<IFolder> {
  constructor() {
    super(new FolderRepository())
  }

  public override async find(req: Request, res: Response) {
    const { parentId, deleted, favorite } = req.query

    const params = {} as any

    if (parentId) {
      params.parentId = parentId
    }

    if (deleted) {
      params.deleted = deleted === 'true'
    }

    if (favorite) {
      params.favorite = favorite === 'true'
    }

    try {
      const result = await this.repository.findAll(params)
      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  async findDeepById(req: Request, res: Response) {
    const { id } = req.params
    const { deleted, favorite } = req.query

    const params = {} as any

    if (deleted) {
      params.deleted = deleted === 'true'
    }

    if (favorite) {
      params.favorite = favorite === 'true'
    }

    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid id')
      }

      const [result] = await this.repository.findDeepById(id, params)

      if (!result) {
        throw new NotfoundException('Folder not found')
      }

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async favorite(req: Request, res: Response) {
    const { ids, favorite } = req.body

    try {
      if (Array.from<string>(ids).some((id) => !Types.ObjectId.isValid(id))) {
        throw new BadRequestException('Invalid ids')
      }

      const result = await this.repository.favorite(ids, Boolean(favorite))

      if (!result) {
        throw new NotfoundException('Not found')
      }

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async move(req: Request, res: Response) {
    const { ids, parentId } = req.body

    try {
      if (Array.from<string>(ids).some((id) => !Types.ObjectId.isValid(id))) {
        throw new BadRequestException('Invalid ids')
      }

      if (!Types.ObjectId.isValid(parentId)) {
        throw new BadRequestException('Invalid parent id')
      }

      const result = await this.repository.move(ids, parentId)

      if (!result) {
        throw new NotfoundException('Not found')
      }

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async getDiskSpace(req: Request, res: Response) {
    try {
      const result = await FsHelper.getDiskSpace()
      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async moveToTrash(req: Request, res: Response) {
    const { ids } = req.body

    try {
      if (Array.from<string>(ids).some((id) => !Types.ObjectId.isValid(id))) {
        throw new BadRequestException('Invalid ids')
      }

      const result = await this.repository.moveToTrash(ids)

      if (!result) {
        throw new NotfoundException('Not found')
      }

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async rename(req: Request, res: Response) {
    const { id } = req.params
    const { folderName } = req.body

    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid id')
      }

      const result = await this.repository.rename(id, folderName)

      if (!result) {
        throw new NotfoundException('Not found')
      }

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async download(req: Request, res: Response) {
    const ids = req.query.ids as string[]

    try {
      if (Array.from<string>(ids).some((id) => !Types.ObjectId.isValid(id))) {
        throw new BadRequestException('Invalid ids')
      }

      const folders = await this.repository.findDeepChildren(
        ids.map((i) => new Types.ObjectId(i)),
      )

      if (!folders.length) {
        throw new NotfoundException('Not found')
      }

      if (
        folders.every((f: any) => f.children.length === 0 && f.files.length === 0)
      ) {
        throw new BadRequestException('No files to download')
      }

      const mainFolder = {
        folderName: '',
        children: folders,
        path: '/',
      }

      const allFolders = await this._recursiveSearch(mainFolder)

      const zip = new AdmZip()
      const rs = new stream.PassThrough()
      const zipName = `freedrive_${Date.now()}.zip`

      allFolders.forEach((folder) => {
        folder.files.forEach((file: any) => {
          zip.addLocalFile(file.path, folder.path, file.originalName)
        })
      })

      rs.end(zip.toBuffer())
      res.setHeader('Content-disposition', 'attachment; filename=' + zipName)
      res.setHeader('Content-Type', 'application/zip')
      res.setHeader('File-Name', zipName)

      return rs.pipe(res)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  private async _recursiveSearch(
    parent: Partial<IFolder> & { path: string },
    folders = [] as any[],
  ) {
    for (const child of parent.children!) {
      const path = `${parent.path}/${child.folderName}`

      const [childFolder] = await this.repository.findDeepChildren([child._id])

      folders.push({
        folderName: childFolder.folderName,
        files: childFolder.files,
        path,
      })

      if (childFolder.children) {
        await this._recursiveSearch(
          { children: childFolder.children, path },
          folders,
        )
      }
    }

    return folders
  }
}

export { FolderController }
