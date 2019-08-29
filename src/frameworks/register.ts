import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import * as joi from 'joi';

import { App } from '../app/app';
import { DepositInteractor } from '../app/deposit/deposit.interactor';
import { SignupInteractor } from '../app/signup/signup.interactor';
import { TransferInteractor } from '../app/transfer/transfer.interactor';
import { ApplicationErrorFactoryImpl } from '../data/core/errors/application-error-factory.impl';
import { db } from '../data/db';
import { DepositRepositoryImpl } from '../data/deposit/deposit.repository.impl';
import { DepositValidatorImpl } from '../data/deposit/deposit.validator.impl';
import { SignupRepositoryImpl } from '../data/signup/signup.repository.impl';
import { SignupValidatorImpl } from '../data/signup/signup.validator.impl';
import { TransferRepositoryImpl } from '../data/transfer/transfer.repository.impl';
import { TransferValidatorImpl } from '../data/transfer/transfer.validator.impl';

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

container.register({
  // Node_modules
  db: asValue(db),
  joi: asValue(joi),

  app: asClass(App),

  // errors
  errorFactory: asClass(ApplicationErrorFactoryImpl),

  // validators
  signupValidator: asClass(SignupValidatorImpl),
  depositValidator: asClass(DepositValidatorImpl),
  transferValidator: asClass(TransferValidatorImpl),

  // interactors
  signupInteractor: asClass(SignupInteractor),
  depositInteractor: asClass(DepositInteractor),
  transferInteractor: asClass(TransferInteractor),

  // repositories
  signupRepository: asClass(SignupRepositoryImpl),
  depositRepository: asClass(DepositRepositoryImpl),
  transferRepository: asClass(TransferRepositoryImpl),
});

const main = container.resolve<App>('app');
export const app = {
  main,
  container,
};
