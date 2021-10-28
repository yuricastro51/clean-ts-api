import bcrypt from 'bcrypt';
import { Encrypter } from '../../data/usecases/addAccount/protocols/encrypter';
import { BcryptAdapter } from './bcryptAdapter';

interface SutTypes {
  sut: Encrypter
  salt: number
}

const makeSut = (): SutTypes => {
  const salt = 12;
  const sut = new BcryptAdapter(salt);

  return { sut, salt };
};

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct value', async () => {
    const { sut, salt } = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
});
