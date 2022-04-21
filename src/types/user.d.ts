import { Document } from 'mongoose'

export interface UserInterface extends Document {
  name: string
  mail: string
  password: string
  img?: string
  role: string
  state: Boolean
  google: Boolean
}
