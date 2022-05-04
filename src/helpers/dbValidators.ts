import { Role, User, Category, Product } from '../models'

// Validar si existe el rol
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

// Verificar si existe el usuario por ID
const userExistsById = async (id: string) => {
  const userDB = await User.findById(id)

  if (!userDB) {
    throw new Error(`${id} doesn't exist`)
  }
}

// Verificar si existe la categoria por ID
const categoryExistsById = async (id: string) => {
  const categoryDB = await Category.findById(id)

  if (!categoryDB) {
    throw new Error(`${id} doesn't exist`)
  }
}

// Verificar si existe producto por ID
const productExistsById = async (id: string) => {
  const productDB = await Product.findById(id)

  if (!productDB) {
    throw new Error(`${id} doesn't exist`)
  }
}

/**
 * Verificar si la coleccion obtenida de la
  req.param existe en la/s coleccion/es especificadas
  por el middleware
 */
const allowedCollections = (collection = '', collections ?: string[]) => {
  const areCollections = collections?.includes(collection)

  if (!areCollections) {
    throw new Error(`Collection ${collection} is not allowed. Allowed Collections: ${collections}`)
  }

  return true
}
export {
  isValidRole,
  existMail,
  userExistsById,
  categoryExistsById,
  productExistsById,
  allowedCollections
}
