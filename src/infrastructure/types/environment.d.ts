declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      NODE_ENV: 'development' | 'production'
      APP_URL: string
      INITIAL_DIR: string
      DRIVE_DIR: string
      THUMBS_DIR: string
      FILES_DIR: string
      JWT_SECRET: string
      JWT_EXPIRES_IN: string
      AUTH_SALT_ROUNDS: string
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
