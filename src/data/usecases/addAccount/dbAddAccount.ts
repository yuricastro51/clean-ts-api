import { AccountModel } from '../../../domain/models/account';
import { AddAccount, AddAccountModel } from '../../../domain/usecases/addAccount';
import { Encrypter } from './protocols/encrypter';

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const { password } = account;
    await this.encrypter.encrypt(password);
    const fakeAccountModel = { id: 'any_id', name: 'any_name', password: 'any_password', email: 'any_email@mail.com' };

    return fakeAccountModel;
  }
}
