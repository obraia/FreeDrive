import { boundClass } from 'autobind-decorator'
import { Request, Response } from 'express'
import { Types } from 'mongoose'
import AdmZip from 'adm-zip'
import stream from 'stream'
import mime from 'mime-types'
import { BaseController } from '../../../shared/presentation/controllers/base.controller'
import { FileRepository } from '../../data/repositories/file.repository'
import { BadRequestException } from '../../../shared/presentation/errors/badRequest.error'
import { NotFoundException } from '../../../shared/presentation/errors/notFound.error'
import { IFile } from '../domain/entities/file.interface'
import { FsHelper } from '../../../../utils/helpers/fs.helper'
import { Params } from '../../../shared/helpers/params.helper'

@boundClass
class FilesController extends BaseController<IFile> {
  constructor() {
    super(new FileRepository())
  }

  public override async find(req: Request, res: Response) {
    const {
      decoded,
      query: { parentId, deleted, favorite, originalName, limit, page },
    } = req

    try {
      const result = await this.repository.find(
        {
          userId: decoded.id,
          parentId: Params.string(parentId),
          deleted: Params.boolean(deleted),
          favorite: Params.boolean(favorite),
          originalName: Params.like(originalName),
        },
        {
          page: Params.number(page),
          limit: Params.number(limit),
          projection: ['id', 'originalName', 'fileName', 'mimetype'],
        },
      )

      return this.sendSuccess(res, result)
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

      const filesMongo = files.map((file) =>
        this.repository.createDocument({
          _id: new Types.ObjectId(file.filename),
          fileName: file.filename,
          userId: decoded!.id,
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

      if (body.replace === 'true') {
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
    const {
      params: { id },
      body: { originalName },
      decoded,
    } = req

    try {
      super.validateId(id)

      const result = await this.repository.rename({
        id,
        originalName,
        userId: decoded.id,
      })

      if (!result) {
        throw new NotFoundException('Not found')
      }

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async favorite(req: Request, res: Response) {
    const {
      body: { favorite, ids },
      decoded,
    } = req

    try {
      super.validateIds(ids)

      const result = await this.repository.favorite({
        ids,
        favorite,
        userId: decoded.id,
      })

      if (!result) {
        throw new NotFoundException('Not found')
      }

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async move(req: Request, res: Response) {
    const {
      body: { ids, parentId },
      decoded,
    } = req

    try {
      super.validateIds(ids)
      super.validateId(parentId)

      const result = await this.repository.move({
        ids,
        parentId,
        userId: decoded.id,
      })

      if (!result) {
        throw new NotFoundException('Not found')
      }

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async moveToTrash(req: Request, res: Response) {
    const {
      body: { ids },
      decoded,
    } = req

    try {
      super.validateIds(ids)

      const result = await this.repository.moveToTrash({
        ids,
        userId: decoded.id,
      })

      if (!result) {
        throw new NotFoundException('Not found')
      }

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async downloadById(req: Request, res: Response) {
    const { id } = req.params

    try {
      super.validateId(id)

      const result = await this.repository.findById(id)

      if (!result) {
        throw new NotFoundException('Not found')
      }

      const fileName = `${result.originalName}.${mime.extension(result.mimetype)}`

      res.setHeader('Content-disposition', 'attachment; filename=' + fileName)
      res.setHeader('Content-Type', result.mimetype)
      res.setHeader('File-Name', fileName)

      return this.sendDownload(res, result.path)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }

  public async downloadMany(req: Request, res: Response) {
    const {
      query: { ids },
      decoded,
    } = req

    try {
      if (typeof ids !== 'string') {
        throw new BadRequestException('Invalid ids')
      }

      const idsArray = ids.split(';')
      super.validateIds(idsArray)

      const results = await this.repository.findAll({
        _id: { $in: idsArray },
        userId: decoded.id,
      })

      if (!results.length) {
        throw new NotFoundException('Not found')
      }

      const zip = new AdmZip()
      const rs = new stream.PassThrough()
      const zipName = `freedrive_${Date.now()}.zip`

      results.forEach((result) => {
        zip.addLocalFile(
          result.path,
          undefined,
          `${result.originalName}.${mime.extension(result.mimetype)}`,
        )
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
    const { ids } = req.body

    try {
      super.validateIds(ids)

      const result = await this.repository.deleteMany(ids)

      if (!result) {
        throw new NotFoundException('Not found')
      }

      FsHelper.deleteFiles(ids)

      return this.sendSuccess(res, result)
    } catch (error: any) {
      this.sendError(res, error)
    }
  }
}

export { FilesController }
