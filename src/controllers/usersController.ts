import { Request, Response } from 'express';

import { CreateUserService } from '../services';
import { UpdateUserAvatarService } from '../services/users/updateUserAvatarService';

export class UsersController {
  static async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return res.status(201).json(user);
  }

  static async createAvatar(req: Request, res: Response): Promise<Response> {
    const {
      userId: user_id,
      file: { filename },
    } = req;
    const updateUserAvatar = new UpdateUserAvatarService();

    await updateUserAvatar.execute({
      avatarFilename: filename,
      user_id,
    });

    return res.json({ message: 'Avatar updated' });
  }
}
