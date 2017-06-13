import { Account } from '../definitions/account';

export default class AccountService {
  private accounts: Account[] = [
    { id: 1, amount: 1000 },
    { id: 2, amount: 0 },
    { id: 3, amount: 1002 }
  ];

  getAll(): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      resolve(this.accounts.slice());
    });
  }

  create(account: Account): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.accounts.push(account);
      resolve();
    });
  }
}
