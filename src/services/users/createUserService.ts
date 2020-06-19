import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import { User } from '../../models';

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
      throw new Error('E-mail already exists');
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
