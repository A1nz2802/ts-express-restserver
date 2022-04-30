import { RequestHandler, Response } from 'express'
import mongoose from 'mongoose'
import { Category, Product, Role, User } from '../models'

const allowedCollections = [
  'user',
  'role',
  'category',
  'product'
]

// Esta función busca usario/s por mongoId, nombre o correo
const searhUser = async (term: string, res: Response) => {
  // Buscar usuario/s por mongoId
  const isMongoId = mongoose.Types.ObjectId.isValid(term)

  // Si term es un mongoId que existe, entonces busco al usuario
  if (isMongoId) {
    const userList = await User.findById(term)
    return res.json({
      results: userList ? [userList] : []
    })
  }

  // Expresión regular para que term sea insensible a las mayusculas
  const regex = new RegExp(term, 'i')

  // Buscar usuario/s por nombre o correo y que el usuario este activo
  const userList = await User.find({
    $or: [{ name: regex }, { mail: regex }],
    $and: [{ state: true }]
  })

  res.json({
    results: userList
  })
}

// Buscar roles por nombre
const searchRole = async (term: string, res: Response) => {
  const regex = new RegExp(term, 'i')

  const roleList = await Role.find({ role: regex })
  res.json({
    results: roleList
  })
}

// Buscar categoria por nombre
const searchCategory = async (term: string, res:Response) => {
  const regex = new RegExp(term, 'i')

  const categoryList = await Category.find({ name: regex })
  res.json({
    results: categoryList
  })
}

// Buscar producto por nombre y categoria
const searchProduct = async (term: string, res:Response) => {
  // Por categoria
  const isMongoId = mongoose.Types.ObjectId.isValid(term)

  if (isMongoId) {
    const productList = await Product.findById(term).populate('category', 'name')
    return res.json({
      results: productList ? [productList] : []
    })
  }

  const regex = new RegExp(term, 'i')

  const productList = await Product.find({ name: regex }).populate('category', 'name')
  res.json({
    results: productList
  })
}

const search: RequestHandler<{collection: string, term: string}> = async (req, res) => {
  const { collection, term } = req.params

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({ msg: `Allowed collections are: ${allowedCollections}` })
  }

  switch (collection) {
    case 'user':
      searhUser(term, res)
      break
    case 'role':
      searchRole(term, res)
      break
    case 'category':
      searchCategory(term, res)
      break
    case 'product':
      searchProduct(term, res)
      break
    default:
      res.status(500).json({
        msg: 'This search does not exist'
      })
  }
}

export {
  search
}
