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
    this.storage()
  }

  public getApp() {
    return this.app
  }

  private config(): void {
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))

    this.app.use(
      cors({
        credentials: true,
        origin: 'http://localhost:3000',
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

  private storage(): void {
    const thumbsDir = String(process.env.THUMBS_DIR)
    const filesDir = String(process.env.FILES_DIR)

    this.app.use('/api/static/thumbs', express.static(thumbsDir))

    this.app.use('/api/static/files', (req, res, next) => {
      const { mimetype } = req.query

      if (mimetype) {
        res.setHeader('Content-Type', String(mimetype))
      }

      express.static(filesDir)(req, res, next)
    })
  }
}

export { AppConfig }
