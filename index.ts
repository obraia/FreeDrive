import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { AppConfig } from './src/infrastructure/middlewares/app.config'
import { ServerConfig } from './src/infrastructure/server/server.config'

dotenvExpand.expand(dotenv.config())

const { app } = new AppConfig()
const server = new ServerConfig(app)

server.start()
