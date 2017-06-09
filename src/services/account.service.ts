import { Account } from '../core/account';

export class AccountService {
  private accounts: Account[] = [
    new Account(1, 1000),
    new Account(2, 0),
    new Account(3, 10020)
  ];

  getAll(): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      resolve(this.accounts.slice());
    });
  }
}
