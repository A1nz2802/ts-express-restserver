import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { UserInterface } from './user'

export interface CustomRequest extends Request<{id?: string}, {}, {name?: string, category?: string, available?: string}> {
  uid?: string,
  user?: UserInterface | null
}

export interface CustomJwtPayload extends JwtPayload {
  uid?: string
}
