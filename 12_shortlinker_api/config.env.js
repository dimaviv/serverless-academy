export const APP_PORT = process.env.APP_PORT  || "5000"
export const APP_URL = process.env.APP_URL  || `http://localhost:${APP_PORT}/`

// Postgres creds
export const POSTGRES_USER = process.env.POSTGRES_USER || "postgres"
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "1234"
export const POSTGRES_HOST = process.env.POSTGRES_HOST || "localhost"
export const POSTGRES_PORT = process.env.POSTGRES_PORT || "5570"
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || "postgres"
