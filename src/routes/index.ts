import { Router } from 'express';

import {
  deleteSongController,
  getUsersController,
  putPlaylistController,
  usersLoginController,
  usersRegisterController,
} from '../controllers';
import { authUser, checkUsername, validateBody } from '../middlewares';
import { userSchema } from '../models';

const router = Router();

router.post(
  '/register',
  checkUsername,
  validateBody(userSchema),
  usersRegisterController
);

router.post('/login', validateBody(userSchema), usersLoginController);

router.get('', authUser, getUsersController);

router.put('/playlist', authUser, putPlaylistController);

router.delete('/playlist', authUser, deleteSongController);

export default router;
