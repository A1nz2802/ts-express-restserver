import { RequestHandler, Response } from 'express'
import { Product } from '../models'
import { CustomRequest } from '../types/custom'

const getProduct: RequestHandler<{}, {}, {limit: string, from: string}> = async (req, res) => {
  const { limit = 5, from = 0 } = req.query

  const [total, products] = await Promise.all([
    Product.countDocuments({ state: true }),
    Product.find({ state: true })
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    products
  })
}

const getProductById: RequestHandler<{id: string}> = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name')

  res.json(product)
}

const postProduct = async (req: CustomRequest, res: Response) => {
  const { name, category } = req.body

  const productDB = await Product.findOne({ name: name?.toUpperCase() })

  // Si ya existe un producto con el mismo nombre
  productDB && res.status(400).json({ msg: `Category ${productDB!.name} already exists` })

  // Generar la data a guardar
  const productData = {
    name: name?.toUpperCase(),
    category,
    user: req.user?._id
  }

  const product = new Product(productData)

  // Guardar en BD
  await product.save()

  res.status(201).json({
    product
  })
}

const putProduct = async (req: CustomRequest, res: Response) => {
  const { name, available } = req.body
  const { id } = req.params

  const productData = {
    name: name?.toUpperCase(),
    user: req.user?._id,
    available
  }

  const productDB = await Product.findByIdAndUpdate(id, productData, { new: true })

  res.json({
    productDB
  })
}

const deleteProduct: RequestHandler<{id: string}> = async (req, res) => {
  const { id } = req.params

  const productDB = await Product.findByIdAndUpdate(id, { state: false }, { new: true })

  res.json(productDB)
}

export {
  getProduct,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct
}
