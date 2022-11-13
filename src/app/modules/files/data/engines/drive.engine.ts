import { createWriteStream, unlink, WriteStream } from 'fs'
import type { Request } from 'express'
import type { PathLike } from 'fs'
import crypto from 'crypto'
import mkdirp from 'mkdirp'
import multer from 'multer'
import sharp from 'sharp'
import path from 'path'

export interface IMulterFile extends Express.Multer.File {
  pathThumb: PathLike
}

interface ITransform {
  quality: number
  size: {
    width: number
    height: number 
  }
}

interface IThumbOptions {
  dest: string
  transform: ITransform
}

interface IOptions extends multer.Options {
  dest: string
  transform?: ITransform
  thumb?: IThumbOptions
}

class LocalStorageEngine implements multer.StorageEngine {
  constructor(private _props: IOptions) {}

  _getDestination(
    req: Request,
    file: IMulterFile,
    cb: (error: Error | null, destination: string) => void,
  ) {
    cb(null, this._props.dest)
  }

  _getFilename(
    req: Request,
    file: IMulterFile,
    cb: (err: Error | null, buf: string | undefined) => void,
  ) {
    crypto.randomBytes(12, function (err, raw) {
      cb(err, err ? undefined : raw.toString('hex'))
    })
  }

  _handleFile(
    req: Request,
    file: IMulterFile,
    cb: (error?: any, info?: Partial<IMulterFile>) => void,
  ) {
    this._getFilename(req, file, (error, filename) => {
      if (!filename) return cb(error)

      const filePath = path.join(this._props.dest, filename)
      const ws = createWriteStream(filePath)

      const isImage = file.mimetype.startsWith('image')

      if (isImage && this._props.transform) {
        const { quality, size: { width, height } } = this._props.transform

        const transform = sharp()
          .jpeg({ quality })
          .resize(width, height, { fit: 'inside' })

        file.stream.pipe(transform).pipe(ws)
        file.mimetype = 'image/jpeg'
      } else {
        file.stream.pipe(ws)
      }

      if (isImage && this._props.thumb) {
        const { dest, transform: { quality, size: { width, height }} } = this._props.thumb

        const thumbPath = path.join(dest, filename)
        const wsThumb = createWriteStream(thumbPath)
        const transform = sharp().webp({ quality }).resize(width, height)
        
        file.stream.pipe(transform).pipe(wsThumb)
      }

      ws.on('error', (error) => cb(error))

      ws.on('close', () => {
        cb(null, {
          fieldname: file.fieldname,
          originalname: file.originalname.replace(/\.[^.]+$/, ''),
          mimetype: file.mimetype,
          destination: this._props.dest,
          filename: filename,
          encoding: file.encoding,
          size: ws.bytesWritten,
          path: filePath,
        })
      })
    })

    file.stream.on('error', (error) => cb(error))
  }

  _removeFile(
    req: Request,
    file: IMulterFile & { name: string },
    cb: (error: Error | null) => void,
  ) {
    unlink(file.path, (error) => {
      if (error) {
        return cb(error)
      }

      unlink(file.pathThumb, (error) => {
        if (error) {
          return cb(error)
        }
      })
    })
  }
}

export default (opts: IOptions) => {
  mkdirp.sync(opts.dest)

  if (opts.thumb) {
    mkdirp.sync(opts.thumb.dest)
  }

  const storage = new LocalStorageEngine(opts)

  return multer({
    storage,
  })
}
