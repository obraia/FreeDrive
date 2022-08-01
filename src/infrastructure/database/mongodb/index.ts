import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

interface ICheckConnectionOptions {
  throwException?: boolean
}

class MongoDB {
  private _uri: string
  private _client: MongoClient
  private _database: string

  constructor() {
    this._uri = this._buildUri()
    this._database = String(process.env.DB_NAME)
    this._client = new MongoClient(this._uri)
  }

  public async checkConnection(options?: ICheckConnectionOptions): Promise<void> {
    try {
      const cli = await this._client.connect()
      const db = cli.db(this._database)
      const result = await db.command({ ping: 1 })

      if (!result?.ok) {
        console.error('[MongoDB] Connection database is not ok')
      }

      this.createMongooseConnection()

      console.log('[MongoDB] Connected successfully')
    } catch (err: any) {
      console.error(`[MongoDB] ${err.message}`)

      if (options?.throwException) {
        throw new Error(err.message || err)
      }
    } finally {
      this._client.close()
    }
  }

  public createMongooseConnection() {
    mongoose.connect(this._uri, { dbName: this._database })
    return mongoose
  }

  private _buildUri(): string {
    if (process.env.DB_URL) {
      return process.env.DB_URL
    }

    const host = process.env.DB_HOST
    const port = process.env.DB_PORT
    const user = process.env.DB_USER
    const pass = process.env.DB_PASS

    if (!host || !port || !user || !pass) {
      throw new Error('[MongoDB] Missing environment variables')
    }

    return `mongodb://${user}:${pass}@${host}:${port}`
  }
}

export { MongoDB }
