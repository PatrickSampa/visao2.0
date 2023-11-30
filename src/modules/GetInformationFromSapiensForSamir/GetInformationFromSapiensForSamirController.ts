import { Request, Response } from 'express';
import { GetInformationFromSapiensForSamirUseCase } from './GetInformationFromSapiensForSamirUseCase';

export class GetInformationFromSapiensForSamirController {
  constructor(
    private getInformationFromSapiensForSamirUseCase: GetInformationFromSapiensForSamirUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    try {
      const responseInfo =
        await this.getInformationFromSapiensForSamirUseCase.execute(token);
      return response.status(200).json(responseInfo);
    } catch (erro) {
      return response.status(401).json({
        message: 'Unexpected error',
      });
    }
  }
}
