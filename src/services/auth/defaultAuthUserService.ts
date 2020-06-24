import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { DefaultError } from '../../errors';
import { User } from '../../models';
import { secret, expiresIn } from '../../config/auth';

interface DefaultAuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

export class DefaultAuthUserService {
  private throwInvalidCredentialsError(): void {
    throw new DefaultError('Invalid credentials', 401);
  }

  public async execute({
    email,
    password,
  }: DefaultAuthRequest): Promise<AuthResponse> {
    const usersRepository = getRepository(User);

    const user = (await usersRepository.findOne({ where: { email } })) as User;

    if (!user) {
      this.throwInvalidCredentialsError();
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      this.throwInvalidCredentialsError();
    }

    const token = sign({ userId: user.id }, secret, {
      expiresIn,
    });

    return {
      token,
    };
  }
}
