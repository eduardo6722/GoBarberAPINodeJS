import { Request, Response, NextFunction } from 'express';
import { DefaultError } from '../../errors';

function getStatusMessage(code: number): string {
  switch (code) {
    case 400:
      return 'Bad request';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not found';
    default:
      return 'Error';
  }
}

export default (
  err: DefaultError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof DefaultError) {
    return res
      .status(err.statusCode)
      .json({ status: getStatusMessage(err.statusCode), message: err.message });
  }

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
};
