import { NextFunction, Response } from 'express'
import { CustomRequest } from '../types/custom'

// Middleware que valida si el usuario es Administrador
const isAdminRole = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Validate token before the role'
    })
  }

  const { role, name } = req.user

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not administrator`
    })
  }
  next()
}

// Middleware que valida uno o más roles
const hasRole = (...roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'Validate token before the role'
      })
    }
    console.log(roles)
    console.log(req.user.role)

    if (!roles.includes(req.user.role)) {
      return res.status(500).json({
        msg: `Some of the roles required: ${roles}`
      })
    }
    next()
  }
}

export {
  isAdminRole,
  hasRole
}
