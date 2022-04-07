import { Router } from 'express';
import { 
  getUser, 
  postUser, 
  putUser, 
  patchUser, 
  deleteUser 
} from '../controllers/user';

const router = Router();

router.get('/', getUser )

router.put('/:id', putUser )

router.post('/', postUser )

router.patch('/', patchUser )

router.delete('/', deleteUser )

export default router;