import { Document } from 'mongoose'
import { UserInterface } from './user'

export interface CategoryInterface extends Document {
  name: string,
  state: Boolean,
  user: UserInterface,
}
