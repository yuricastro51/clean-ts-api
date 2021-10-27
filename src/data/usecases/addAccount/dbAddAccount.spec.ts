import { AddAccount } from '../../../domain/usecases/addAccount';
import { DbAddAccount } from './dbAddAccount';
import { Encrypter } from './protocols/encrypter';

class EncrypterStub implements Encrypter {
  async encrypt (value: string): Promise<string> {
    return 'hashed_password';
  }
}

interface SutTypes {
  sut: AddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const encrypterStub = new EncrypterStub();
  const sut = new DbAddAccount(encrypterStub);

  return { sut, encrypterStub };
};

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(async () => {
      throw new Error();
    });
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    };

    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });
});
