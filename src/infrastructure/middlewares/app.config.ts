import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import path from 'path'
import { Routes } from '../routes/routes.config'

class AppConfig {
  private app: express.Application
  private env: string

  constructor() {
    this.env = process.env.NODE_ENV || 'development'
    this.app = express()
    this.config()
    this.router()
    this.pages()
    this.static()
  }

  public getApp() {
    return this.app
  }

  private config(): void {
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(compression())
    this.app.use(express.json({ limit: '300mb'}))
    this.app.use(express.urlencoded({ limit: '300mb', extended: false}))

    this.app.use(
      cors({
        credentials: true,
        origin: ['http://192.168.1.3:3000', 'http://localhost:3000'],
        exposedHeaders: ['File-Name'],
      }),
    )
  }

  private router(): void {
    const routes = new Routes()
    this.app.use('/api', routes.getRouter())
  }

  private pages(): void {
    const dir = path.join(__dirname, '..', '..', '..', 'public')

    this.app.use(express.static(dir))

    this.app.get('/*', (req, res, next) => {
      if (req.url.startsWith('/api/')) return next()

      res.sendFile(path.join(dir, 'index.html'))
    })
  }

  private static(): void {
    const filesDir = String(process.env.FILES_DIR)
    this.app.use('/api/static', express.static(filesDir))
  }
}

export { AppConfig }
