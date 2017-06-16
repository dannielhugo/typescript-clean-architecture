import { Account } from '../definitions/entities/account';
import { AccountContract } from '../definitions/contracts/account.contract';

export default class AccountBusiness {
  constructor(
    private accountContract: AccountContract
  ) { }

  findByUserId(userId: number): Promise<Account[]> {
    return this.accountContract.findByUserId(userId);
  }

  create(userId: number, balance: number): Promise<Account> {
    return this.accountContract.create(userId, balance);
  }
}
