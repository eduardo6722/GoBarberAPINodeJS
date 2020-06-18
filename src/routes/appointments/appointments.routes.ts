import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import { Router, Request, Response } from 'express';

import { CreateAppoitmentService } from '../../services';
import { AppointmentRepository } from '../../repositories';

const appointmentsRouter = Router();

appointmentsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppoitmentService();

    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider,
    });

    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

appointmentsRouter.get('/', async (req: Request, res: Response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
});

export default appointmentsRouter;
