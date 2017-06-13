import { Account } from '../definitions/entities/account';
import { AccountContract } from '../definitions/contracts/account.contract';

export default class AccountBusiness {
  constructor(
    private accountContract: AccountContract
  ) { }

  getAll(): Promise<Account[]> {
    return this.accountContract.findAll();
  }

  create(amount: number): Promise<{}> {
    return this.accountContract.create(amount);
  }
}
