import { MissingParamError } from '../errors/missingParamError';
import { badRequest } from '../helpers/httpHelper';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/emailValidator';
import { InvalidParamError } from '../errors/invalidParamError';

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email);

    if (!isValid) {
      return badRequest(new InvalidParamError('email'));
    }

    return {
      statusCode: 200,
      body: ''
    };
  }
}
