import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { secret } from '../../config/auth';
import { DefaultError } from '../../errors';

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
    throw new DefaultError('Token not provided', 401);
  }

  const [, token] = authorization.split(' ');

  const decoded = verify(token, secret) as TokenPayload;

  if (decoded) {
    req.userId = decoded.userId;
  }

  return next();
}
