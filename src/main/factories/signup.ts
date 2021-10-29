import { DbAddAccount } from '../../data/usecases/addAccount/dbAddAccount';
import { BcryptAdapter } from '../../infra/criptography/bcryptAdapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/accountRepository/account';
import { SignUpController } from '../../presentation/controllers/signup';
import { EmailValidatorAdapter } from '../../utils/emailValidatorAdapter';

export const makeSignUpController = (): SignUpController => {
  const salt = 12;
  const accountMongoRepository = new AccountMongoRepository();
  const emailValidator = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signUpController = new SignUpController(emailValidator, dbAddAccount);

  return signUpController;
};
