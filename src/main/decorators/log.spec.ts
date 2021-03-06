import { LogErrorRepository } from '../../data/protocols/logErrorRepository';
import { serverError } from '../../presentation/helpers/httpHelper';
import { Controller } from '../../presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http';
import { LogControllerDecorator } from './log';

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      return await new Promise(resolve => resolve());
    }
  }
  const logErrorRepositoryStub = new LogErrorRepositoryStub();
  return logErrorRepositoryStub;
};

const makeControllerStub = (): Controller => {
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
  const controllerStub = new ControllerStub();
  return controllerStub;
};

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
});

interface SutType {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutType => {
  const controllerStub = makeControllerStub();
  const logErrorRepositoryStub = makeLogErrorRepository();
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);

  return { sut, controllerStub, logErrorRepositoryStub };
};

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const httpRequest = makeFakeHttpRequest();

    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeHttpRequest();

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'Yuri'
      }
    });
  });

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();

    const fakeError = new Error();
    fakeError.stack = 'any_stack';
    const error = serverError(fakeError);

    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise((resolve) => resolve(error)));
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');

    const httpRequest = makeFakeHttpRequest();

    await sut.handle(httpRequest);
    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
