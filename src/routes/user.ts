import { Router } from 'express'
import { body, check, param } from 'express-validator'

import { validateFields, validateJWT, hasRole } from '../middlewares/index'
import { existMail, userExistsById, isValidRole } from '../helpers/dbValidators'

import {
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser
} from '../controllers/user'

const router = Router()

router.get('/', [
  validateFields
], getUser)

router.put('/:id', [
  param('id', 'Invalid ID').isMongoId(),
  param('id').custom(userExistsById),
  check('role').custom(isValidRole),
  validateFields
], putUser)

router.post('/', [
  body('name', 'Name is required').not().isEmpty(),
  body('password', 'Password is required').not().isEmpty(),
  body('password', 'Password must have at least 6 characters').isLength({ min: 6 }),
  body('mail', 'Invalid email').isEmail(),
  body('mail').custom(existMail),
  body('role').custom(isValidRole),
  validateFields
], postUser)

router.patch('/', patchUser)

router.delete('/:id', [
  validateJWT,
  // isAdminRole,
  hasRole('ADMIN_ROLE', 'RANDOM_ROLE'),
  param('id', 'Invalid ID').isMongoId(),
  param('id').custom(userExistsById),
  validateFields
], deleteUser)

export default router
