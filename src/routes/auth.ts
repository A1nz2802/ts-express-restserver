import { Router } from 'express'
import { body } from 'express-validator'
import { googleSignIn, login } from '../controllers/auth'

import { validateFields } from '../middlewares/validateFields'

const router = Router()

router.post('/login', [
  body('mail', 'Email is required').isEmail(),
  body('password', 'Password is required').not().isEmpty(),
  validateFields
], login)

router.post('/google', [
  body('googleToken', 'Google token is required').not().isEmpty(),
  validateFields
], googleSignIn)

export default router
