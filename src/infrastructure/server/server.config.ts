import http from 'http'
import { Application } from 'express'
import { MongoDB } from '../database/mongodb'
import { logger } from '../logger/logger.config'

class ServerConfig {
  private port: number
  private env: string

  constructor(private app: Application) {
    this.port = Number(process.env.PORT)
    this.env = process.env.NODE_ENV
  }

  start() {
    new MongoDB()
      .checkConnection()
      .then(() => {
        http.createServer(this.app).listen(this.port, () => {
          logger.info(
            `[Server] Running on port ${this.port} with ${this.env} enviroment`,
          )
        })
      })
      .catch((err) => {
        logger.error(`[MongoDB] ${err.message}`)
        process.exit(1)
      })
  }
}

export { ServerConfig }
