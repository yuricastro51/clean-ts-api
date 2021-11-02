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

const makeControllerStub = (): Controller => {
  const controllerStub = new ControllerStub();
  return controllerStub;
};

interface SutType {
  sut: LogControllerDecorator
  controllerStub: Controller
}

const makeSut = (): SutType => {
  const controllerStub = makeControllerStub();
  const sut = new LogControllerDecorator(controllerStub);

  return { sut, controllerStub };
};

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
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

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'Yuri'
      }
    });
  });
});
