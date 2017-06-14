import { AccountContract } from '../../../application/definitions/contracts/account.contract';
import { Account } from '../../../application/definitions/entities/account';

export default class InMemoryAccountContract implements AccountContract {
  private accounts: Account[] = [];
  private lastId = 1;

  findAll(): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      resolve(this.accounts.slice());
    });
  }

  findById(id: number): Promise<Account> {
    return new Promise((resolve, reject) => {
      const account = this.accounts.find((acc) => {
        return acc.id === id;
      });

      resolve(account || null);
    });
  }

  create(amount: number): Promise<Account> {
    return new Promise((resolve, reject) => {
      const acc = {
        id: this.lastId++,
        amount: amount
      };

      this.accounts.push(acc);

      resolve(acc);
    });
  }

  update(id: number, amount: number): Promise<Account> {
    return new Promise((resolve, reject) => {
      let idx = -1;

      const account = this.accounts.find((acc, index, array) => {
        if (acc.id === id) {
          idx = index;
          return true;
        }

        return false;
      });

      if (idx !== -1) {
        this.accounts[idx].amount = amount;
      }

      resolve(account || null);
    });
  }
}
