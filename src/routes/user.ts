import { Router as routerExpress } from 'express'
import { body, check } from 'express-validator'
import {
  getUser,
  postUser,
  putUser,
  patchUser,
  deleteUser
} from '../controllers/user'
import { existMail, userExistsById, isValidRole } from '../helpers/dbValidators'
import { validateFields } from '../middlewares/validateFields'

const router = routerExpress()

router.get('/', [
  validateFields
], getUser)

router.put('/:id', [
  check('id', 'Invalid ID').isMongoId(),
  check('id').custom(userExistsById),
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
  check('id', 'Invalid ID').isMongoId(),
  check('id').custom(userExistsById),
  validateFields
], deleteUser)

export default router
