import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import { Routes } from '../routes/routes.config';

class AppConfig {
  private app: express.Application;
  private env: string;

  constructor() {
    this.env = process.env.NODE_ENV || 'development';
    this.app = express();
    this.config();
    this.router();
    this.pages();
    this.storage();
  }

  public getApp() {
    return this.app;
  }

  private config(): void {
    this.app.use(helmet({ contentSecurityPolicy: false }));
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private router(): void {
    const routes = new Routes();
    this.app.use('/api', routes.getRouter());
  }

  private pages(): void {
    const dir =
      this.env === 'production'
        ? path.join(__dirname, '..', '..', '..', 'public')
        : path.join(__dirname, '..', '..', '..', 'dist', 'public');

    this.app.use(express.static(dir));

    this.app.get('/*', (req, res, next) => {
      if (req.url.startsWith('/api/')) return next();

      res.sendFile(path.join(dir, 'index.html'));
    });
  }

  private storage(): void {
    const baseDir = String(process.env.STATIC_DIR);
    this.app.use('/api/static', express.static(baseDir, { dotfiles: 'allow' }));
  }
}

export { AppConfig };
