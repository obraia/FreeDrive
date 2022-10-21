import http from 'http'
import { Application } from 'express'
import { MongoDB } from '../database/mongodb'

class ServerConfig {
  private port: number
  private env: string

  constructor(private app: Application) {
    this.port = Number(process.env.PORT)
    this.env = process.env.NODE_ENV
  }

  start() {
    new MongoDB()
      .checkConnection({ throwException: true })
      .then(() => {
        http.createServer(this.app).listen(this.port, () => {
          console.log(
            `[Server] Running on port ${this.port} with ${this.env} enviroment`,
          )
        })
      })
      .catch((err) => {
        console.error(err)
        process.exit(1)
      })
  }
}

export { ServerConfig }
