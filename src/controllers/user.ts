import bcryptjs from 'bcryptjs'
import { RequestHandler, Response, Request } from 'express'
import User from '../models/user'
import { UserInterface } from '../types/user'

const getUser: RequestHandler<{}, {}, {}, {limit: string, from: string}> = async (req, res) => {
  const { limit = 5, from = 0 } = req.query

  const [total, users] = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true })
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    users
  })
}

const postUser: RequestHandler<{}, {}, UserInterface> = async (req, res) => {
  const { name, mail, password, role } = req.body
  const user = new User({ name, mail, password, role })

  // Encriptar contraseña
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  // Guardar en DB
  await user.save()

  res.json({
    msg: 'POST - Api',
    user
  })
}

const putUser: RequestHandler<{id: string}> = async (req, res) => {
  const { id } = req.params
  const { password, google, ...rest } = req.body

  // TODO validar contra base de datos
  if (password) {
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, rest)

  res.json(user)
}

const patchUser: RequestHandler = async (_, res) => {
  res.json({
    msg: 'PATCH - Api'
  })
}

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await User.findByIdAndUpdate(id, { state: false })

  res.json(user)
}

export {
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser
}
