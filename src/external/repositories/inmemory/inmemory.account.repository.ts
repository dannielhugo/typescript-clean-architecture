import { AccountRepository } from '../../../application/entities/repositories/account.repository';
import { Account } from '../../../application/entities/types/account';

export default class InMemoryAccountRepository implements AccountRepository {
  private accounts: Account[] = [];
  private lastId = 1;

  findByUserId(userId: number): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      const accounts = this.accounts.filter((acc) => {
        return acc.userId === userId;
      });

      resolve(accounts || []);
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

  create(userId: number, description: string, balance: number): Promise<Account> {
    return new Promise((resolve, reject) => {
      const acc = {
        id: this.lastId++,
        userId: userId,
        description: description,
        balance: balance
      };

      this.accounts.push(acc);

      resolve(acc);
    });
  }

  async addBalance(accountId: number, amount: number): Promise<Account> {
    const account = await this.findById(accountId);

    account.balance += amount;

    return Promise.resolve(account);
  }

  findByIdAndUserId(id: number, userId: number): Promise<Account> {
    return new Promise((resolve, reject) => {
      const account = this.accounts.find((acc) => {
        return acc.id === id && acc.userId === userId;
      });

      resolve(account || null);
    });
  }
}
