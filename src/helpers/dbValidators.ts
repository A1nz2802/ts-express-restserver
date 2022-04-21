import Role from '../models/role'
import User from '../models/user'

const isValidRole = async (role: string = '') => {
  const existRole = await Role.findOne({ role })
  if (!existRole) {
    throw new Error(`Role ${role} does not exist in the database`)
  }
}

// Verificar si el correo existe
const existMail = async (mail: string = '') => {
  const userDB = await User.findOne({ mail })

  if (userDB) {
    throw new Error(`EMail ${mail} is already registered`)
  }
}

const userExistsById = async (id: string) => {
  const userDB = await User.findById(id)

  if (!userDB) {
    throw new Error(`${id} doesn't exist`)
  }
}

export {
  isValidRole,
  existMail,
  userExistsById
}
