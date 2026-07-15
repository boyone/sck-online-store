import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

export function createConnection(): mysql.Connection {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
}
