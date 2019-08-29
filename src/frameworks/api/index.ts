import './register';
import express from 'express';
import bodyParser from 'body-parser';
import { app } from '../register';
import { SignupInput } from '../../app/signup/signup.in';
import { SignupPresenter } from './presenter/signup/signup.presenter';
import { SignupPresenterOutput } from '../script/presenter/signup/signup.presenter';
import { DepositInput } from '../../app/deposit/deposit.in';
import { DepositPresenter, DepositPresenterOutput } from './presenter/deposit/deposit.presenter';
import { TransferInput } from '../../app/transfer/transfer.in';
import { TransferPresenter, TransferPresenterOutput } from './presenter/transfer/transfer.presenter';

// Create a new express application instance
const eApp: express.Application = express();

eApp.use(bodyParser.json());

const createUser = async (input: SignupInput): Promise<SignupPresenterOutput> => {
  const presenter: SignupPresenter = app.container.resolve<SignupPresenter>('signupPresenter');

  const response = await app.main.signUp(input);
  const output = await presenter.present(response);

  return output;
};

const makeDeposit = async (deposit: DepositInput): Promise<DepositPresenterOutput> => {
  const presenter: DepositPresenter = app.container.resolve<DepositPresenter>('depositPresenter');

  const response = await app.main.deposit(deposit);
  const output = await presenter.present(response);

  return output;
};

const makeTransfer = async (transfer: TransferInput): Promise<TransferPresenterOutput> => {
  const presenter: TransferPresenter = app.container.resolve<TransferPresenter>('transferPresenter');
  const response = await app.main.transfer(transfer);
  const output = await presenter.present(response);

  return output;
};

eApp.post('/user', async (req, res) => {
  const input: SignupInput = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const output: SignupPresenterOutput = await createUser(input);
    res.json(output);
  } catch (error) {
    res.end(error.toString());
  }
});

eApp.post('/deposit', async (req, res) => {
  const input: DepositInput = {
    userId: +req.body.userId,
    value: +req.body.value,
  };

  try {
    const output: DepositPresenterOutput = await makeDeposit(input);
    res.json(output);
  } catch (error) {
    res.end(error.toString());
  }
});

eApp.post('/transfer', async (req, res) => {
  const input: TransferInput = {
    from: +req.body.from,
    to: +req.body.to,
    value: +req.body.value,
  };

  try {
    const output: TransferPresenterOutput = await makeTransfer(input);
    res.json(output);
  } catch (error) {
    res.end(error.toString());
  }
});

eApp.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
