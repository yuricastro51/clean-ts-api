import { LogErrorRepository } from '../../data/protocols/logErrorRepository';
import { Controller } from '../../presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http';

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    console.log(httpResponse);
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.log(httpResponse.body.stack);
    }
    return httpResponse;
  }
}
