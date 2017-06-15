import { Account } from '../entities/account';

export interface AccountContract {
  findAll(): Promise<Account[]>;
  findById(id: number): Promise<Account>;
  create(owner: string, balance: number): Promise<Account>;
  update(id: number, data: {owner: string, balance: number}): Promise<Account>;
}
