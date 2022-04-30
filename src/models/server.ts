import express from 'express'
import cors from 'cors'

import dbConnection from '../database/config'

import {
  authRouter,
  userRouter,
  categoryRouter,
  productRouter,
  searchRouter
} from '../routes'

export default class Server {
  constructor (
    private readonly app = express(),
    private readonly port = process.env.PORT!,
    private readonly paths = {
      auth: '/api/auth',
      user: '/api/user',
      category: '/api/category',
      product: '/api/product',
      search: '/api/search'
    }
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
    this.app.use(this.paths.auth, authRouter)
    this.app.use(this.paths.user, userRouter)
    this.app.use(this.paths.category, categoryRouter)
    this.app.use(this.paths.product, productRouter)
    this.app.use(this.paths.search, searchRouter)
  }

  listen (): void {
    this.app.listen(this.port, (): void => {
      console.log('Server running on port', this.port)
    })
  }
}
