import { Request, Response } from 'express';
import { DefaultAuthUserService } from '../services';

export class AuthController {
  public static async auth(req: Request, res: Response): Promise<Response> {
    try {
      const authService = new DefaultAuthUserService();

      const { email, password } = req.body;

      const token = await authService.execute({ email, password });

      return res.json(token);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
