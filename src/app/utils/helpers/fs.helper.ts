import fs from 'fs'
import path from 'path'
import checkdisk from 'check-disk-space'

class FsHelper {
  static async getDiskSpace() {
    const baseDir = String(process.env.INITIAL_DIR)
    const disk = await checkdisk(baseDir)

    return {
      total: Number((disk.size / Math.pow(10, 9)).toFixed(2)),
      used: Number(((disk.size - disk.free) / Math.pow(10, 9)).toFixed(2)),
    }
  }

  static async deleteFiles(files: string[]) {
    const { FILES_DIR, THUMBS_DIR } = process.env

    const promisesFiles = files.map((file) => {
      return fs.promises.unlink(path.join(FILES_DIR, file))
    })

    const promisesThumbs = files.map((file) => {
      return new Promise((resolve, reject) => {
        fs.open(path.join(THUMBS_DIR, file), 'r', (err, fd) => {
          if (err) return resolve(null)

          fs.unlink(path.join(THUMBS_DIR, file), (err) => {
            if (err) return reject(err)
            resolve(null)
          })
        })
      })
    })

    return Promise.all([promisesFiles, promisesThumbs])
  }
}

export { FsHelper }
