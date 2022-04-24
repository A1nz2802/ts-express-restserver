import { RequestHandler } from 'express'
import bcryptjs from 'bcryptjs'
import User from '../models/user'
import { generateJWT } from '../helpers/generateJWT'

const login: RequestHandler = async (req, res) => {
  const { mail, password } = req.body
  try {
    // Verificar si el correo y la contraseña existen
    const user = await User.findOne({ mail })
    if (!user) {
      return res.status(400).json({
        msg: 'User does not exist - email'
      })
    }

    // Verificar si el usuario está activo en la DB
    if (!user.state) {
      return res.status(400).json({
        msg: 'User does not exist - state: false'
      })
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User does not exist - password'
      })
    }
    // Generar el JWT
    const token = await generateJWT(user.id)

    res.json({
      user,
      token
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'Something went wrong :('
    })
  }
}

export {
  login
}
