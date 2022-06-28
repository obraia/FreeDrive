import { Application } from 'express';
import https from 'https';
import http from 'http';

import { AppConfig } from '../middlewares/app.config';
import { CertHelper } from '../helpers/cert.helper';

class ServerConfig {
  private port: number;
  private app: Application;

  constructor() {
    this.app = new AppConfig().getApp();
    this.port = Number(process.env.PORT);
  }

  start() {
    const certHelper = new CertHelper();
    const options = certHelper.getOptions();
    const server = certHelper.isHttps() ? https.createServer(options, this.app) : http.createServer(this.app);

    server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export { ServerConfig };
