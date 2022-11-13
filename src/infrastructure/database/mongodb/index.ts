import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'
import { logger } from '../../logger/logger.config'

interface ICheckConnectionOptions {
  throwException?: boolean
}

class MongoDB {
  private _uri: string
  private _client: MongoClient
  private _database: string

  constructor() {
    this._uri = process.env.DB_URL || this._buildUri()
    this._database = String(process.env.DB_NAME)
    this._client = new MongoClient(this._uri)
  }

  public async checkConnection(): Promise<void> {
    try {
      const cli = await this._client.connect()
      const db = cli.db(this._database)
      const result = await db.command({ ping: 1 })

      if (!result?.ok) {
        logger.error('[MongoDB] Connection database is not ok')
      }

      this.createMongooseConnection()

      logger.info('[MongoDB] Connected successfully')
    } finally {
      this._client.close()
    }
  }

  public createMongooseConnection() {
    mongoose.connect(this._uri, { dbName: this._database, ignoreUndefined: true })
    return mongoose
  }

  private _buildUri(): string {
    const {
      DB_HOST: host,
      DB_PORT: port,
      DB_USER: user,
      DB_PASS: pass,
    } = process.env

    if (!host || !port || !user || !pass) {
      throw new Error('[MongoDB] Missing environment variables')
    }

    return `mongodb://${user}:${pass}@${host}:${port}`
  }
}

export { MongoDB }
