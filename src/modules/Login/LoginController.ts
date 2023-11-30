import { Request, Response } from 'express';
import { LoginUserCase } from './LoginUserService';

export class LoginController {
  constructor(private loginUserCase: LoginUserCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    try {
      const bearenToken = await this.loginUserCase.execute({ email, password });
      return response.status(200).json(bearenToken);
    } catch (error) {
      return response.status(401).json({
        message: 'Unexpected error',
      });
    }
  }
}
