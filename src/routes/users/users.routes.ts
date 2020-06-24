import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../config/upload';
import { authMiddleware } from '../../middlewares';
import { UsersController } from '../../controllers';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', UsersController.create);
usersRouter.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  UsersController.createAvatar,
);

export default usersRouter;
