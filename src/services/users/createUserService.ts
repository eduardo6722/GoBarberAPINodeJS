import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import { User } from '../../models';
import { DefaultError } from '../../errors';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<User> {
    const userRepository = getRepository(User);

    const foundUser = await userRepository.findOne({
      where: { email },
    });

    if (foundUser) {
      throw new DefaultError('E-mail already exists', 400);
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await userRepository.save(user);

    delete user.password;
    return user;
  }
}
