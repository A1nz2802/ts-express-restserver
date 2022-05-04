import { NextFunction, RequestHandler } from 'express'

const fileExists: RequestHandler = (req, res, next:NextFunction) => {
  // Verificar si se subieron archivos
  if (!req.files || Object.keys(req.files).length === 0 || !req.files?.file) {
    return res.status(400).json({ msg: 'No files were uploaded' })
  }

  next()
}

export {
  fileExists
}
