import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { UserInterface } from './user'

export interface CustomRequest extends Request {
  uid?: string,
  user?: UserInterface | null
}

export interface CustomJwtPayload extends JwtPayload {
  uid?: string
}
