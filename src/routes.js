import { Router } from 'express';

import createUserValidator from './middlewares/user/createUser';
import SessionController from './controllers/SessionController';
import updateUserValidator from './middlewares/user/updateUser';
import UserController from './controllers/UserController';
import loginValidator from './middlewares/session/login';
import AuthMiddleware from './middlewares/session/auth';

const routes = new Router();

routes.get('/health', (req, res) => {
  res.json({
    version: '0.0.1',
    dev: 'Eduardo Freitas',
    repository: 'https://github.com/eduardo6722',
  });
});

routes.post('/users', createUserValidator, UserController.store);
routes.post('/session', loginValidator, SessionController.store);

routes.use(AuthMiddleware);
routes.put('/users', updateUserValidator, UserController.update);

export default routes;
