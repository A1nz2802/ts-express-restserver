import { Schema, model } from 'mongoose'
import { UserInterface } from '../types/user'

const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  mail: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject()
  return user
}

export default model('User', UserSchema)