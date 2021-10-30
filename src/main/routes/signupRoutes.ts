import { Router } from 'express';
import { adaptRoute } from '../adapters/expressRouteAdapter';
import { makeSignUpController } from '../factories/signup';

export default (router: Router): void => {
  const signUpController = makeSignUpController();
  router.post('/signup', adaptRoute(signUpController));
};
