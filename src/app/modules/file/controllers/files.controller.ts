import { boundClass } from 'autobind-decorator'
import { Request, Response } from 'express'
import { Types } from 'mongoose'
import AdmZip from 'adm-zip'
import stream from 'stream'
import { BaseController } from '../../shared/controllers/base.controller'
import { FileRepository } from '../repositories/file.repository'
import { BadRequestException } from '../../shared/exceptions/badRequest.exception'
import { NotfoundException } from '../../shared/exceptions/notfound.exception'
import { IFile } from '../models/file.interface'
import { FsHelper } from '../../../utils/helpers/fs.helper'

@boundClass
class FilesController extends BaseController<IFile> {
  constructor() {
    super(new FileRepository())
  }

  public override async find(req: Request, res: Response) {
    const { parentId, deleted, favorite, limit, page } = req.query

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

    if (req.decoded) {
      params.userId = req.decoded.id
    }

    try {
      const result = await this.repository.find(params, Number(limit), Number(page))

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async findByOriginalName(req: Request, res: Response) {
    const { parentId, originalName } = req.params

    const params = {
      parentId: new Types.ObjectId(parentId),
      originalName: { $regex: originalName, $options: 'i' },
    }

    try {
      const result = await this.repository.findOne(params)

      if (!result) {
        throw new NotfoundException('File not found')
      }

      res.setHeader('Content-Type', result.mimetype)
      res.setHeader('File-Name', result.originalName)

      return this.sendFile(res, result.path)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public override async create(
    req: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const { files, body, decoded } = req

    try {
      if (!(files instanceof Array)) {
        throw new BadRequestException('Invalid files')
      }

      if (!decoded) {
        throw new BadRequestException('Invalid decoded')
      }

      const filesMongo = files.map((file) =>
        this.repository.createDocument({
          _id: new Types.ObjectId(file.filename),
          fileName: file.filename,
          userId: decoded.id,
          parentId: body.parentId,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          path: file.path,
          favorite: false,
          deleted: false,
          createdAt: new Date(),
        }),
      )

      if (body.replace) {
        await this.repository.deleteByNames(
          files.map((file) => file.originalname),
          body.parentId,
        )
      }

      const result = await this.repository.create(filesMongo)

      return this.sendCreated(res, result)
    } catch (e: any) {
      this.sendError(res, e)
    }
  }

  public async rename(req: Request, res: Response) {
    const { id } = req.params
    const { originalName } = req.body

    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid id')
      }

      const result = await this.repository.rename(id, originalName)

      if (!result) {
        throw new NotfoundException('Not found')
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

  public async downloadById(req: Request, res: Response) {
    const { id } = req.params

    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid id')
      }

      const result = await this.repository.findById(id)

      if (!result) {
        throw new NotfoundException('Not found')
      }

      res.setHeader(
        'Content-disposition',
        'attachment; filename=' + result.originalName,
      )
      res.setHeader('Content-Type', result.mimetype)
      res.setHeader('File-Name', result.originalName)

      return this.sendDownload(res, result.path)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async downloadMany(req: Request, res: Response) {
    const ids = req.query.ids as string[]

    try {
      if (Array.from<string>(ids).some((id) => !Types.ObjectId.isValid(id))) {
        throw new BadRequestException('Invalid ids')
      }

      const results = await this.repository.findAll({ _id: { $in: ids } })

      if (!results.length) {
        throw new NotfoundException('Not found')
      }

      const zip = new AdmZip()
      const rs = new stream.PassThrough()
      const zipName = `freedrive_${Date.now()}.zip`

      results.forEach((result) => {
        zip.addLocalFile(result.path, undefined, result.originalName)
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

  public override async deleteMany(req: Request, res: Response) {
    const ids = req.query.ids as string[]

    try {
      if (Array.from<string>(ids).some((id) => !Types.ObjectId.isValid(id))) {
        throw new BadRequestException('Invalid ids')
      }

      const result = await this.repository.deleteMany(ids)

      if (!result) {
        throw new NotfoundException('Not found')
      }

      FsHelper.deleteFiles(ids)

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }
}

export { FilesController }
