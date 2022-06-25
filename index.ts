import dotenv from 'dotenv';
import { ServerConfig } from './src/infrastructure/server/server.config';

dotenv.config();

const server = new ServerConfig();
server.start();
