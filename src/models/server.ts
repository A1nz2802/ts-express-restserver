import express from 'express'
import cors from 'cors'

import dbConnection from '../database/config'
import userRouter from '../routes/user'

export default class Server {
  constructor (
    private readonly app = express(),
    private readonly port = process.env.PORT!,
    private readonly userPath = '/api/user'

  ) {
    this.connectDB()

    this.middlewares()

    this.routes()
  }

  async connectDB (): Promise<void> {
    await dbConnection()
  }

  middlewares (): void {
    // CORS
    this.app.use(cors())

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio público a servir
    this.app.use(express.static('src/public'))
  }

  routes (): void {
    this.app.use(this.userPath, userRouter)
  }

  listen (): void {
    this.app.listen(this.port, (): void => {
      console.log('Server running on port', this.port)
    })
  }
}
