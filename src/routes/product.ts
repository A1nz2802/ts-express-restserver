import { Router } from 'express'
import { body, param } from 'express-validator'
import { getProduct, postProduct, putProduct, deleteProduct, getProductById } from '../controllers/product'
import { categoryExistsById, productExistsById } from '../helpers/dbValidators'
import { validateFields, validateJWT, isAdminRole } from '../middlewares'

const router = Router()

router.get('/', getProduct)

router.get('/:id', [
  param('id', 'Invalid ID').isMongoId(),
  param('id').custom(productExistsById)
], getProductById)

router.post('/', [
  validateJWT,
  isAdminRole,
  body('name', 'Name is required').not().isEmpty(),
  body('category', 'Category is required').not().isEmpty(),
  body('category', 'Invalid ID').isMongoId(),
  body('category').custom(categoryExistsById),
  validateFields
], postProduct)

router.put('/:id', [
  validateJWT,
  param('id', 'Invalid ID').isMongoId(),
  param('id').custom(productExistsById),
  body('available', 'Available field is Required'),
  validateFields
], putProduct)

router.delete('/:id', [
  validateJWT,
  isAdminRole,
  param('id', 'Invalid ID').isMongoId(),
  param('id').custom(productExistsById),
  validateFields
], deleteProduct)

export default router
