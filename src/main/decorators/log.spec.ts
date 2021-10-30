import { Controller } from '../../presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http';
import { LogControllerDecorator } from './log';

class ControllerStub implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = {
      statusCode: 200,
      body: {
        name: 'Yuri'
      }
    };
    return await new Promise(resolve => resolve(httpResponse));
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const controllerStub = new ControllerStub();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const sut = new LogControllerDecorator(controllerStub);

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });
});
