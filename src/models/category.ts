import { Schema, model } from 'mongoose'
import { CategoryInterface } from '../types/category'

const CategorySchema = new Schema<CategoryInterface>({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  state: {
    type: Boolean,
    default: true,
    required: true
  }
})

CategorySchema.methods.toJSON = function () {
  const { __v, ...category } = this.toObject()
  return category
}

export default model('Category', CategorySchema)
