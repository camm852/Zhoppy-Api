import dotenv from 'dotenv'
import path from 'path'
import { Sequelize } from 'sequelize-typescript'
dotenv.config()

const db = new Sequelize({
  database: process.env.DATABASE_NAME ?? 'host',
  dialect: 'mysql',
  username: process.env.DATABASE_USERNAME ?? 'host',
  password: process.env.DATABASE_PASSWORD ?? 'host',
  models: [path.join(__dirname, '/models')]
})
export default db
