import { AddAccountRepository } from '../../../../data/usecases/addAccount/protocols/addAccountRepository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/addAccount';
import { MongoHelper } from '../helpers/mongoHelper';

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const foundAccount: any = await accountCollection.findOne({ _id: result.insertedId });
    const { _id, ...accountWithoutId } = foundAccount;
    const account = Object.assign({}, accountWithoutId, { id: _id });
    return account;
  }
}
