import express from 'express'
import session from 'express-session'
import userRoutes from '../routes/users'
import providerRoutes from '../routes/providers'
import cors from 'cors'
import db from '../db/connection'
import morgan from 'morgan'
import multer from 'multer'
import path from 'path'
import shoesRoutes from '../routes/shoes'

class Server {
  private readonly app: express.Application
  private readonly port: string

  // routes
  private readonly apiRoutes = {
    users: '/api/users',
    providers: '/api/providers',
    shoes: '/api/shoes'
  }

  constructor () {
    this.app = express()
    this.port = process.env.PORT ?? '5000'
    void this.dbConnection()
    this.middlewares()
    this.routes()
  }

  middlewares (): void {
    // morgan
    this.app.use(morgan('dev'))

    // Cors
    this.app.use(cors())

    // JSON body
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(session({
      secret: process.env.SESSION_SECRET ?? 'session_secret',
      resave: false,
      saveUninitialized: false
    }))

    // multer
    const storage = multer.diskStorage({
      destination: path.join(path.join(__dirname, '/../public/uploads')),
      filename: (_req, file, callback): void => {
        callback(null, `${new Date().getTime()} + ${path.extname(file.originalname)}`) // callback que termina con la ejecucion de filename, recibe un error y el nombre del archivo
      }
    })
    this.app.use(multer({ storage }).single('image'))
  }

  async dbConnection (): Promise<void> {
    try {
      void db.authenticate().then(async () => {
        try {
          await db.sync()
        } catch (error) {
          console.log(error)
        } finally {
          console.log('Database Online')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  listen (): void {
    this.app.listen(this.port, () => {
      console.log(`server listen port ${this.port}`)
    })
  }

  routes (): void {
    this.app.use(this.apiRoutes.users, userRoutes)
    this.app.use(this.apiRoutes.providers, providerRoutes)
    this.app.use(this.apiRoutes.shoes, shoesRoutes)
  }
}

export default Server
