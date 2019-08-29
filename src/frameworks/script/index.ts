import './register';

import { ID } from '../../app/core/definitions/id';
import { DepositInput } from '../../app/deposit/deposit.in';
import { SignupInput } from '../../app/signup/signup.in';
import { TransferInput } from '../../app/transfer/transfer.in';
import { app } from '../register';

import { DepositPresenter } from './presenter/deposit/deposit.presenter';
import { SignupPresenter } from './presenter/signup/signup.presenter';
import { TransferPresenter } from './presenter/transfer/transfer.presenter';

const megaman: SignupInput = {
  firstname: 'Megaman',
  lastname: 'Maverick Hunter B',
  email: 'megaman@mega.com',
  username: 'megamanx',
  password: 'passwd',
};

const zero: SignupInput = {
  firstname: 'Zero',
  lastname: 'Maverick Hunter S',
  email: 'zero@mega.com',
  username: 'megamanx',
  password: 'passwd',
};

const createUser = async (usr: SignupInput): Promise<ID> => {
  const presenter: SignupPresenter = app.container.resolve<SignupPresenter>('signupPresenter');

  const response = await app.main.signUp(usr);
  const output = await presenter.present(response);

  console.log(`User created: (#${output.id}) ${usr.firstname}`);

  return output.id;
};

const makeDeposit = async (userId: ID, username: string, deposit: DepositInput): Promise<void> => {
  const presenter: DepositPresenter = app.container.resolve<DepositPresenter>('depositPresenter');

  const response = await app.main.deposit(deposit);
  const output = await presenter.present(response);

  console.log(`User (#${userId}) ${username} received ${output.balance} coins`);
  console.log(`Transaction #${output.id}`);
};

const makeTransfer = async (
  toId: ID,
  fromId: ID,
  toName: string,
  fromName: string,
  transfer: TransferInput,
): Promise<void> => {
  const presenter: TransferPresenter = app.container.resolve<TransferPresenter>('transferPresenter');
  const response = await app.main.transfer(transfer);
  const output = await presenter.present(response);

  console.log(`User (#${toId}) ${fromName} received ${transfer.value} coins from User (#${fromId}) ${toName}`);
  console.log(`Transaction #${output.id}`);
};

(async (): Promise<void> => {
  try {
    const megamanId = await createUser(megaman);
    const zeroId = await createUser(zero);

    const megamanDeposit: DepositInput = { userId: megamanId, value: 100 };

    await makeDeposit(megamanId, megaman.username, megamanDeposit);

    const zeroDeposit: DepositInput = { userId: zeroId, value: 200 };

    await makeDeposit(zeroId, zero.username, zeroDeposit);

    const zeroTransfer: TransferInput = { from: zeroId, to: megamanId, value: 200 };

    await makeTransfer(megamanId, zeroId, zero.username, megaman.username, zeroTransfer);
  } catch (error) {
    console.log(error);
  }
})();
