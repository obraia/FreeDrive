declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      NODE_ENV: 'development' | 'production'
      APP_URL: string
      DRIVE_DIR: string
      THUMBS_DIR: string
      FILES_DIR: string
      DB_URL: string
      DB_HOST: string
      DB_NAME: string
      DB_PORT: string
      DB_USER: string
      DB_PASS: string
    }
  }
}

export {}
