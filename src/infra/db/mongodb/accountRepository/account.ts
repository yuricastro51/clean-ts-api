import { AddAccountRepository } from '../../../../data/protocols/addAccountRepository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/addAccount';
import { MongoHelper } from '../helpers/mongoHelper';

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const account: any = await accountCollection.findOne({ _id: result.insertedId });
    return MongoHelper.map(account);
  }
}
