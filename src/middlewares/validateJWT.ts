import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { CustomJwtPayload, CustomRequest } from '../types/custom'
import User from '../models/user'

const validateJWT = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'Token not found in request'
    })
  }

  try {
    const { uid } = <CustomJwtPayload>jwt.verify(token, process.env.SECRETORPRIVATEKEY!)
    const user = await User.findById(uid)

    // Verificar si el usuario YA está dado de baja
    if (!user) {
      return res.status(401).json({
        msg: "Invalid token - user doesn't exist in DB"
      })
    }

    // Verificar si el UID tiene estado true
    if (!user?.state) {
      return res.status(401).json({
        msg: 'Invalid token - user state: false'
      })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({
      msg: 'Invalid token'
    })
  }
}

export {
  validateJWT
}
