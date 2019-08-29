import { asClass } from 'awilix';

import { app } from '../register';

import { DepositPresenterImpl } from './presenter/deposit/deposit.presenter.impl';
import { SignupPresenterImpl } from './presenter/signup/signup.presenter.impl';
import { TransferPresenterImpl } from './presenter/transfer/transfer.presenter.impl';

app.container.register({
  signupPresenter: asClass(SignupPresenterImpl),
  depositPresenter: asClass(DepositPresenterImpl),
  transferPresenter: asClass(TransferPresenterImpl),
});
