import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import path from 'path'
import morganMiddleware from './morgan.middleware'
import { Routes } from '../routes/routes.config'

class AppConfig {
  private _app: express.Application

  constructor() {
    this._app = express()
    this.config()
    this.router()
    this.pages()
    this.static()
  }

  get app() {
    return this._app
  }

  private config(): void {
    this._app.use(helmet())
    this._app.use(compression())
    this._app.use(express.json({ limit: '300mb' }))
    this._app.use(express.urlencoded({ limit: '300mb', extended: false }))

    morganMiddleware(this._app)
    
    this._app.use(
      cors({
        credentials: true,
        origin: ['http://localhost:3000'],
        exposedHeaders: ['File-Name'],
      }),
    )
  }

  private router(): void {
    const { routes } = new Routes()
    this._app.use('/api', routes)
  }

  private pages(): void {
    const dir = path.join(__dirname, '..', '..', '..', 'public')
    this._app.use(express.static(dir))

    this._app.get('/*', (req, res, next) => {
      if (req.url.startsWith('/api/')) return next()
      res.sendFile(path.join(dir, 'index.html'))
    })
  }

  private static(): void {
    const filesDir = String(process.env.FILES_DIR)
    this._app.use('/api/static', express.static(filesDir))
  }
}

export { AppConfig }
