import { RequestHandler } from 'express'
import bcryptjs from 'bcryptjs'

import User from '../models/user'

import { generateJWT } from '../helpers/generateJWT'
import { googleVerify } from '../helpers/googleVerify'

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

const googleSignIn: RequestHandler<{}, {}, {googleToken: string}> = async (req, res) => {
  const { googleToken } = req.body

  try {
    // Obtengo la información del usuario después de logearse con su cuenta de google
    const { name, picture, mail } = await googleVerify(googleToken)

    // Busco si existe el usuario en la base de datos con su email
    let user = await User.findOne({ mail })

    // Si no existe el usuario en la BD se crea nuevo
    if (!user) {
      const userData = {
        name,
        picture,
        mail,
        password: ':P',
        google: true
      }

      user = new User(userData)
      await user.save()
    }

    // Si el usuario existe en la BD pero está dado de baja
    if (!user.state) {
      res.status(401).json({
        msg: 'User blocked, contact your administrator for more information'
      })
    }

    // Generamos el JWT
    const token = await generateJWT(user?.id)
    console.log(user)

    res.json({
      user,
      token
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Token could not be verified'
    })
  }
}

export {
  login,
  googleSignIn
}
