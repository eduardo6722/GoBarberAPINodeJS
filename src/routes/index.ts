import { Router } from 'express';

import usersRouter from './users/users.routes';
import authRouter from './sessions/auth.routes';
import appointmentsRouter from './appointments/appointments.routes';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/users', usersRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;
