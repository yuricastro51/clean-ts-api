import { AccountModel } from '../../../domain/models/account';
import { AddAccount, AddAccountModel } from '../../../domain/usecases/addAccount';
import { AddAccountRepository } from './protocols/addAccountRepository';
import { Encrypter } from './protocols/encrypter';

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const { password, name, email } = accountData;
    const hashedPassword = await this.encrypter.encrypt(password);

    const account = await this.addAccountRepository.add({
      email,
      name,
      password: hashedPassword
    });

    return account;
  }
}
