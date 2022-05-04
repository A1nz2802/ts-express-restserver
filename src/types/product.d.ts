import { Document } from 'mongoose'
import { CategoryInterface } from './category'
import { UserInterface } from './user'

export interface ProductInterface extends Document {
  name: string,
  state: Boolean,
  user: UserInterface,
  price: Number,
  category: CategoryInterface,
  description: string,
  available: Boolean,
  img: string,
}
