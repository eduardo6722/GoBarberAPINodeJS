import { Router } from 'express';

import { authMiddleware } from '../../middlewares';
import { AppointmentsController } from '../../controllers';

const appointmentsRouter = Router();

appointmentsRouter.use(authMiddleware);
appointmentsRouter.get('/', AppointmentsController.get);
appointmentsRouter.post('/', AppointmentsController.create);

export default appointmentsRouter;
