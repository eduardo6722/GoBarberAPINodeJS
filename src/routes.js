import { Router } from 'express';

const routes = new Router();

routes.get('/health', (req, res) => {
  res.json({
    version: '0.0.1',
    dev: 'Eduardo Freitas',
    repository: 'https://github.com/eduardo6722',
  });
});

export default routes;
