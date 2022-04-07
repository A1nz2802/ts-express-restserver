import express from 'express';
import cors from 'express';

import userRouter from '../routes/user';

export default class Server {

  constructor(
    private app = express(),
    private port:string = process.env.PORT!,
    private userPath = '/api/user'
    
  ) {

    this.conectarDB();

    this.middlewares();

    this.routes();

  }
  
  async conectarDB(): Promise<void> {
    // await dbConnection();
  }

  middlewares() {

    // CORS
    this.app.use( cors() );

    // Lectura y parseo del body
    this.app.use( express.json() );

    // Directorio público a servir
    this.app.use( express.static('src/public'))

  }

  routes() {
    
    this.app.use( this.userPath, userRouter )
    
  }

  listen(): void {
    this.app.listen( this.port, (): void => {
      console.log('Server running on port', this.port )
    });
  }
}