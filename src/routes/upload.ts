import { Router } from 'express'
import { param } from 'express-validator'
import { getImage, putImageCloudinary, uploadImages } from '../controllers/upload'
import { allowedCollections } from '../helpers'
import { validateFields, fileExists } from '../middlewares'

const router = Router()

router.post('/', fileExists, uploadImages)

router.put('/:collection/:id', [
  param('collection', 'Collection is required').not().isEmpty(),
  param('collection').custom((c: string) => allowedCollections(c, ['user', 'product'])),
  param('id', 'Id is required').not().isEmpty(),
  param('id', 'Invalid ID').isMongoId(),
  fileExists,
  validateFields
], putImageCloudinary)

router.get('/:collection/:id', [
  param('collection', 'Collection is required').not().isEmpty(),
  param('collection').custom((c: string) => allowedCollections(c, ['user', 'product'])),
  param('id', 'Id is required').not().isEmpty(),
  param('id', 'Invalid ID').isMongoId(),
  validateFields
], getImage)

export default router
