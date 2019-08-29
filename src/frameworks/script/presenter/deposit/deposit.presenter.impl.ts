import { DepositOutput } from '../../../../app/deposit/deposit.out';

import { DepositPresenter, DepositPresenterOutput } from './deposit.presenter';

export class DepositPresenterImpl implements DepositPresenter {
  present(data: DepositOutput): Promise<DepositPresenterOutput> {
    return Promise.resolve({ balance: data.balance, id: data.transactionId });
  }
}
