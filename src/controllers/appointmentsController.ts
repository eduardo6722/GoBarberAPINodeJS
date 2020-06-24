import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { CreateAppoitmentService } from '../services';
import { AppointmentRepository } from '../repositories';

export class AppointmentsController {
  static async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppoitmentService();

    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      provider_id,
    });

    return res.status(201).json(appointment);
  }

  static async get(req: Request, res: Response): Promise<Response> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appointmentsRepository.find();
    return res.json(appointments);
  }
}
