import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import AuthMiddleware from './middlewares/auth';

const routes = new Router();

routes.get('/health', (req, res) => {
  res.json({
    version: '0.0.1',
    dev: 'Eduardo Freitas',
    repository: 'https://github.com/eduardo6722',
  });
});

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(AuthMiddleware);
routes.put('/users', UserController.update);

export default routes;
