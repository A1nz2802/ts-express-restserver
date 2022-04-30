import { Router } from 'express'
import { body, param } from 'express-validator'
import { deleteCategory, getCategory, getCategoryById, postCategory, putCategory } from '../controllers/category'
import { categoryExistsById } from '../helpers/dbValidators'
import { validateFields, validateJWT } from '../middlewares'
import { isAdminRole } from '../middlewares/validateRole'

const router = Router()

// Obtener todas las categorias - endpoint pública
router.get('/', getCategory)

// Obtener una categoria por ID - endpoint pública
router.get('/:id', [
  param('id', 'Invalid ID').isMongoId(),
  param('id').custom(categoryExistsById),
  validateFields
], getCategoryById)

// Crear una categoria - endpoint privada - cualquiera con token válido
router.post('/', [
  validateJWT,
  body('name', 'Name is required').not().isEmpty(),
  validateFields
], postCategory)

// Actualizar categoria por ID - endpoint privada - cualquiera con token válido
router.put('/:id', [
  validateJWT,
  param('id', 'Invalid ID').isMongoId(),
  param('id').custom(categoryExistsById),
  body('name', 'Name is Required').not().isEmpty(),
  validateFields
], putCategory)

// Borrar categoria - solo Admin
router.delete('/:id', [
  validateJWT,
  isAdminRole,
  param('id', 'Invalid ID').isMongoId(),
  param('id').custom(categoryExistsById),
  validateFields
], deleteCategory)

export default router
