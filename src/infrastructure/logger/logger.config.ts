import { createLogger, format, transports, addColors } from 'winston'
import path from 'path'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const logger = createLogger({
  level: 'http',
  levels,
  format: format.combine(
    format.simple(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, service, level, message }) => {
      return `[${timestamp}] ${service} ${level}: ${message}`
    }),
  ),
  transports: [
    new transports.Console({
      level: 'http'
    }),
    new transports.File({
      level: 'error',
      maxsize: 5120000,
      maxFiles: 5,
      dirname: path.join(__dirname, '..', '..', '..', 'logs'),
      filename: 'error.log',
    }),
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      dirname: path.join(__dirname, '..', '..', '..', 'logs'),
      filename: 'all.log',
    }),
  ],
  defaultMeta: { service: 'Freedrive' },
})

export { logger }
