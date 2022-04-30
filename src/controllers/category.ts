import { RequestHandler, Response } from 'express'
import { Category } from '../models/index'
import { CustomRequest } from '../types/custom'

const getCategory: RequestHandler<{}, {}, {}, {limit: string, from: string}> = async (req, res) => {
  const { limit = 5, from = 0 } = req.query

  const [total, categories] = await Promise.all([
    Category.countDocuments({ state: true }),
    Category.find({ state: true })
      .populate('user', 'name')
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    categories
  })
}

const getCategoryById: RequestHandler<{id: string}> = async (req, res) => {
  const { id } = req.params
  const category = await Category.findById(id).populate('user', 'name')

  res.json(category)
}

// El usuario lo obtengo desde el jwt que viene desde la request
const postCategory = async (req: CustomRequest, res: Response) => {
  const { name } = req.body

  const categoryDB = await Category.findOne({ name: name?.toUpperCase() })

  // Si ya existe una categoria con el mismo nombre
  if (categoryDB) {
    return res.status(400).json({
      msg: `Category ${categoryDB!.name} already exists`
    })
  }

  // Generar la data a guardar
  const categoryData = {
    name: name?.toUpperCase(),
    user: req.user?._id
  }

  const category = new Category(categoryData)

  // Guardar en BD
  await category.save()

  res.status(201).json({
    category
  })
}

const putCategory = async (req: CustomRequest, res: Response) => {
  const { id } = req.params
  const { name } = req.body

  const categoryData = {
    name: name?.toUpperCase(),
    user: req.user?._id
  }

  const category = await Category.findByIdAndUpdate(id, categoryData, { new: true })

  res.json(category)
}

const deleteCategory: RequestHandler<{id: string}> = async (req, res) => {
  const { id } = req.params
  const categoryDB = await Category.findByIdAndUpdate(id, { state: false }, { new: true })

  res.json({
    msg: `Category ${categoryDB?.name} deleted successfully`,
    categoryDB
  })
}

export {
  getCategory,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory
}
