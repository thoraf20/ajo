import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

export const dataSource = new DataSource({
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: Number(`${process.env.DB_PORT}`),
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: [],
  migrations: ['src/migrations/**/*.ts'],
  synchronize: false,
  logging: ['error'],
//   ssl: {
//     rejectUnauthorized: false,
//   },
})