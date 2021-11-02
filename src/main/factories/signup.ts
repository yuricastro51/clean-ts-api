import { DbAddAccount } from '../../data/usecases/addAccount/dbAddAccount';
import { BcryptAdapter } from '../../infra/criptography/bcryptAdapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/accountRepository/account';
import { SignUpController } from '../../presentation/controllers/signup';
import { Controller } from '../../presentation/protocols/controller';
import { EmailValidatorAdapter } from '../../utils/emailValidatorAdapter';
// import { LogControllerDecorator } from '../decorators/log';

export const makeSignUpController = (): Controller => {
  const salt = 12;
  const accountMongoRepository = new AccountMongoRepository();
  const emailValidator = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signUpController = new SignUpController(emailValidator, dbAddAccount);
  // const logControllerDecorator = new LogControllerDecorator(signUpController);
  return signUpController;
  // return logControllerDecorator;
};
