import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { Appointment } from '../../models';
import { AppointmentRepository } from '../../repositories';

interface Request {
  provider_id: string;
  date: Date;
}

export class CreateAppoitmentService {
  public async execute({
    provider_id,
    date: parsedDate,
  }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);
    const appointmentDate = startOfHour(parsedDate);

    const foundAppointmentByDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (foundAppointmentByDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: parsedDate,
    });

    return appointmentsRepository.save(appointment);
  }
}
