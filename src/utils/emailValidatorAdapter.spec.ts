import { EmailValidator } from '../presentation/protocols/emailValidator';
import { EmailValidatorAdapter } from './emailValidator';

interface sutTypes {
  sut: EmailValidator
}

const makeSut = (): sutTypes => {
  const sut = new EmailValidatorAdapter();

  return { sut };
};

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const { sut } = makeSut();
    const isValid = sut.isValid('invalid_email@mail.com');
    expect(isValid).toBe(false);
  });
});
