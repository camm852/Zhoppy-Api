import dotenv from 'dotenv'
import Server from './config/server'

// variables de entorno
dotenv.config()

const server = new Server()

server.listen()
