import { Schema, model } from 'mongoose'
import { ProductInterface } from '../types/product'

const ProductSchema = new Schema<ProductInterface>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  state: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  }
})

ProductSchema.methods.toJSON = function () {
  const { __v, state, ...product } = this.toObject()
  return product
}

export default model('Product', ProductSchema)
