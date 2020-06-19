import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { secret } from '../../config/auth';

interface TokenPayload {
  userId: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error('Token not provided');
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, secret) as TokenPayload;
    if (decoded) {
      req.userId = decoded.userId;
    }
    return next();
  } catch (error) {
    throw new Error('Invalid token');
  }
}
