import fs from 'fs';
import { ServerOptions } from "https";

class CertHelper {
  private keyPath?: string;
  private certPath?: string;
  private caPath?: string;
  private pfxPath?: string;
  private passphrase?: string;
  private options: ServerOptions = {};

  constructor() {
    this.keyPath = process.env.CERT_KEY;
    this.certPath = process.env.CERT_CERT;
    this.caPath = process.env.CERT_CA;
    this.pfxPath = process.env.CERT_PFX;
    this.passphrase = process.env.CERT_PASSPHRASE;
  }

  public getOptions(): ServerOptions {
    if (this.keyPath) this.options.key = fs.readFileSync(this.keyPath);
    if (this.certPath) this.options.cert = fs.readFileSync(this.certPath);
    if (this.caPath) this.options.ca = fs.readFileSync(this.caPath);
    if (this.pfxPath) this.options.pfx = fs.readFileSync(this.pfxPath);
    if (this.passphrase) this.options.passphrase = this.passphrase;

    return this.options;
  }

  public isHttps(): boolean {
    return Object.keys(this.options).length > 0;
  }
}

export { CertHelper };