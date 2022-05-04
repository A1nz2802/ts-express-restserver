import path from 'path'
import fs from 'fs'

import { Request, Response, RequestHandler } from 'express'
import { v2 as cloudinary } from 'cloudinary'

import { ProductInterface } from '../types/product'
import { UserInterface } from '../types/user'

import { uploadFile } from '../helpers'
import { User, Product } from '../models'
import fileUpload from 'express-fileupload'

cloudinary.config(process.env.CLOUDINARY_URL!)

const uploadImages = async (req: Request, res: Response) => {
  try {
    // const fileName = await uploadFile(req.files!)
    const fileName = await uploadFile(req.files!, undefined, 'images')

    res.status(201).json({
      fileName
    })
  } catch (err) {
    console.log(err)
    if (err instanceof Error) {
      res.status(400).json({
        msg: err.message
      })
    }
  }
}

const putImage: RequestHandler<{collection: string, id: string}> = async (req, res) => {
  const { collection, id } = req.params

  let model: (UserInterface | ProductInterface | null)

  switch (collection) {
    case 'user':
      model = await User.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `User id: ${id} does not exists`
        })
      }
      break

    case 'product':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `Product id: ${id} does not exists`
        })
      }
      break

    default:
      return res.status(500).json({
        msg: 'Se me olvide :v'
      })
  }

  // Limpiar imagenes previas
  if (model.img) {
    const pathImg = path.join(__dirname, '../uploads', collection, model.img)
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg)
    }
  }

  const fileName = await uploadFile(req.files!, undefined, collection)
  model.img = fileName

  await model.save()

  res.json({
    model
  })
}

const getImage: RequestHandler<{collection: string, id: string}> = async (req, res) => {
  const { collection, id } = req.params

  let model: (UserInterface | ProductInterface | null)

  switch (collection) {
    case 'user':
      model = await User.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `User id: ${id} does not exists`
        })
      }
      break

    case 'product':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `Product id: ${id} does not exists`
        })
      }
      break

    default:
      return res.status(500).json({
        msg: 'Se me olvide :v'
      })
  }

  // Limpiar imagenes previas
  if (model.img) {
    const pathImg = path.join(__dirname, '../uploads', collection, model.img)
    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg)
    }
  }

  const notFoundImgPath = path.join(__dirname, '../assets/no-image.jpg')
  res.sendFile(notFoundImgPath)
}

const putImageCloudinary: RequestHandler<{collection: string, id: string}> = async (req, res) => {
  const { collection, id } = req.params

  let model: (UserInterface | ProductInterface | null)

  switch (collection) {
    case 'user':
      model = await User.findById(id)

      if (!model) {
        return res.status(400).json({
          msg: `User id: ${id} does not exists`
        })
      }
      break

    case 'product':
      model = await Product.findById(id)
      if (!model) {
        return res.status(400).json({
          msg: `Product id: ${id} does not exists`
        })
      }
      break

    default:
      return res.status(500).json({
        msg: 'Se me olvide :v'
      })
  }

  if (model.img) {
    const nameArr = model.img.split('/')
    const name = nameArr[nameArr.length - 1]
    const [publicId] = name.split('.')

    await cloudinary.uploader.destroy(publicId)
  }

  const { tempFilePath } = req.files!.file as fileUpload.UploadedFile
  const { secure_url: secureUrl } = await cloudinary.uploader.upload(tempFilePath)

  model.img = secureUrl

  await model.save()

  res.json(model)
}

export {
  uploadImages,
  putImage,
  getImage,
  putImageCloudinary
}
