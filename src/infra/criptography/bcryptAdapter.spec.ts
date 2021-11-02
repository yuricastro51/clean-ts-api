import bcrypt from 'bcrypt';
import { Encrypter } from '../../data/protocols/encrypter';
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

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hash';
  }
}));

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt with correct value', async () => {
    const { sut, salt } = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('Should return a hash on success', async () => {
    const { sut } = makeSut();
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hash');
  });

  test('Should throw if bcrypt throws', async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.encrypt('any_value');
    await expect(promise).rejects.toThrow();
  });
});
