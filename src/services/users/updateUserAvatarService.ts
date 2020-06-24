import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';

import { User } from '../../models';
import { DefaultError } from '../../errors';
import uploadConfig from '../../config/upload';

interface UpdateAvatarRequest {
  user_id: string;
  avatarFilename: string;
}

export class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFilename,
  }: UpdateAvatarRequest): Promise<void> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new DefaultError('Cannot find user', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(
        uploadConfig.tempFolder,
        user.avatar,
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);
  }
}
