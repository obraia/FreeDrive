import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { ServerConfig } from './src/infrastructure/server/server.config'

dotenvExpand.expand(dotenv.config())

const server = new ServerConfig()
server.start()
