import { Schema, model } from 'mongoose'
import { RoleInterface } from '../types/role'

const RoleSchema = new Schema<RoleInterface>({
  role: {
    type: String,
    require: [true, 'Role is required']
  }
})

export default model('Role', RoleSchema)
