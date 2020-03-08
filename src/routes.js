import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import providerController from './controllers/ProviderController';
import createUserValidator from './middlewares/user/createUser';
import SessionController from './controllers/SessionController';
import updateUserValidator from './middlewares/user/updateUser';
import fileController from './controllers/fileController';
import UserController from './controllers/UserController';
import loginValidator from './middlewares/session/login';
import AuthMiddleware from './middlewares/session/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/health', (req, res) => {
  res.json({
    version: '0.0.1',
    dev: 'Eduardo Freitas',
    repository: 'https://github.com/eduardo6722',
  });
});

// Auth
routes.post('/users', createUserValidator, UserController.store);
routes.post('/session', loginValidator, SessionController.store);

// User Crud
routes.use(AuthMiddleware);
routes.put('/users', updateUserValidator, UserController.update);

// Files Upload
routes.post('/files', upload.single('file'), fileController.store);

// Providers
routes.get('/providers', providerController.index);

export default routes;
