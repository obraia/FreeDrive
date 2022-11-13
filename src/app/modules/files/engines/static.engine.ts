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

interface IOptions extends multer.Options {
  dest: string
  destThumb: string
}

class LocalStorageEngine implements multer.StorageEngine {
  constructor(private _staticPath: string, private _staticThumbPath: string) {}

  _getDestination(
    req: Request,
    file: IMulterFile,
    cb: (error: Error | null, destination: string, destinationThumb: string) => void,
  ) {
    cb(null, this._staticPath, this._staticThumbPath)
  }

  _getFilename(
    req: Request,
    file: IMulterFile,
    cb: (err: Error | null, buf: string | undefined) => void,
  ) {
    crypto.randomBytes(16, function (err, raw) {
      cb(err, err ? undefined : raw.toString('hex'))
    })
  }

  _handleFile(
    req: Request,
    file: IMulterFile,
    cb: (error?: any, info?: Partial<IMulterFile>) => void,
  ) {
    this._getDestination(req, file, (error, destination, destinationThumb) => {
      if (error) return cb(error)

      this._getFilename(req, file, (error, buf) => {
        if (!buf) return cb(error)

        const newPath = path.join(destination, file.originalname)
        const newThumbPath = path.join(destinationThumb, buf)

        let writeStream: WriteStream

        if (file.mimetype.startsWith('image')) {
          writeStream = createWriteStream(newPath)
          const traformStatic = sharp().jpeg().resize(1200, 1200, { fit: 'inside' })
          file.stream.pipe(traformStatic).pipe(writeStream)

          const writeStreamThumb = createWriteStream(newThumbPath)
          const traformThumb = sharp().jpeg().resize(200, 200)
          file.stream.pipe(traformThumb).pipe(writeStreamThumb)
        } else {
          writeStream = createWriteStream(newPath)
          file.stream.pipe(writeStream)
        }

        writeStream.on('error', (error) => cb(error))

        writeStream.on('close', () => {
          cb(null, {
            fieldname: file.fieldname,
            originalname: file.originalname,
            mimetype: file.mimetype,
            destination: destination,
            filename: buf,
            encoding: file.encoding,
            size: writeStream.bytesWritten,
            path: newPath,
          })
        })
      })
    })

    file.stream.on('error', cb)
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
  mkdirp.sync(opts.destThumb)

  const storage = new LocalStorageEngine(opts.dest, opts.destThumb)

  return multer({
    storage,
  })
}
